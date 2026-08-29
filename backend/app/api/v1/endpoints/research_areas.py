import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.database.session import get_db
from app.models.research_area import ResearchArea
from app.schemas.researcher import (
    ResearchAreaResponse, ResearchAreaCreate, ResearchAreaUpdate
)
from app.api.deps import require_roles

router = APIRouter()


@router.get("", response_model=List[ResearchAreaResponse])
async def list_research_areas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ResearchArea).order_by(ResearchArea.publication_count.desc()))
    return result.scalars().all()


@router.get("/{id_or_slug}", response_model=ResearchAreaResponse)
async def get_research_area(
    id_or_slug: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(ResearchArea).where(
            or_(ResearchArea.id == id_or_slug, ResearchArea.slug == id_or_slug)
        )
    )
    area = result.scalars().first()
    if not area:
        raise HTTPException(status_code=404, detail="Research Area not found")
    return area


@router.post("", response_model=ResearchAreaResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def create_research_area(
    data: ResearchAreaCreate,
    db: AsyncSession = Depends(get_db)
):
    slug = data.title.lower().replace(" ", "-").replace("&", "and")
    area = ResearchArea(
        id=slug,
        slug=slug,
        **data.dict()
    )
    db.add(area)
    await db.commit()
    await db.refresh(area)
    return area
