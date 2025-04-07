// src/components/sidebar/NewChatButton.tsx
import React from 'react';

interface NewChatButtonProps {
    onClick: () => void;
}

// Basic Feather icon (replace with SVG or icon library)
// const PlusIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
//     </svg>
// );
const EditIcon = () => ( // Pencil icon often used for "New"
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);


const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium
                 bg-white dark:bg-gray-700/60
                 text-gray-700 dark:text-dark-text
                 hover:bg-gray-200 dark:hover:bg-gray-600/80
                 border border-gray-300 dark:border-gray-600
                 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-100 dark:focus:ring-offset-dark-sidebar focus:ring-blue-500"
    >
      <span>New Chat</span>
      <EditIcon />
      {/* Or use <PlusIcon /> */}
    </button>
  );
};

export default NewChatButton;