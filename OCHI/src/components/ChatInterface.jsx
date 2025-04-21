import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

// Styled components
const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f2f5;
  font-family: 'Segoe UI', sans-serif;
`;

const Sidebar = styled.div`
  width: 300px;
  background: white;
  border-right: 1px solid #e9edef;
  overflow-y: auto;
`;

const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #efeae2;
`;

const UserList = styled.div`
  padding: 15px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;
  background: ${props => props.active ? '#f5f6f6' : 'transparent'};
  
  &:hover {
    background: #f5f6f6;
  }
`;

const MessageHeader = styled.div`
  padding: 15px 20px;
  background: white;
  border-bottom: 1px solid #e9edef;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 1;   
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: url('data:image/png;base64,iVBORw0KG...');
  scroll-behavior: smooth; // Add smooth scrolling
  overflow-anchor: none; // Prevent browser's automatic scroll anchoring
`;
const TimeStamp = styled.div`
  font-size: 0.75rem;
  color: #667781;
  text-align: right;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RoleBadge = styled.span`
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${props => props.role === 'mentor' ? '#2d9cdb20' : '#27ae6020'};
  color: ${props => props.role === 'mentor' ? '#2d9cdb' : '#27ae60'};
  border: 1px solid ${props => props.role === 'mentor' ? '#2d9cdb40' : '#27ae6040'};
`;

const InputContainer = styled.div`
  padding: 20px;
  background: white;
  border-top: 1px solid #e9edef;
`;

const MessageInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e9edef;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #00a884;
  }
`;

const SendButton = styled.button`
  background: #00a884;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #008f72;
  }
`;

const ChatInterface = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);
  // Axios interceptor for auth token
  
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async config => {
      const token = await getAccessTokenSilently();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    
    return () => axios.interceptors.request.eject(interceptor);
  }, [getAccessTokenSilently]);



  // Fetch users for sidebar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/messages/getUsersForSidebar'
        );
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);
  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/messages/${selectedUser.auth0Id}`
      );
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // Fetch messages when user is selected
  useEffect(() => {
    
    fetchMessages();
  }, [selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/messages/send/${selectedUser.auth0Id}`,
        { content: newMessage }
      );
      
      setMessages([...messages, data]);
      setNewMessage('');
      await fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const MessageBubble = ({ message }) => (
    <div
      style={{
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '8px',
        background: message.sender.auth0Id === user.sub ? '#d9fdd3' : 'white',
        alignSelf: message.sender.auth0Id === user.sub ? 'flex-end' : 'flex-start',
        boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
        marginBottom: '12px',
        position: 'relative'
      }}
    >
      {message.sender.auth0Id !== user.sub && (
        <RoleBadge role={message.sender.role}>
          {message.sender.role}
        </RoleBadge>
      )}
      <p style={{ margin: '8px 0' }}>{message.content}</p>
      <TimeStamp>
        <span>{new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}</span>
      </TimeStamp>
    </div>
  );

  return (
    <ChatContainer>
      <Sidebar>
        <UserList>
          <h3 style={{ padding: '15px', margin: 0 }}>Chats</h3>
          {users.map(user => (
            <UserItem 
              key={user.auth0Id} 
              onClick={() => setSelectedUser(user)}
              active={selectedUser?.auth0Id === user.auth0Id}
            >
              <img 
                src={user.picture} 
                alt={user.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px'
                }}
              />
 <div style={{ marginLeft: '15px', minWidth: 0 }}> 
 <h4 style={{ 
      margin: 0, 
      overflowWrap: 'break-word',  // 👈 ADDED
      wordBreak: 'break-word'      // 👈 ADDED
    }}>
      {user.name}
    </h4>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ 
        fontSize: '0.75rem',
        color: user.role === 'mentor' ? '#2d9cdb' : '#27ae60',
        fontWeight: 500
      }}>
        {user.role.toUpperCase()}
      </span>
    </div>
              </div>
            </UserItem>
          ))}
        </UserList>
      </Sidebar>

      <ChatWindow>
        {selectedUser ? (
          <>
            <MessageHeader>
              <h3 style={{ margin: 0 }}>{selectedUser.name}</h3>
            </MessageHeader>
            
            <MessageContainer ref={messageContainerRef}>
              {messages.map(message => (
                <MessageBubble key={message._id} message={message} />
              ))}
            </MessageContainer>

            <InputContainer>
              <form 
                onSubmit={handleSendMessage}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <MessageInput
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    borderRadius: '8px',
                    fontSize: '15px'
                  }}
                />
                <SendButton type="submit">
                  Send
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </SendButton>
              </form>
            </InputContainer>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#667781'
          }}>
            Select a user to start chatting
          </div>
        )}
      </ChatWindow>
    </ChatContainer>
  );
};

export default ChatInterface;