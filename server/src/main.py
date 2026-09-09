from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.analytics.controller import router as analytics_router
from src.database.core import Base, engine
from src.entities import Transaction, Todo, User

app = FastAPI(title='Budget Planning API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173', 
        'http://127.0.0.1:5173',
        'http://localhost:5174', 
        'http://127.0.0.1:5174'
    ],
    allow_methods=['*'], 
    allow_headers=['*'],
)

Base.metadata.create_all(bind=engine)
app.include_router(analytics_router)

@app.get('/')
def root():
    return {'message': 'FastAPI is working!'}