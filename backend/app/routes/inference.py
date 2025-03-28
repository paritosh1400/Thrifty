from fastapi import APIRouter, HTTPException
from uuid import uuid4
from ..services.ollama_service import OllamaService
from ..services.vector_store import VectorStore

router = APIRouter()

ollama_service = OllamaService()
vector_store = VectorStore()

@router.post("/chat")
def chat(prompt: str):
    """Handle user chat query with history."""
    try:
        if not prompt:
            raise HTTPException(status_code=400, detail="Missing 'prompt' in request")

        history = vector_store.get_chat_history()
        formatted_history = "\n".join(history)

        full_prompt = f"""{formatted_history}
User: {prompt}
Bot:
"""
        response = ollama_service.generate_response(full_prompt)
        if response:
            message_id = str(uuid4())
            vector_store.add_message(message_id, prompt, response)

        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
