// src/components/sidebar/Sidebar.tsx
import React from 'react';
import NewChatButton from './NewChatButton';
import ChatListItem from './ChatListItem';
import { ChatSession } from '../../types'; // Import type

interface SidebarProps {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatSessions,
  activeChatId,
  onSelectChat,
  onNewChat,
}) => {
  // Sort sessions by lastUpdated, newest first (optional)
  const sortedSessions = [...chatSessions].sort((a, b) => (b.lastUpdated ?? 0) - (a.lastUpdated ?? 0));

  return (
    <div className="w-64 md:w-72 flex-shrink-0 bg-gray-100 dark:bg-dark-sidebar p-3 flex flex-col border-r border-gray-200 dark:border-gray-700">
      <NewChatButton onClick={onNewChat} />

      <h2 className="mt-4 mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-dark-text-secondary uppercase tracking-wide">
        Recent Chats
      </h2>

      {/* Chat List */}
      <div className="flex-grow overflow-y-auto space-y-1 pr-1">
        {sortedSessions.length > 0 ? (
          sortedSessions.map((session) => (
            <ChatListItem
              key={session.id}
              title={session.title}
              active={session.id === activeChatId}
              onClick={() => onSelectChat(session.id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary px-2 italic">
            No chats yet.
          </p>
        )}
      </div>

      {/* Optional: Footer with settings, user profile etc. */}
      <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
        {/* Placeholder for future elements */}
        <button className="w-full text-left p-2 rounded text-sm text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-700/50">
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;