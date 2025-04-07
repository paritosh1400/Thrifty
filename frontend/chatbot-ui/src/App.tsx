// src/App.tsx
import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import ChatArea from './components/chat/ChatArea';
import { ChatSession, ChatMessage } from './types'; // Import types
import './index.css'; // Ensure Tailwind is imported

// --- Mock Data ---
// Replace this with actual state management and API calls later
const initialSessions: ChatSession[] = [
  { id: '1', title: 'React State Management Tips', lastUpdated: Date.now() - 10000 },
  { id: '2', title: 'Tailwind Dark Mode Setup', lastUpdated: Date.now() - 50000 },
  { id: '3', title: 'Vite Project Configuration', lastUpdated: Date.now() - 100000 },
];

const initialMessages: Record<string, ChatMessage[]> = {
  '1': [
    { id: 'm1-1', sender: 'user', text: 'How to manage state in React effectively?' },
    { id: 'm1-2', sender: 'bot', text: 'You can use Context API for simple cases, Zustand or Redux for complex apps. What scale are you working at?' },
  ],
  '2': [
    { id: 'm2-1', sender: 'user', text: 'How do I set up dark mode in Tailwind?' },
    { id: 'm2-2', sender: 'bot', text: 'Set `darkMode: "class"` in your `tailwind.config.js` and add the `dark` class to your html or body element.' },
    { id: 'm2-3', sender: 'user', text: 'Got it, thanks!' },
  ],
  '3': [], // Empty chat initially
};
// --- End Mock Data ---

function App() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(initialSessions);
  const [activeChatId, setActiveChatId] = useState<string | null>(initialSessions[0]?.id || null); // Start with the first chat active
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
  };

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`; // Simple unique ID
    const newChatSession: ChatSession = {
      id: newChatId,
      title: 'New Chat',
      lastUpdated: Date.now(),
    };
    setChatSessions([newChatSession, ...chatSessions]); // Add to top
    setMessages(prev => ({ ...prev, [newChatId]: [] })); // Initialize messages for the new chat
    setActiveChatId(newChatId);
    console.log('Starting new chat...');
    // TODO: Maybe focus input field
  };

  const handleSendMessage = (newMessageText: string) => {
    if (!activeChatId || !newMessageText.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: newMessageText.trim(),
      timestamp: Date.now(),
    };

    // Update messages for the active chat
    setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), userMessage]
    }));

    // --- Mock Bot Response ---
    // Replace this with actual API call
    setTimeout(() => {
        const botResponse: ChatMessage = {
            id: `msg-${Date.now() + 1}`, // Ensure unique ID
            sender: 'bot',
            text: `Echo: ${newMessageText.trim()}`, // Simple echo bot
            timestamp: Date.now() + 1,
        };
        setMessages(prev => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), botResponse]
        }));
    }, 1000); // Simulate delay
    // --- End Mock Bot Response ---

  }

  const currentMessages = activeChatId ? messages[activeChatId] || [] : [];

  // Apply 'dark' class globally here for simplicity, or manage via state/localStorage
  return (
    <div className="flex h-screen w-screen overflow-hidden dark bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Sidebar
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <ChatArea
        key={activeChatId} // Re-mount ChatArea when chat changes to reset internal state if needed
        messages={currentMessages}
        onSendMessage={handleSendMessage}
        isLoading={false} // TODO: Add loading state for bot response
        chatId={activeChatId} // Pass chatId to indicate if a chat is selected
      />
    </div>
  );
}

export default App;