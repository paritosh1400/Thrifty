import React from "react";

const ChatInput: React.FC = () => {
    return (
        <div className="flex items-center bg-transparent border-t border-gray-700">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow p-2 bg-transparent text-white focus:outline-none"
            />
            <button className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white">
                Send
            </button>
        </div>
    );
};

export default ChatInput;