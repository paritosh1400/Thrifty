import Sidebar from './components/sidebar/Sidebar';
import ChatArea from './components/chat/ChatArea';
import './index.css'; // Ensure Tailwind is imported

function App() {

  return (
    <div className="flex flex-row h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-grow">
        <ChatArea />
      </div>
    </div>
  );
}

export default App; 
