import wikipedia
import os
from dotenv import load_dotenv

load_dotenv()

class WikipediaService:
    def __init__(self):
        self.language = os.getenv("WIKIPEDIA_LANGUAGE", "en")
        wikipedia.set_lang(self.language)

    def get_page_content(self, page_title: str) -> str:
        try:
            page = wikipedia.page(page_title)
            return page.content
        except Exception as e:
            print("Error fetching Wikipedia page:", e)
            return None

    def save_page_to_file(self, page_title: str, output_path: str) -> str:
        content = self.get_page_content(page_title)
        if content:
            try:
                with open(output_path, "w", encoding="utf-8") as file:
                    file.write(content)
                return output_path
            except Exception as e:
                print("Error writing to file:", e)
                return None
        else:
            return None

if __name__ == "__main__":
    service = WikipediaService()
    page_title = "MachineLearning"
    output_path = "machine_learning.txt"
    
    result = service.save_page_to_file(page_title, output_path)
    if result:
        print(f"Page '{page_title}' saved as file: {result}")
    else:
        print(f"Failed to save page '{page_title}'.")