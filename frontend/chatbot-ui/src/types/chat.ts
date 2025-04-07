export interface Message {
    id: string;
    role: 'user' | 'assistant'; // Or 'model' like Gemini
    content: string;
    timestamp: Date;
  }
  
  export interface ChatSession {
    id: string;
    title: string; // e.g., "Chat about React Hooks"
    messages: Message[];
    createdAt: Date;
  }