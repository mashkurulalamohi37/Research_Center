import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.database.session import get_db
from app.models.project import Project
from app.schemas.publication import ProjectResponse, ProjectCreate, ProjectUpdate
from app.api.deps import require_roles

router = APIRouter()


@router.get("", response_model=List[ProjectResponse])
async def list_projects(
    status: Optional[str] = None,
    research_area_id: Optional[str] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Project)
    if search:
        query = query.where(
            or_(
                Project.title.ilike(f"%{search}%"),
                Project.short_description.ilike(f"%{search}%"),
                Project.funding_body.ilike(f"%{search}%")
            )
        )
    if status:
        query = query.where(Project.status == status)
    if research_area_id:
        query = query.where(Project.research_area_id == research_area_id)

    result = await db.execute(query.order_by(Project.created_at.desc()))
    return result.scalars().all()


@router.get("/{id_or_slug}", response_model=ProjectResponse)
async def get_project(
    id_or_slug: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Project).where(
            or_(Project.id == id_or_slug, Project.slug == id_or_slug)
        )
    )
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("", response_model=ProjectResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def create_project(
    data: ProjectCreate,
    db: AsyncSession = Depends(get_db)
):
    slug = data.title.lower().replace(" ", "-").replace(":", "")[:100]
    project = Project(
        id=f"proj-{uuid.uuid4().hex[:12]}",
        slug=slug,
        **data.dict()
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project


@router.patch("/{id}", response_model=ProjectResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def update_project(
    id: str,
    data: ProjectUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Project).where(Project.id == id))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_dict = data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(project, field, value)
    
    await db.commit()
    await db.refresh(project)
    return project
