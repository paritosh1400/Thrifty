import chromadb
from datetime import datetime

class VectorStore:
    def __init__(self):
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(name="chat_history")

    def add_message(self, chat_id, message, response):
        """Add message and response to the database."""
        timestamp = datetime.now().isoformat()
        self.collection.add(
            ids=[f"{chat_id}-{timestamp}"],
            documents=[f"User: {message}\nBot: {response}"],
            metadatas=[{"chat_id": chat_id, "timestamp": timestamp}]
        )

    def get_chat_history(self, chat_id, limit=10):
        """Retrieve recent chat history."""
        results = self.collection.get(
            where={"chat_id": chat_id},
            include=["documents", "metadatas"],
        )
        if results and results["ids"]:
            combined = []
            for i, doc in enumerate(results["documents"]):
                combined.append({
                    "document": doc,
                    "metadata": results["metadatas"][i] if "metadatas" in results and results["metadatas"] else {}
                })
            sorted_combined = sorted(combined, key=lambda item: item["metadata"].get("timestamp", ""), reverse=True)
            return [item["document"] for item in sorted_combined[:limit]]
        return []
    
    def _fetch_latest_chat(self):
        """Fetches the most recent chat history based on some criteria (e.g., timestamp in metadata)."""
        all_docs = self.collection.get(
            include=["metadatas", "documents"],
            sort="timestamp:DESC"
        )
        if all_docs["ids"]:
            return all_docs["documents"]
        return []
    
    def get_all_chats(self):
        """Retrieve all unique chat IDs."""
        all_metadatas = self.collection.get(include=["metadatas"])["metadatas"]
        if all_metadatas:
            return list(set([meta["chat_id"] for meta in all_metadatas]))
        return []
