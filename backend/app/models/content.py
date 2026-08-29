from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey, JSON
from app.database.session import Base


class NewsArticle(Base):
    __tablename__ = "news"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(512), nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    cover_image = Column(String(512), nullable=True)
    publish_date = Column(String(64), nullable=False)
    author = Column(String(255), default="AIRC Newsroom", nullable=False)
    category = Column(String(50), default="Research", nullable=False)  # Research, Award, Collaboration, Announcement
    tags = Column(JSON, default=list)
    featured = Column(Boolean, default=False, nullable=False)
    status = Column(String(50), default="Published", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class EventItem(Base):
    __tablename__ = "events"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(512), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(String(50), default="Symposium", nullable=False)  # Conference, Workshop, Seminar, Webinar, Hackathon, Symposium
    speaker = Column(JSON, default=dict)  # { name, title, affiliation }
    organizer = Column(String(255), default="AIRC Directorate", nullable=False)
    date = Column(String(64), nullable=False)
    time = Column(String(64), nullable=False)
    location = Column(String(255), nullable=False)
    is_virtual = Column(Boolean, default=False, nullable=False)
    virtual_link = Column(String(512), nullable=True)
    registration_open = Column(Boolean, default=True, nullable=False)
    registration_deadline = Column(String(64), nullable=True)
    capacity = Column(Integer, default=100, nullable=False)
    registered_count = Column(Integer, default=0, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(512), nullable=False)
    type = Column(String(50), nullable=False)  # Postdoctoral Fellowship, Ph.D. Assistantship, Intern, etc.
    department = Column(String(255), nullable=False)
    research_area_id = Column(String(64), nullable=True)
    supervisor_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    responsibilities = Column(JSON, default=list)
    requirements = Column(JSON, default=list)
    stipend = Column(String(128), nullable=True)
    duration = Column(String(128), nullable=False)
    deadline = Column(String(64), nullable=False)
    status = Column(String(50), default="Open", nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Application(Base):
    __tablename__ = "applications"

    id = Column(String(64), primary_key=True, index=True)
    opportunity_id = Column(String(64), ForeignKey("opportunities.id", ondelete="CASCADE"), nullable=False)
    opportunity_title = Column(String(512), nullable=False)
    applicant_name = Column(String(255), nullable=False)
    applicant_email = Column(String(255), nullable=False)
    applicant_phone = Column(String(64), nullable=True)
    current_institution = Column(String(255), nullable=False)
    degree_level = Column(String(64), nullable=False)
    gpa = Column(String(64), nullable=True)
    cv_url = Column(String(512), nullable=True)
    statement_of_purpose = Column(Text, nullable=False)
    status = Column(String(50), default="Submitted", nullable=False)  # Submitted, Under Review, Shortlisted, Interview, Accepted, Rejected
    submitted_date = Column(String(64), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ResourceItem(Base):
    __tablename__ = "resources"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(512), nullable=False)
    description = Column(Text, nullable=False)
    type = Column(String(50), nullable=False)  # Dataset, Model, Code, Tutorial, Manual, Paper
    author = Column(String(255), nullable=False)
    research_area_id = Column(String(64), nullable=True)
    download_url = Column(String(512), nullable=False)
    file_size = Column(String(64), nullable=False)
    version = Column(String(32), default="1.0", nullable=False)
    license = Column(String(128), default="MIT", nullable=False)
    visibility = Column(String(50), default="Public", nullable=False)  # Public, Members, Restricted
    downloads = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Partner(Base):
    __tablename__ = "partners"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # University, Industry, Hospital, Government
    logo = Column(String(512), nullable=True)
    description = Column(Text, nullable=False)
    website = Column(String(512), nullable=False)
    joint_projects_count = Column(Integer, default=0, nullable=False)
    featured = Column(Boolean, default=True, nullable=False)


class Collaboration(Base):
    __tablename__ = "collaborations"

    id = Column(String(64), primary_key=True, index=True)
    organization = Column(String(255), nullable=False)
    contact_person = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(64), nullable=True)
    collaboration_type = Column(String(100), nullable=False)
    research_area_id = Column(String(64), nullable=True)
    proposal_summary = Column(Text, nullable=False)
    assigned_researcher_id = Column(String(64), nullable=True)
    status = Column(String(50), default="Submitted", nullable=False)  # Submitted, In Discussion, Approved, Rejected
    submitted_date = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    department = Column(String(255), default="General Inquiries", nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    read = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
