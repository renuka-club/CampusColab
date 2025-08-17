import React from 'react';
import Chatbox from './Chatbox';

const ChatApplication = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
        width: '100vw', 
        background: "linear-gradient(135deg, rgb(167, 184, 218), #2a5298)",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: "500px",
          maxWidth: "100%",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Chatbox />
      </div>
    </div>
  );
}

export default ChatApplication;
