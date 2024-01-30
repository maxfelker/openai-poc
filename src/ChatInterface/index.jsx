import { useEffect, useState } from 'react';
import { getMessages } from './service.messages';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import Loader from './Loader';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState();

    async function fetchMessages() {
      setLoading(true);
      const response = await getMessages();
      setMessages(response);
      setLoading(false);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
      <>
        <MessageList messages={messages} />
        <ChatBar onMessageCreated={fetchMessages} onAttemptCreateMessage={()=> setLoading(true)} />
        {loading && <Loader />}
      </>
    );
}