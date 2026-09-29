import os
import logging
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

engine = None
AsyncSessionLocal = None

if DATABASE_URL:
    try:
        engine = create_async_engine(DATABASE_URL, echo=False)
        AsyncSessionLocal = async_sessionmaker(
            bind=engine,
            class_=AsyncSession,
            expire_on_commit=False
        )
    except Exception as e:
        logger.warning(f"Could not configure database engine: {e}")

class Base(DeclarativeBase):
    pass

# Dependency for FastAPI routes
async def get_db():
    if AsyncSessionLocal is None:
        yield None
        return
    async with AsyncSessionLocal() as session:
        yield session

# Initialize pgvector extension and create tables safely
async def init_db():
    if not DATABASE_URL or engine is None:
        logger.info("DATABASE_URL not configured. Skipping database initialization.")
        return

    try:
        async with engine.begin() as conn:
            # Enable vector extension
            await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
            # Create all tables
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.warning(f"Database connection skipped or failed: {e}")