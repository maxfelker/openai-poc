import ChatInterface from "../ChatInterface";

export default function App() {

  if(sessionStorage.getItem('messages') === null) {
    sessionStorage.setItem('messages', JSON.stringify([]));
    console.log('messages initialized');
  } else {
    const messages = JSON.parse(sessionStorage.getItem('messages'));
    console.log(messages);
  }

  return (
    <>
      <ChatInterface />
    </>
  );
}