import { useEffect, useState } from 'react';
import { getMessages } from './service.messages';
import ChatBar from './ChatBar';
import MessageList from './MessageList';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);

    async function fetchMessages() {
      const response = await getMessages();
      setMessages(response);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    function handleNewMessage(message) {
      console.log(message);
      fetchMessages();
    }
    
    return (
      <>
        <MessageList messages={messages} />
        <ChatBar onMessageCreated={handleNewMessage} />
      </>
    );
}