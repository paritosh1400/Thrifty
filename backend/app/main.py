from fastapi import FastAPI
from .routes.piazza import router as piazza_router

app = FastAPI()
app.include_router(piazza_router, prefix="/piazza", tags=["Piazza"])

@app.get("/")
def home():
    return {"message": "RAG-based FastAPI Server is Running 🚀"}