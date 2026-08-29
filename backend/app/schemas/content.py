from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr


class NewsBase(BaseModel):
    title: str
    excerpt: str
    content: str
    cover_image: Optional[str] = None
    publish_date: str
    author: str = "AIRC Newsroom"
    category: str = "Research"
    tags: List[str] = []
    featured: bool = False
    status: str = "Published"


class NewsCreate(NewsBase):
    pass


class NewsResponse(NewsBase):
    id: str
    slug: str

    class Config:
        from_attributes = True


class EventSpeaker(BaseModel):
    name: str
    title: str
    affiliation: str


class EventBase(BaseModel):
    title: str
    description: str
    type: str = "Symposium"
    speaker: EventSpeaker
    organizer: str = "AIRC Directorate"
    date: str
    time: str
    location: str
    is_virtual: bool = False
    virtual_link: Optional[str] = None
    registration_open: bool = True
    registration_deadline: Optional[str] = None
    capacity: int = 100
    registered_count: int = 0
    featured: bool = False


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: str
    slug: str

    class Config:
        from_attributes = True


class OpportunityBase(BaseModel):
    title: str
    type: str
    department: str
    research_area_id: Optional[str] = None
    supervisor_name: str
    description: str
    responsibilities: List[str] = []
    requirements: List[str] = []
    stipend: Optional[str] = None
    duration: str
    deadline: str
    status: str = "Open"
    featured: bool = False


class OpportunityCreate(OpportunityBase):
    pass


class OpportunityResponse(OpportunityBase):
    id: str
    slug: str

    class Config:
        from_attributes = True


class ApplicationBase(BaseModel):
    opportunity_id: str
    opportunity_title: str
    applicant_name: str
    applicant_email: EmailStr
    applicant_phone: Optional[str] = None
    current_institution: str
    degree_level: str
    gpa: Optional[str] = None
    cv_url: Optional[str] = None
    statement_of_purpose: str


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None


class ApplicationResponse(ApplicationBase):
    id: str
    status: str
    submitted_date: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True


class ResourceBase(BaseModel):
    title: str
    description: str
    type: str
    author: str
    research_area_id: Optional[str] = None
    download_url: str
    file_size: str
    version: str = "1.0"
    license: str = "MIT"
    visibility: str = "Public"
    downloads: int = 0


class ResourceCreate(ResourceBase):
    pass


class ResourceResponse(ResourceBase):
    id: str

    class Config:
        from_attributes = True


class CollaborationCreate(BaseModel):
    organization: str
    contact_person: str
    email: EmailStr
    phone: Optional[str] = None
    collaboration_type: str
    research_area_id: Optional[str] = None
    proposal_summary: str


class CollaborationResponse(CollaborationCreate):
    id: str
    assigned_researcher_id: Optional[str] = None
    status: str
    submitted_date: str

    class Config:
        from_attributes = True


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    department: str = "General Inquiries"
    subject: str
    message: str


class ContactMessageResponse(ContactMessageCreate):
    id: str
    read: bool

    class Config:
        from_attributes = True
