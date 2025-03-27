# backend/routes/youtube.py
from fastapi import APIRouter
from ..services.youtube_service import YouTubeService

router = APIRouter()

youtube_service = YouTubeService()

@router.get("/search_video")
async def search_video(query: str):
    """Search YouTube for a video."""
    video_url, video_id = youtube_service.search_videos(query)
    if video_url:
        return {"id": video_id, "video_url": video_url}
    return {"error": "No video found."}

@router.get("/get_transcript")
async def get_transcript(video_id: str):
    """Fetch transcript for a YouTube video."""
    try:
        transcript = youtube_service.extract_timestamp(video_id, query="Your query")
        if transcript:
            return {"transcript": transcript}
        return {"error": "Transcript not found."}
    except Exception as e:
        return {"error": str(e)}
