from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    prompt: str
    chat_id: Optional[str] = None