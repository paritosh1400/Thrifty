import React, { useState, useRef, useEffect  } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message immediately
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/chatbot/chat?prompt=${encodeURIComponent(input)}`,
        {},
        {          
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const botResponse = response.data.response;;
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

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
            {isTyping && <div className="typing-indicator">Bot is typing...</div>}
            <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
