from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router as research_router

app = FastAPI(
    title="MarketMind AI API",
    description="Multi-agent AI market research API",
    version="1.0.0",
)

# CORS configuration
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include research routes
app.include_router(research_router)


@app.get("/health", summary="Health check")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}
