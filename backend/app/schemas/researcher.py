from typing import List, Optional, Any
from pydantic import BaseModel


class EducationItem(BaseModel):
    degree: str
    institution: str
    year: int


class ResearcherBase(BaseModel):
    name: str
    title: str
    category: str = "faculty"
    department: str
    email: str
    phone: Optional[str] = None
    office: str
    avatar: Optional[str] = None
    bio: str
    education: List[EducationItem] = []
    research_area_ids: List[str] = []
    expertise: List[str] = []
    interests: List[str] = []
    google_scholar: Optional[str] = None
    orcid: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    h_index: int = 0
    citations: int = 0
    featured: bool = False
    status: str = "active"
    join_date: str = "2026-01-01"


class ResearcherCreate(ResearcherBase):
    pass


class ResearcherUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    department: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    office: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    education: Optional[List[EducationItem]] = None
    research_area_ids: Optional[List[str]] = None
    expertise: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    google_scholar: Optional[str] = None
    orcid: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    h_index: Optional[int] = None
    citations: Optional[int] = None
    featured: Optional[bool] = None
    status: Optional[str] = None


class ResearcherResponse(ResearcherBase):
    id: str
    slug: str

    class Config:
        from_attributes = True


class ResearchAreaBase(BaseModel):
    title: str
    short_description: str
    full_description: str
    icon: str = "Brain"
    image: Optional[str] = None
    lead_researcher_id: Optional[str] = None
    objectives: List[str] = []
    key_technologies: List[str] = []
    publication_count: int = 0
    project_count: int = 0
    featured: bool = True


class ResearchAreaCreate(ResearchAreaBase):
    pass


class ResearchAreaUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None
    lead_researcher_id: Optional[str] = None
    objectives: Optional[List[str]] = None
    key_technologies: Optional[List[str]] = None
    publication_count: Optional[int] = None
    project_count: Optional[int] = None
    featured: Optional[bool] = None


class ResearchAreaResponse(ResearchAreaBase):
    id: str
    slug: str

    class Config:
        from_attributes = True
