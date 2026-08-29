from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database.session import Base


class ResearchArea(Base):
    __tablename__ = "research_areas"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=False)
    icon = Column(String(64), default="Brain", nullable=False)
    image = Column(String(512), nullable=True)
    lead_researcher_id = Column(String(64), nullable=True)
    objectives = Column(JSON, default=list)
    key_technologies = Column(JSON, default=list)
    publication_count = Column(Integer, default=0, nullable=False)
    project_count = Column(Integer, default=0, nullable=False)
    featured = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    projects = relationship("Project", back_populates="research_area")
    publications = relationship("Publication", back_populates="research_area")
