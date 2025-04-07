// src/components/chat/MessageList.tsx
import React, { useRef, useEffect } from 'react';
import Message from './Message';
import { ChatMessage } from '../../types'; // Import type

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean; // To show typing indicator or spinner
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <Message key={msg.id} sender={msg.sender} text={msg.text} />
      ))}

      {/* Optional: Loading indicator */}
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Dummy div to ensure scrolling to the end */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;