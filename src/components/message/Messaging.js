// Messaging.js
import React, { useEffect, useState } from 'react';
import './styles/Messaging.css'; // Import your CSS file for styling
import { addMessage, getAllMessages } from '../../services/MessagingService';
import { getInstantDateTime } from '../../helpers/utils';

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = JSON.parse(sessionStorage.getItem('sccuser'));

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getAllMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      
    }
    
  };

  const sendMessage = async () => {
    try {
      if (newMessage.trim()) {
        await addMessage({ text: newMessage+" \n\n- "+user?.fullname, timestamp: getInstantDateTime() });
        setNewMessage('');
        fetchMessages(); // Refresh messages after sending
      }
    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="messaging-container">
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-bubble">
            <div>{msg.text}</div>
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messaging;
