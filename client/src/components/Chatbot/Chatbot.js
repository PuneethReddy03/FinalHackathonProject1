import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! I am your online helper. How can I assist you today?', user: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { text: userInput, user: 'user' }];
    setMessages(newMessages);
    setUserInput('');

    // Process user input and give bot response
    processUserInput(userInput);
  };

  const processUserInput = (input) => {
    let response = '';

    if (input.toLowerCase().includes('book appointment')) {
      response = 'To book an appointment, please go to the "Appointments" section and fill out the required details.';
    } else if (input.toLowerCase().includes('register')) {
      response = 'To register, click on the "Register" link in the navigation bar and provide your details.';
    } else if (input.toLowerCase().includes('hi')) {
      response = 'I can assist you with the following:\n1. How to book an appointment.\n2. How to register for the platform.';
    } else {
      response = 'Sorry, I didn’t quite understand that. Can you ask about booking appointments or registration?';
    }

    const newMessages = [...messages, { text: response, user: 'bot' }];
    setMessages(newMessages);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user === 'bot' ? 'bot-message' : 'user-message'}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Ask me something..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
