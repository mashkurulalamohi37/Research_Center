from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database.session import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    project_code = Column(String(64), nullable=True)
    title = Column(String(512), nullable=False)
    short_description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=False)
    problem_statement = Column(Text, nullable=True)
    objectives = Column(JSON, default=list)
    methodology = Column(Text, nullable=True)
    research_area_id = Column(String(64), ForeignKey("research_areas.id", ondelete="SET NULL"), nullable=True)
    principal_investigator_id = Column(String(64), ForeignKey("researchers.id", ondelete="SET NULL"), nullable=True)
    team = Column(JSON, default=list)  # List of researcher IDs/names
    technologies = Column(JSON, default=list)
    status = Column(String(50), default="Ongoing", nullable=False)  # Ongoing, Completed, Proposed, Under Review, Archived
    start_date = Column(String(64), nullable=False)
    end_date = Column(String(64), nullable=True)
    funding_body = Column(String(255), nullable=False)
    funding_amount = Column(String(64), nullable=False)
    featured = Column(Boolean, default=False, nullable=False)
    image = Column(String(512), nullable=True)
    deliverables = Column(JSON, default=list)  # List of { title, date, completed }
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    research_area = relationship("ResearchArea", back_populates="projects")
    principal_investigator = relationship("Researcher", back_populates="principal_projects")
