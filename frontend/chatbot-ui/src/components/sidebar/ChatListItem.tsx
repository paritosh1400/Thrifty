// src/components/sidebar/ChatListItem.tsx
import React from 'react';

interface ChatListItemProps {
  title: string;
  active?: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  title,
  active = false,
  onClick,
}) => {
  const baseClasses = "w-full text-left px-2 py-1.5 rounded text-sm truncate cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500";
  const activeClasses = "bg-blue-100 dark:bg-blue-800/50 text-gray-900 dark:text-white font-medium";
  const inactiveClasses = "text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700/50";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
      title={title} // Show full title on hover
    >
      {title}
    </button>
  );
};

export default ChatListItem;