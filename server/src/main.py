from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.savings_goals.controller import router as savings_goals_router


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(savings_goals_router)


@app.get("/")
def root():
    return {"message": "FastAPI is working!"}