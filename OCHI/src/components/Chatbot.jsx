
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import { useEffect } from "react";
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  z-index: 1000;
`;

const Header = styled.div`
  background: #007bff;
  color: white;
  padding: 15px;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f8f9fa;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 15px;
  background: ${props => props.sender === 'user' ? '#007bff' : '#e9ecef'};
  color: ${props => props.sender === 'user' ? 'white' : 'black'};
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #dee2e6;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;
  
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #0056b3;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;


const TypingAnimation = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 5px 0;
  padding: 10px 15px;

  div {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background: #007bff;
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes typing {
    0%, 80%, 100% { 
      transform: translateY(0);
    }
    30% {
      transform: translateY(-6px);
    }
  }
`;


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  


  const sendMessage = async () => {
    if (!input.trim() || loading) {
      return;
    } 

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    const msgText=input;
    setInput(""); 
    setLoading(true); // Start loading

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/chat", {
        message: msgText,
        sessionId: sessionId,
      });

      const botMessage = { text: res.data.reply, sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        text: "Sorry, I'm having trouble connecting.", 
        sender: "bot" 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false); // Stop loading in any case
    }
  };

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        💬
      </ToggleButton>

      <ChatContainer visible={isOpen}>
        <Header>
          <h3 style={{ margin: 0 }}>Chat Assistant</h3>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            ×
          </button>
        </Header>

        <MessagesContainer>
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender}>
              {msg.text}
            </MessageBubble>
          ))}
          {loading && (<TypingAnimation>
            <div></div>
            <div></div>
            <div></div>
            </TypingAnimation>)} {/* Show spinner when loading */}
        </MessagesContainer>

        <InputContainer>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            disabled={loading} // Disable input during loading
          />
          <Button 
            onClick={sendMessage}
            disabled={loading} // Disable button during loading
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '' : 'Send'}
          </Button>
        </InputContainer>
      </ChatContainer>
    </>
  );
};
export default Chatbot;
