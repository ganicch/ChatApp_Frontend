import React, { useEffect, useState, useRef } from 'react';
import profilePic from '../images/user_image.png';
import styled, { keyframes } from 'styled-components';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import DataAcess from '../apis/DataAcess';


function Home() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const socket = io("http://localhost:3001/");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    DataAcess.get('')
    socket.emit('user', state.username);
    socket.on('users', (OnlineUsers) => {
      setUsers(OnlineUsers);
    });
    socket.on('allMessages', (message) => {
      setMessages((prevMessages) => prevMessages.concat(message));
    });
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', inputMessage, state.username);
      setInputMessage('');
    }
  };

  return (
    <Main className='main-screen'>
      <Users className='online-users'>
        <Header className='header' style={{ color: "white" }}>Users</Header>
        {users.map((user, key) => (
          <User className='user' key={key}>
            <Image src={profilePic} alt="User" />
            <H4>{user}</H4>
          </User>
        ))}
      </Users>
      <ChatScreen className='screen chat-screen'>
        <Header className='header'>
          <Logo>Chat</Logo>
        </Header>
        <MessagesContainer className='messages'>
          {messages.map((mess, key) => (
            mess.status && mess.status === "joined" ?
            <Update>
              {mess.message}
            </Update>
            :
            <Message className= 'message my-message' key={key}>
              <MessageUsername className='name'>{mess.username}</MessageUsername>
              <MessageContent className='text'>
                <MessageTexts>{mess.message}</MessageTexts>
              </MessageContent>
            </Message>
            
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <TypeBox className='typebox'>
          <Input type='text' id="message-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..." />
          <SendButton id="send-message" onClick={sendMessage}>Send</SendButton>
        </TypeBox>
      </ChatScreen>
    </Main>
  );
}


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  border: 2px solid black;
  width: 100vw;
  border-radius: 6px;
`;

const Users = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 5px;
  background: #111;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 6px;
  margin-bottom: 5px;
  background: #f5f5f5;
  border-left: 5px solid green;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
`;

const H4 = styled.h4`
  margin-left: 5px;
`;

const ChatScreen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  background: #111;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const Logo = styled.h3`
  font-size: 18px;
  color: #eee;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #eee;
  background: transparent;
  color: #eee;
  font-size: 15px;
  cursor: pointer;
  outline: none;
  color: red;
`;

const MessagesContainer = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  background: #f5f5f5;
  overflow: auto;
  padding: 10px;

`;

const Message = styled.div`
  display: flex;
  flex-direction:column;
  animation: ${fadeIn} 0.3s ease;
  padding: 10px;
  max-width: 200px;
`;


const MessageContent = styled.p`
  background: #fff;
  box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.05);
  padding: 10px;
  border-radius: 10px;
`;

const MessageTexts = styled.p`
  padding: 10px;
  font-size: 15px;
  overflow-wrap: break-word;

`;
const MessageUsername = styled.p`
  color: green;
  font-size: 10px;
  padding: 5px 5px;
  overflow-wrap: break-word;
`;

const Update = styled.div`
  color: #888;
  text-align: center;
  margin: 10px 0;
`;

const SendButton = styled.button`
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  outline: none;
`;

const TypeBox = styled.div`
  width: 100%;
  background: #ddd;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content:space-between;
`;

const Input = styled.input`
  height: 30px;
  width: 70%;
`;

export default Home;
