import uuid
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.database.session import get_db
from app.models.content import (
    NewsArticle, EventItem, Opportunity, Application, 
    ResourceItem, Partner, Collaboration, ContactMessage
)
from app.schemas.content import (
    NewsResponse, NewsCreate,
    EventResponse, EventCreate,
    OpportunityResponse, OpportunityCreate,
    ApplicationResponse, ApplicationCreate, ApplicationStatusUpdate,
    ResourceResponse, ResourceCreate,
    CollaborationResponse, CollaborationCreate,
    ContactMessageResponse, ContactMessageCreate
)
from app.api.deps import require_roles

router = APIRouter()


# --- NEWS ENDPOINTS ---
@router.get("/news", response_model=List[NewsResponse])
async def list_news(
    category: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(NewsArticle)
    if category:
        query = query.where(NewsArticle.category == category)
    result = await db.execute(query.order_by(NewsArticle.publish_date.desc()))
    return result.scalars().all()


@router.post("/news", response_model=NewsResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "EDITOR"]))])
async def create_news(data: NewsCreate, db: AsyncSession = Depends(get_db)):
    slug = data.title.lower().replace(" ", "-").replace(":", "")[:100]
    article = NewsArticle(id=f"news-{uuid.uuid4().hex[:12]}", slug=slug, **data.dict())
    db.add(article)
    await db.commit()
    await db.refresh(article)
    return article


# --- EVENTS ENDPOINTS ---
@router.get("/events", response_model=List[EventResponse])
async def list_events(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EventItem).order_by(EventItem.date.asc()))
    return result.scalars().all()


@router.post("/events", response_model=EventResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "EDITOR"]))])
async def create_event(data: EventCreate, db: AsyncSession = Depends(get_db)):
    slug = data.title.lower().replace(" ", "-")[:100]
    event = EventItem(id=f"event-{uuid.uuid4().hex[:12]}", slug=slug, **data.dict())
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


# --- OPPORTUNITIES & APPLICATIONS ENDPOINTS ---
@router.get("/opportunities", response_model=List[OpportunityResponse])
async def list_opportunities(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Opportunity).order_by(Opportunity.created_at.desc()))
    return result.scalars().all()


@router.post("/opportunities", response_model=OpportunityResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def create_opportunity(data: OpportunityCreate, db: AsyncSession = Depends(get_db)):
    slug = data.title.lower().replace(" ", "-")[:100]
    opp = Opportunity(id=f"opp-{uuid.uuid4().hex[:12]}", slug=slug, **data.dict())
    db.add(opp)
    await db.commit()
    await db.refresh(opp)
    return opp


@router.get("/applications", response_model=List[ApplicationResponse], dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def list_applications(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Application).order_by(Application.created_at.desc()))
    return result.scalars().all()


@router.post("/applications", response_model=ApplicationResponse)
async def submit_application(data: ApplicationCreate, db: AsyncSession = Depends(get_db)):
    app = Application(
        id=f"app-{uuid.uuid4().hex[:12]}",
        submitted_date=datetime.utcnow().strftime("%Y-%m-%d"),
        status="Submitted",
        **data.dict()
    )
    db.add(app)
    await db.commit()
    await db.refresh(app)
    return app


@router.patch("/applications/{id}/status", response_model=ApplicationResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def update_application_status(
    id: str,
    data: ApplicationStatusUpdate,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Application).where(Application.id == id))
    app = result.scalars().first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = data.status
    if data.notes:
        app.notes = data.notes
    await db.commit()
    await db.refresh(app)
    return app


# --- RESOURCES & PARTNERS ENDPOINTS ---
@router.get("/resources", response_model=List[ResourceResponse])
async def list_resources(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ResourceItem).order_by(ResourceItem.created_at.desc()))
    return result.scalars().all()


@router.post("/resources", response_model=ResourceResponse, dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN", "RESEARCHER"]))])
async def create_resource(data: ResourceCreate, db: AsyncSession = Depends(get_db)):
    res = ResourceItem(id=f"res-{uuid.uuid4().hex[:12]}", **data.dict())
    db.add(res)
    await db.commit()
    await db.refresh(res)
    return res


@router.get("/partners")
async def list_partners(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Partner))
    return result.scalars().all()


# --- COLLABORATIONS & CONTACT ---
@router.get("/collaborations", response_model=List[CollaborationResponse], dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def list_collaborations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Collaboration).order_by(Collaboration.created_at.desc()))
    return result.scalars().all()


@router.post("/collaborations", response_model=CollaborationResponse)
async def submit_collaboration(data: CollaborationCreate, db: AsyncSession = Depends(get_db)):
    collab = Collaboration(
        id=f"collab-{uuid.uuid4().hex[:12]}",
        submitted_date=datetime.utcnow().strftime("%Y-%m-%d"),
        status="Submitted",
        **data.dict()
    )
    db.add(collab)
    await db.commit()
    await db.refresh(collab)
    return collab


@router.post("/contact", response_model=ContactMessageResponse)
async def send_contact_message(data: ContactMessageCreate, db: AsyncSession = Depends(get_db)):
    msg = ContactMessage(
        id=f"msg-{uuid.uuid4().hex[:12]}",
        read=False,
        **data.dict()
    )
    db.add(msg)
    await db.commit()
    await db.refresh(msg)
    return msg
