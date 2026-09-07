from fastapi import FastAPI

app = FastAPI(title="Personal Budget Planning API")


@app.get("/")
def root():
    return {"message": "Personal Budget API is running"}