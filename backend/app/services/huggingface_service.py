import requests
import os

class HuggingFaceService:
    def __init__(self):
        self.api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
        self.headers = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_TOKEN')}"}

    def generate_response(self, prompt):
        """Generate response from Hugging Face Mistral model."""
        payload = {
            "inputs": prompt,
            "options": {"wait_for_model": True}
        }
        try:
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            if response.status_code == 200:
                result = response.json()[0].get("generated_text", "Error: No response generated.")
                if result.startswith(prompt):
                    result = result[len(prompt):].strip()
                return result
            else:
                return ""
        except Exception as e:
            print(f"Error: {e}")
            return ""