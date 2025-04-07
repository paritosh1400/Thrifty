// src/types/index.ts
export type Sender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp?: number; // Optional: for sorting or display
}

export interface ChatSession {
  id: string;
  title: string;
  // We might load messages separately, so keep it simple for now
  // messages: ChatMessage[];
  lastUpdated?: number; // Optional: for sorting sessions
}