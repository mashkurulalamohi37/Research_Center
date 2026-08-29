import uuid
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.database.session import get_db
from app.models.publication import Publication
from app.schemas.publication import (
    PublicationResponse, PublicationCreate, PublicationUpdate
)
from app.api.deps import get_current_user, require_roles

router = APIRouter()


@router.get("", response_model=List[PublicationResponse])
async def list_publications(
    search: Optional[str] = None,
    status: Optional[str] = None,
    year: Optional[int] = None,
    type: Optional[str] = None,
    research_area_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(Publication)
    
    if search:
        query = query.where(
            or_(
                Publication.title.ilike(f"%{search}%"),
                Publication.venue.ilike(f"%{search}%"),
                Publication.abstract.ilike(f"%{search}%")
            )
        )
    if status:
        query = query.where(Publication.status == status)
    if year:
        query = query.where(Publication.year == year)
    if type:
        query = query.where(Publication.type == type)
    if research_area_id:
        query = query.where(Publication.research_area_id == research_area_id)

    result = await db.execute(query.order_by(Publication.year.desc(), Publication.citations.desc()))
    return result.scalars().all()


@router.get("/{id_or_slug}", response_model=PublicationResponse)
async def get_publication(
    id_or_slug: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Publication).where(
            or_(Publication.id == id_or_slug, Publication.slug == id_or_slug)
        )
    )
    pub = result.scalars().first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publication not found")
    return pub


@router.post("", response_model=PublicationResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def create_publication(
    data: PublicationCreate,
    db: AsyncSession = Depends(get_db)
):
    slug = data.title.lower().replace(" ", "-").replace(":", "").replace("/", "")[:100]
    pub = Publication(
        id=f"pub-{uuid.uuid4().hex[:12]}",
        slug=slug,
        submitted_date=datetime.utcnow().strftime("%Y-%m-%d"),
        **data.dict()
    )
    db.add(pub)
    await db.commit()
    await db.refresh(pub)
    return pub


@router.patch("/{id}", response_model=PublicationResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def update_publication(
    id: str,
    data: PublicationUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Publication).where(Publication.id == id))
    pub = result.scalars().first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    update_dict = data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(pub, field, value)
    
    await db.commit()
    await db.refresh(pub)
    return pub


@router.post("/{id}/approve", response_model=PublicationResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def approve_publication(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Publication).where(Publication.id == id))
    pub = result.scalars().first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    pub.status = "Published"
    await db.commit()
    await db.refresh(pub)
    return pub


@router.delete("/{id}", dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def delete_publication(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Publication).where(Publication.id == id))
    pub = result.scalars().first()
    if not pub:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    await db.delete(pub)
    await db.commit()
    return {"message": "Publication purged from repository"}
