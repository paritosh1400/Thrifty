from fastapi import FastAPI
from .routes.youtube import router as youtube_router

app = FastAPI()
app.include_router(youtube_router, prefix="/youtube", tags=["YouTube"])

@app.get("/")
def home():
    return {"message": "RAG-based FastAPI Server is Running 🚀"}