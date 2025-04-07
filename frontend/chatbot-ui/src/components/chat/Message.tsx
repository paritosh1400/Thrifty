// src/components/chat/Message.tsx
import React from 'react';
import { Sender } from '../../types'; // Import type

interface MessageProps {
  sender: Sender;
  text: string;
}

// Basic User/Bot icons (replace with better SVGs or images)
const UserIcon = () => <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">U</div>;
const BotIcon = () => <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">B</div>;


const Message: React.FC<MessageProps> = ({ sender, text }) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2`}>
      {!isUser && <BotIcon />}

      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 rounded-lg shadow-sm ${
          isUser
            ? 'bg-blue-500 dark:bg-blue-700 text-white'
            : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-dark-text'
        }`}
      >
        {/* Basic whitespace handling */}
        <p className="text-sm whitespace-pre-wrap">{text}</p>
      </div>

      {isUser && <UserIcon />}
    </div>
  );
};

export default Message;