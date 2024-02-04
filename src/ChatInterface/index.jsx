import { useEffect, useState } from 'react';
import { getMessages } from './service.messages';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import Loader from './Loader';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMessages() {
    setLoading(true);
    const response = await getMessages();
    setMessages(response);
    setLoading(false);
  }

  function handleAttemptCreateMessage() {
    setLoading(true);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <ChatBar 
        onMessageCreated={fetchMessages} 
        onAttemptCreateMessage={handleAttemptCreateMessage} 
        />
      <MessageList messages={messages} />
      {loading && <Loader />}
    </>
  );
}