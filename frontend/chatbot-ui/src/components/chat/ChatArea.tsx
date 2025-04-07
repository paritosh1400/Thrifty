// src/components/chat/ChatArea.tsx
import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { ChatMessage } from '../../types'; // Import type

interface ChatAreaProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean; // To show loading indicator for bot response
  chatId: string | null; // To know if a chat is selected
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSendMessage, isLoading, chatId }) => {
  if (!chatId) {
      return (
          <div className="flex-grow flex items-center justify-center text-gray-500 dark:text-dark-text-secondary">
              Select a chat or start a new one.
          </div>
      );
  }

  return (
    <div className="flex-grow flex flex-col bg-white dark:bg-dark-bg">
      {/* Pass messages and loading state to MessageList */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Pass send message handler to ChatInput */}
      <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatArea;