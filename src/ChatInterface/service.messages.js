export async function getMessages() {
  const messages = [
    { role: "assistant", text: 'This natural language proof-of-concept is powered by artificial intelligence using OpenAI - experiences will vary.' },
    { role: "assistant", text: 'Get started by asking a question or using the /help command' },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages);
    }, 500);
  });
}

export async function createMessage(inputValue) {

  const response = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: inputValue})
  });

  const aiResponse = await response.json();

  const messages = [
    { role: "assistant", text: 'This natural language proof-of-concept is powered by artificial intelligence using OpenAI - experiences will vary.' },
    { role: "assistant", text: 'Get started by asking a question or using the /help command' },
    { role: "user", text: inputValue},
    { role: "assistant", text: aiResponse}
  ]
  
  return messages;
}