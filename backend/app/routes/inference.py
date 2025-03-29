from fastapi import APIRouter, HTTPException
from uuid import uuid4
# from ..services.ollama_service import OllamaService
from ..services.huggingface_service import HuggingFaceService
from ..services.vector_store import VectorStore
from ..models.chat_models import ChatRequest

router = APIRouter()

# ollama_service = OllamaService()
huggingface_service = HuggingFaceService()
vector_store = VectorStore()

@router.post("/chat")
async def chat(prompt, chat_id: str = ""):
    """Handle user chat query with history for multiple chats."""

    try:
        if not prompt:
            raise HTTPException(status_code=400, detail="Missing 'prompt' in request")

        if not chat_id:
            chat_id = str(uuid4())  # Generate a new chat ID if not provided

        history = vector_store.get_chat_history(chat_id=chat_id)
        print(history)
        formatted_history = "\n".join(history)

        full_prompt = f"""{formatted_history}
User: {prompt}
Bot:
"""
        response = huggingface_service.generate_response(full_prompt)
        if response:
            vector_store.add_message(chat_id, prompt, response)

        return {"response": response, "chat_id": chat_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
