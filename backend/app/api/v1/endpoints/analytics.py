from typing import Dict, Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database.session import get_db
from app.models.researcher import Researcher
from app.models.publication import Publication
from app.models.project import Project
from app.models.content import Opportunity, Application, Collaboration
from app.models.user import AuditLog
from app.api.deps import require_roles

router = APIRouter()


@router.get("/overview")
async def get_analytics_overview(db: AsyncSession = Depends(get_db)):
    res_count = (await db.execute(select(func.count(Researcher.id)))).scalar() or 0
    pub_count = (await db.execute(select(func.count(Publication.id)))).scalar() or 0
    proj_count = (await db.execute(select(func.count(Project.id)))).scalar() or 0
    opp_count = (await db.execute(select(func.count(Opportunity.id)))).scalar() or 0
    app_count = (await db.execute(select(func.count(Application.id)))).scalar() or 0
    collab_count = (await db.execute(select(func.count(Collaboration.id)))).scalar() or 0

    return {
        "total_researchers": res_count,
        "total_publications": pub_count,
        "total_projects": proj_count,
        "total_opportunities": opp_count,
        "total_applications": app_count,
        "total_collaborations": collab_count,
        "total_grants_usd": 18250000,
        "global_citations": 48000,
        "average_h_index": 48
    }


@router.get("/audit-logs", dependencies=[Depends(require_roles(["ADMIN", "SUPER_ADMIN"]))])
async def get_audit_logs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(50))
    return result.scalars().all()
