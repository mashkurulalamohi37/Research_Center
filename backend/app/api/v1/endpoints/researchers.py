import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.database.session import get_db
from app.models.researcher import Researcher
from app.schemas.researcher import (
    ResearcherResponse, ResearcherCreate, ResearcherUpdate
)
from app.api.deps import get_current_user, require_roles

router = APIRouter()


@router.get("", response_model=List[ResearcherResponse])
async def list_researchers(
    search: Optional[str] = None,
    category: Optional[str] = None,
    department: Optional[str] = None,
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Researcher)
    
    if search:
        query = query.where(
            or_(
                Researcher.name.ilike(f"%{search}%"),
                Researcher.title.ilike(f"%{search}%"),
                Researcher.department.ilike(f"%{search}%"),
                Researcher.bio.ilike(f"%{search}%")
            )
        )
    if category:
        query = query.where(Researcher.category == category)
    if department:
        query = query.where(Researcher.department.ilike(f"%{department}%"))
    if status:
        query = query.where(Researcher.status == status)

    result = await db.execute(query.order_by(Researcher.citations.desc()))
    return result.scalars().all()


@router.get("/{id_or_slug}", response_model=ResearcherResponse)
async def get_researcher(
    id_or_slug: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Researcher).where(
            or_(Researcher.id == id_or_slug, Researcher.slug == id_or_slug)
        )
    )
    researcher = result.scalars().first()
    if not researcher:
        raise HTTPException(status_code=404, detail="Researcher not found")
    return researcher


@router.post("", response_model=ResearcherResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def create_researcher(
    data: ResearcherCreate,
    db: AsyncSession = Depends(get_db)
):
    slug = data.name.lower().replace(" ", "-").replace(".", "")
    researcher = Researcher(
        id=f"res-{uuid.uuid4().hex[:12]}",
        slug=slug,
        **data.dict()
    )
    db.add(researcher)
    await db.commit()
    await db.refresh(researcher)
    return researcher


@router.patch("/{id}", response_model=ResearcherResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def update_researcher(
    id: str,
    data: ResearcherUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Researcher).where(Researcher.id == id))
    researcher = result.scalars().first()
    if not researcher:
        raise HTTPException(status_code=404, detail="Researcher not found")
    
    update_dict = data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(researcher, field, value)
    
    await db.commit()
    await db.refresh(researcher)
    return researcher


@router.delete("/{id}", dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def delete_researcher(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Researcher).where(Researcher.id == id))
    researcher = result.scalars().first()
    if not researcher:
        raise HTTPException(status_code=404, detail="Researcher not found")
    
    await db.delete(researcher)
    await db.commit()
    return {"message": "Researcher removed successfully"}
