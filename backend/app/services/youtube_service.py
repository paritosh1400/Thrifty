import cv2
import networkx as nx
import yt_dlp as youtube_dl
from difflib import SequenceMatcher
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import spacy
import os
from dotenv import load_dotenv

load_dotenv()

nlp = spacy.load("en_core_web_sm")

class YouTubeService:
    def __init__(self):
        self.api_key = os.getenv("YOUTUBE_API_KEY")

    def search_videos(self, query):
        """Search for relevant YouTube videos based on the query."""
        try:
            ydl_opts = {
                'format': 'best',
                'quiet': True,
                'extract_flat': True,
            }
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                search_results = ydl.extract_info(f"ytsearch:{query}", download=False)
                if 'entries' in search_results and search_results['entries']:
                    return search_results['entries'][0]['url'], search_results['entries'][0]['id']
            return None
        except (youtube_dl.utils.DownloadError, HttpError) as e:
            print("Error:", e)
            return None

    def extract_timestamp(self, video_id, query):
        """Extract the best timestamp from the YouTube transcript."""
        try:
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

            for transcript in transcript_list:
                translated_transcript = transcript.translate('en').fetch()
                
                for segment in translated_transcript:
                    text = segment['text']
                    start = segment['start']
                    duration = segment['duration']
                    
                    timestamp, score = self.find_best_timestamp(text, query, start, duration)
                    return timestamp, score
            return None, None
        except:
            print("Subtitles are disabled or unavailable.")
            return None, None

    def find_best_timestamp(self, transcript, query, start, duration, chunk_length=100):
        """Find the most relevant timestamp in the transcript."""
        chunks = [transcript[i:i + chunk_length] for i in range(0, len(transcript), chunk_length)]
        best_score = 0.4
        best_timestamp = None
        total_duration = duration * len(chunks)

        for index, chunk in enumerate(chunks):
            score = SequenceMatcher(None, query.lower(), chunk.lower()).ratio()
            if score > best_score:
                chunk_start_time = start + (index * chunk_length / len(transcript)) * total_duration
                chunk_midpoint = chunk_start_time + (chunk_length / 2) * total_duration / len(transcript)
                best_timestamp = chunk_midpoint

        return best_timestamp, best_score

    def extract_frame(self, video_url, start_time, output_path):
        """Extract a video frame from the given YouTube URL at the specified timestamp."""
        try:
            ydl_opts = {'quiet': True, 'format': 'best'}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(video_url, download=False)
                best_format = max(info_dict.get('formats', []), key=lambda x: x.get('filesize', 0))

            cap = cv2.VideoCapture(best_format['url'])
            if not cap.isOpened():
                print("Error: Could not open the video stream.")
                return None

            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_number = int(start_time * fps)
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
            ret, frame = cap.read()

            if ret:
                cv2.imwrite(output_path, frame)
                return output_path
            else:
                print("Error: Could not read frame.")
                return None
        except Exception as e:
            print("Error:", e)
            return None