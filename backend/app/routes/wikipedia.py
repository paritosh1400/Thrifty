# backend/app/routes/wikipedia.py
from fastapi import APIRouter, HTTPException
from ..services.wikipedia_service import WikipediaService

router = APIRouter()
wikipedia_service = WikipediaService()

@router.get("/page_content")
async def get_page_content(page_title: str):
    content = wikipedia_service.get_page_content(page_title)
    if content is None:
        raise HTTPException(status_code=404, detail="Error fetching content.")
    return {"page_title": page_title, "content": content}

@router.get("/save_page")
async def save_page(page_title: str, output_path: str):
    result = wikipedia_service.save_page_to_file(page_title, output_path)
    if result is None:
        raise HTTPException(status_code=500, detail="error saving content.")
    return {"message": f"Page '{page_title}' saved as file: {result}"}