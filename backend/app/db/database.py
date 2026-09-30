import os
import logging
from dotenv import load_dotenv, find_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

# Explicitly load environment variables from root or current dir
load_dotenv(find_dotenv())

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

# Initialize tables safely
async def init_db():
    if not DATABASE_URL or engine is None:
        logger.info("DATABASE_URL not configured. Skipping database initialization.")
        return

    # Attempt to enable vector extension if supported
    try:
        async with engine.connect() as conn:
            await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
            await conn.commit()
    except Exception:
        pass  # Native Windows postgres without compiled extension will skip this gracefully

    # Create all tables (reports, report_embeddings, saved_ideas)
    try:
        async with engine.begin() as conn:
            from app.db import models  # Ensure all model tables are imported
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.warning(f"Database table creation failed: {e}")