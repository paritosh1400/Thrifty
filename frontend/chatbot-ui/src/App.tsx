// src/App.tsx
import { useState } from 'react';
import Test from './components/sidebar/Test';
import ChatArea from './components/chat/ChatArea';
import './index.css'; // Ensure Tailwind is imported

function App() {

  return (
    <div className="flex h-screen w-screen overflow-hidden dark bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <p>This is where the two components will reside...t</p> 
    </div>
  );
}

export default App;
