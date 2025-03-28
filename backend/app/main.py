from fastapi import FastAPI
from .routes.youtube import router as youtube_router
from .routes.inference import router as chat_router

app = FastAPI()
app.include_router(youtube_router, prefix="/youtube", tags=["YouTube"])
app.include_router(chat_router, prefix="/chatbot")

@app.get("/")
def home():
    return {"message": "RAG-based FastAPI Server is Running 🚀"}