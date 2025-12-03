from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlmodel import SQLModel
from app.core.config import settings
from app.db.session import engine
from app.api import auth
from app.api.routers import players, events, matches, finance, licenses, inventory, ai
from app.models import models # Import models to register them with SQLModel

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    SQLModel.metadata.create_all(engine)
    yield

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(players.router, prefix="/players", tags=["players"])
app.include_router(events.router, prefix="/events", tags=["events"])
app.include_router(matches.router, prefix="/matches", tags=["matches"])
app.include_router(finance.router, prefix="/finance", tags=["finance"])
app.include_router(licenses.router, prefix="/licenses", tags=["licenses"])
app.include_router(inventory.router, prefix="/inventory", tags=["inventory"])
app.include_router(ai.router, prefix="/ai", tags=["ai"])

@app.get("/")
def root():
    return {"message": "Welcome to Football Manager API"}
