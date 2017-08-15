import React from 'react';
const MessageEntry = ({ message, firstname, myname }) => {
  return (
    <div className="messageDiv">
      <div className="from-them">
        {message} 
      </div>
      <div className="clear"></div>
    </div>
  );
};
export default MessageEntry;