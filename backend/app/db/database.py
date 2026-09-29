import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

# Update with your DB URL (supports Supabase/Neon/Docker)
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://postgres:postgres@localhost:5432/marketmind"
)

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

# Dependency for FastAPI routes
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# Initialize pgvector extension and create tables
async def init_db():
    async with engine.begin() as conn:
        # Enable vector extension
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)