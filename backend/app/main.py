from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router as research_router
from app.db.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize pgvector extension and tables on startup
    await init_db()
    yield

app = FastAPI(
    title="MarketMind AI API",
    description="Multi-agent AI market research API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(research_router)

@app.get("/health", summary="Health check")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}