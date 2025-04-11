import React, { useState } from "react";
// Reverting to the arrow icon used in the earlier w-0 examples
import { BsArrowLeftShort } from "react-icons/bs";

const Sidebar: React.FC = () => {
  // State to track if the sidebar is open or collapsed
  const [isOpen, setIsOpen] = useState(true); // Start with the sidebar open

  const sidebarWidthClass = "w-70"; // Define width class for consistency

  return (
    // Main flex container
    <div className="flex flex-row h-screen">

      <div
        className={`
          bg-slate-800 h-screen pt-8 relative
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${isOpen ? sidebarWidthClass : "w-0 opacity-0"}
        `}
      >
        <div className="pl-4">        
          <h2 className="text-white text-3xl whitespace-nowrap">
          CHATS
          </h2>
          <div className="pt-8">
            <p className="text-gray-400 mt-4 whitespace-nowrap">Chat 1</p>
            <p className="text-gray-400 mt-4 whitespace-nowrap">Chat 2</p>
            <p className="text-gray-400 mt-4 whitespace-nowrap">Chat 3</p>
          </div>
        </div>
      </div>

      <div className="p-4 pt-8 flex-shrink-0">
        <div
          className="bg-white p-1 rounded-full shadow-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)} 
        >
          <BsArrowLeftShort
            className={`
              w-6 h-6 text-slate-800 dark:text-slate-900
              transition-transform duration-300
              ${!isOpen && "rotate-180"} 
            `}
          />
        </div>
      </div>

    </div>
  );
};

export default Sidebar;