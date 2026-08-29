from typing import List, Optional
from pydantic import BaseModel


class PublicationBase(BaseModel):
    title: str
    authors: List[str] = []
    venue: str
    publisher: Optional[str] = None
    year: int
    type: str = "Conference"
    research_area_id: Optional[str] = None
    abstract: str
    keywords: List[str] = []
    doi: Optional[str] = None
    pdf_url: Optional[str] = None
    code_url: Optional[str] = None
    project_id: Optional[str] = None
    citations: int = 0
    featured: bool = False
    status: str = "Published"
    submitted_date: Optional[str] = None


class PublicationCreate(PublicationBase):
    pass


class PublicationUpdate(BaseModel):
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    venue: Optional[str] = None
    publisher: Optional[str] = None
    year: Optional[int] = None
    type: Optional[str] = None
    research_area_id: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[List[str]] = None
    doi: Optional[str] = None
    pdf_url: Optional[str] = None
    code_url: Optional[str] = None
    project_id: Optional[str] = None
    citations: Optional[int] = None
    featured: Optional[bool] = None
    status: Optional[str] = None


class PublicationResponse(PublicationBase):
    id: str
    slug: str

    class Config:
        from_attributes = True


class DeliverableItem(BaseModel):
    title: str
    date: str
    completed: bool = False


class ProjectBase(BaseModel):
    title: str
    project_code: Optional[str] = None
    short_description: str
    full_description: str
    problem_statement: Optional[str] = None
    objectives: List[str] = []
    methodology: Optional[str] = None
    research_area_id: Optional[str] = None
    principal_investigator_id: Optional[str] = None
    team: List[str] = []
    technologies: List[str] = []
    status: str = "Ongoing"
    start_date: str
    end_date: Optional[str] = None
    funding_body: str
    funding_amount: str
    featured: bool = False
    image: Optional[str] = None
    deliverables: List[DeliverableItem] = []


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    project_code: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    problem_statement: Optional[str] = None
    objectives: Optional[List[str]] = None
    methodology: Optional[str] = None
    research_area_id: Optional[str] = None
    principal_investigator_id: Optional[str] = None
    team: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    status: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    funding_body: Optional[str] = None
    funding_amount: Optional[str] = None
    featured: Optional[bool] = None
    image: Optional[str] = None
    deliverables: Optional[List[DeliverableItem]] = None


class ProjectResponse(ProjectBase):
    id: str
    slug: str

    class Config:
        from_attributes = True
