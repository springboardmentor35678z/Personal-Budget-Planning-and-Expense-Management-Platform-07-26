from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import api_router
from src.database.core import create_tables


@asynccontextmanager
async def lifespan(_app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title='BudgetBuddy API',
    version='1.0.0',
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
    allow_credentials=True,
    allow_methods=[
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS',
    ],
    allow_headers=[
        'Content-Type',
        'Authorization',
    ],
)


@app.get('/')
def root():
    return {
        'message': 'FastAPI is working!'
    }


app.include_router(api_router)