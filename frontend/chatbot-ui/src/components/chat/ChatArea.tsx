import React from "react";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

const ChatArea: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4 pb-8 pr-20">
      <ChatHistory/>
      <ChatInput/>
    </div>
  );
};

export default ChatArea;