import ChatInterface from "../ChatInterface";

export default function App() {

  if(sessionStorage.getItem('messages') === null) {
    sessionStorage.setItem('messages', JSON.stringify([]));
  }

  return (
    <>
      <ChatInterface />
    </>
  );
}