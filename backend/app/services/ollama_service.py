import requests
import os

class OllamaService:
    def __init__(self):
        self.ollama_url = os.getenv("OLLAMA_API_URL", "http://localhost:11434/api/generate")

    def generate_response(self, prompt):
        """Generate response from Ollama model."""
        payload = {
                "model": "llama3:8b",
                "prompt": prompt,
                "stream": False
            }
        try:
            response = requests.post(self.ollama_url, json=payload)
            if response.status_code == 200:
                return response.json().get("response", "Error: No response generated.")
        except Exception as e:
            print(f"Error: {e}")
            return ""
