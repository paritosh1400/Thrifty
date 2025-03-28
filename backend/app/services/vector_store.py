import chromadb

class VectorStore:
    def __init__(self):
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(name="chat_history")

    def add_message(self, message_id, message, response):
        """Add message and response to the database."""
        self.collection.add(
            ids=[message_id],
            documents=[f"User: {message}\nBot: {response}"]
        )

    def get_chat_history(self, limit=10):
        """Retrieve recent chat history."""
        all_docs = self.collection.get()
        return all_docs["documents"][-limit:] if all_docs["documents"] else []
