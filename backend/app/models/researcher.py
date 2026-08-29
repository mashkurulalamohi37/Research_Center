from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database.session import Base


class Researcher(Base):
    __tablename__ = "researchers"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id", ondelete="SET NULL"), unique=True, nullable=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(50), default="faculty", nullable=False)  # faculty, postdoc, student, visiting
    department = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(64), nullable=True)
    office = Column(String(255), nullable=False)
    avatar = Column(String(512), nullable=True)
    bio = Column(Text, nullable=False)
    education = Column(JSON, default=list)  # List of { degree, institution, year }
    research_area_ids = Column(JSON, default=list)  # List of area IDs
    expertise = Column(JSON, default=list)  # List of keywords
    interests = Column(JSON, default=list)
    google_scholar = Column(String(512), nullable=True)
    orcid = Column(String(128), nullable=True)
    linkedin = Column(String(512), nullable=True)
    github = Column(String(512), nullable=True)
    h_index = Column(Integer, default=0, nullable=False)
    citations = Column(Integer, default=0, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    status = Column(String(50), default="active", nullable=False)  # active, on-leave, alumni
    join_date = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="researcher")
    principal_projects = relationship("Project", back_populates="principal_investigator")
