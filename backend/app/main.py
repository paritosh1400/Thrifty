from fastapi import FastAPI
from .routes.youtube import router as youtube_router
from .routes.wikipedia import router as wikipedia_router

app = FastAPI()
app.include_router(youtube_router, prefix="/youtube", tags=["YouTube"])
app.include_router(wikipedia_router, prefix="/wikipedia", tags=["Wikipedia"])

@app.get("/")
def home():
    return {"message": "RAG-based FastAPI Server is Running 🚀"}