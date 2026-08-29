from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database.session import Base


class Publication(Base):
    __tablename__ = "publications"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(512), nullable=False)
    authors = Column(JSON, default=list, nullable=False)  # List of strings or researcher IDs
    venue = Column(String(255), nullable=False)
    publisher = Column(String(255), nullable=True)
    year = Column(Integer, nullable=False)
    type = Column(String(50), default="Conference", nullable=False)  # Journal, Conference, Preprint, Workshop, Book Chapter
    research_area_id = Column(String(64), ForeignKey("research_areas.id", ondelete="SET NULL"), nullable=True)
    abstract = Column(Text, nullable=False)
    keywords = Column(JSON, default=list)
    doi = Column(String(128), nullable=True)
    pdf_url = Column(String(512), nullable=True)
    code_url = Column(String(512), nullable=True)
    project_id = Column(String(64), nullable=True)
    citations = Column(Integer, default=0, nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    status = Column(String(50), default="Published", nullable=False)  # Published, Pending Review, Draft, Rejected
    submitted_date = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    research_area = relationship("ResearchArea", back_populates="publications")
