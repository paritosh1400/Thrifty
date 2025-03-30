import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Button, Collapse } from 'react-bootstrap'; // Import Bootstrap components

function Sidebar({ chats, onChatSelect, isSidebarOpen, toggleSidebar, selectedChatId }) {
  return (
    <Collapse in={isSidebarOpen} dimension="width">
      <div className="sidebar bg-light border-right" style={{ width: '250px' }}> {/* Adjust width as needed */}
        <div className="d-flex justify-content-between align-items-center p-3">
          <h2>Chats</h2>
          <Button variant="outline-secondary" size="sm" onClick={toggleSidebar}>
            <i className="bi bi-x-lg"></i> {/* You might need to install bootstrap-icons */}
          </Button>
        </div>
        <ul className="list-group list-group-flush">
          {chats.map((chat) => (
            <li
              key={chat}
              className={`list-group-item list-group-item-action ${
                chat === selectedChatId ? 'active' : ''
              }`}
              onClick={() => onChatSelect(chat)}
            >
              {chat.name || chat }
            </li>
          ))}
        </ul>
      </div>
    </Collapse>
  );
}

function parseUserBotString(inputString) {
  const parts = inputString.split('\n');
  if (parts.length === 2) {
    const userPart = parts[0];
    const botPart = parts[1];
    if (userPart.startsWith("User: ") && botPart.startsWith("Bot: ")) {
      const userString = userPart.substring(6).trim(); // Remove "User: " and trim
      const botString = botPart.substring(5).trim();   // Remove "Bot: " and trim
      return { user: userString, bot: botString };
    }
  }
  return { user: null, bot: null }; // Or you could return undefined or throw an error
}

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [availableChats, setAvailableChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mock API call to fetch available chats
    const fetchChats = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://127.0.0.1:8000/chatbot/fetch_chats');
        setAvailableChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setAvailableChats([{ id: 1, name: 'Example Chat 1' }, { id: 2, name: 'Example Chat 2' }]); // Mock data
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      // Mock API call to fetch chat history for the selected chat
      const fetchChatHistory = async () => {
        try {
          // Replace with your actual API endpoint
          const response = await axios.get(`http://127.0.0.1:8000/chatbot/chats/${selectedChatId}`);
          const formattedMessages = response.data.map(item => {
            console.log(item);
            if (item.startsWith("User: ")) {
              return { sender: 'user', text: item.substring(6).trim() };
            } else if (item.startsWith("Bot: ")) {
              return { sender: 'bot', text: item.substring(5).trim() };
            } else {
              // Handle unexpected format if needed
              return { sender: 'unknown', text: item };
            }
          });
          setMessages(formattedMessages);
        } catch (error) {
          console.error(`Error fetching chat history for chat ${selectedChatId}:`, error);
          setMessages([
            { text: ``, sender: 'bot' },
            { text: 'Unable to fetch chat history for some reason...', sender: 'bot' },
          ]); // Mock data
        }
      };
      fetchChatHistory();
    } else {
      setMessages([]);
    }
  }, [selectedChatId]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/chatbot/chat/?chat_id=${encodeURIComponent(selectedChatId)}&prompt=${encodeURIComponent(input)}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const botResponse = response.data.response;
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting.",
        sender: 'bot'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    // console.log(`Selected chat ID: ${chatId}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex h-100">
    <Sidebar
      chats={availableChats}
      onChatSelect={handleChatSelect}
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      selectedChatId={selectedChatId}
    />
      <div className="chat-container flex-grow-1 d-flex flex-column justify-content-between p-3">
        <div className="messages-container flex-grow-1 overflow-auto mb-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message mb-2 p-2 rounded ${
                message.User === 'user' ? 'bg-primary text-white float-right' : 'bg-light text-dark float-left'
              }`}
              style={{ maxWidth: '80%', clear: 'both' }}
            >
              {message.text}
            </div>
          ))}
          {isTyping && <div className="text-muted">Bot is typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        {selectedChatId ? (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="input-group-append">
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted">
            Please select a chat from the sidebar to start messaging.
          </div>
        )}
      </div>
      {!isSidebarOpen && (
        <Button
          className="btn btn-outline-secondary m-2"
          onClick={toggleSidebar}
          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}
        >
          <i className="bi bi-list"></i> {/* You might need to install bootstrap-icons */}
        </Button>
      )}
    </div>
  );
}

export default App;