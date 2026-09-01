from fastapi import FastAPI

app = FastAPI(title="Personal Budget Planning Platform")


@app.get("/")
def root():
    return {"message": "Personal Budget Planning API is working"}