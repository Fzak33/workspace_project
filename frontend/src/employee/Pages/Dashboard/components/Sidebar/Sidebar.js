// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Import your images
import userImage from './Ellipse 31.png'; 
import chatBotImage from './AI.png'; 
import dashboardIcon from './Ellipse 45.png'; 
import learnIcon from './Ellipse 47.png'; 
import tasksIcon from './task.png'; 
import teamIcon from './Ellipse 46.png'; 

function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update active menu item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/employee/dashboard') setActiveItem('dashboard');
    else if (path === '/employee/learn') setActiveItem('learn');
    else if (path === '/employee/tasks') setActiveItem('tasks');
    else if (path === '/employee/team') setActiveItem('team');
  }, [location]);

  // Toggle chat window visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle sending chat message
  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll simulate a response without making actual API calls
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { text: 'I am a robot chat. Ask me anything!', sender: 'ai' },
        ]);
        setIsLoading(false);
      }, 1000);
      
      // Note: In production, you would use your actual API key and endpoint
      // The code below is commented out as it contains a placeholder API key
      /*
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: 'ai' },
      ]);
      */
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, I encountered an error. Please try again later.', sender: 'ai' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation menu items
  const navigationItems = [
    { id: 'dashboard', icon: dashboardIcon, text: 'Dashboard', path: '/employee/dashboard' },
    { id: 'learn', icon: learnIcon, text: 'Learn', path: '/employee/learn' },
    { id: 'tasks', icon: tasksIcon, text: 'Tasks', path: '/employee/tasks' },
    { id: 'team', icon: teamIcon, text: 'Team', path: '/employee/team' },
  ];

  return (
    <div className="dashboard-sidebar">
      <div className="user-info">
        <img src={userImage} alt="User" className="user-image" />
        <div className="user-details">
          <h2>John Doe</h2>
          <p>UI/UX Designer</p>
          <div className="role">UI/UX</div>
        </div>
        <div className="more-icon">...</div>
      </div>

      <nav className="dashboard-sidebar-nav">
        <ul>
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={activeItem === item.id ? 'active' : ''}
            >
              <Link to={item.path} className="nav-link">
                <img src={item.icon} alt={item.text} className="list-icon" />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="divider"></div>

        <div className="chat-bot" onClick={toggleChat}>
          <img src={chatBotImage} alt="Chat Bot" className="chat-bot-image" />
          <span>Ask me!</span>
        </div>

        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <strong>How can I help you?</strong>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="message ai">
                  <div className="typing-indicator">Typing...</div>
                </div>
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type Message Here!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
            <div className="chat-arrow"></div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;