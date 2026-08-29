from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    researchers,
    research_areas,
    publications,
    projects,
    content,
    analytics,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(researchers.router, prefix="/researchers", tags=["Researchers"])
api_router.include_router(research_areas.router, prefix="/research-areas", tags=["Research Areas"])
api_router.include_router(publications.router, prefix="/publications", tags=["Publications"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(content.router, prefix="", tags=["Content CMS & Admissions"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics & Audit"])
