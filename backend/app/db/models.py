import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base

class Report(Base):
    """Stores full research reports for Past Reports & Dashboard."""
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    idea = Column(String(500), nullable=False)
    target_market = Column(String(100), nullable=False)
    
    # Store the entire structured output as JSON
    market_report = Column(JSON, nullable=True)
    competitor_report = Column(JSON, nullable=True)
    customer_report = Column(JSON, nullable=True)
    product_strategy = Column(JSON, nullable=True)
    research_plan = Column(JSON, nullable=True)
    sources = Column(JSON, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)


class ReportEmbedding(Base):
    """Stores chunked sections of reports with vector embeddings for RAG Chatbot."""
    __tablename__ = "report_embeddings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id", ondelete="CASCADE"), nullable=False)
    section = Column(String(100), nullable=False)  # e.g., 'market', 'competitor', 'customer'
    content = Column(Text, nullable=False)
    
    # Vector embeddings stored as high-precision float array in JSON
    embedding = Column(JSON, nullable=False)


class SavedIdea(Base):
    """Stores bookmarked business ideas for the Saved Ideas page."""
    __tablename__ = "saved_ideas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    idea = Column(String(500), nullable=False)
    target_market = Column(String(100), nullable=False)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)