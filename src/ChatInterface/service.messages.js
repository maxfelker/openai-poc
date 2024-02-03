export async function getMessages() {
  const messages = JSON.parse(sessionStorage.getItem('messages'));

  return new Promise((resolve) => {
    resolve(messages);
  });
}

export async function createMessage(inputValue) {
  const baseUrl = localStorage.getItem('api-base-url');
  const url = `${baseUrl}/chat`;  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: inputValue})
  });

  const aiResponse = await response.json();
  const existingMessages = JSON.parse(sessionStorage.getItem('messages'));
  const newMessages = [...existingMessages, { role: "user", text: inputValue}, { role: "assistant", text: aiResponse}];
  sessionStorage.setItem('messages', JSON.stringify(newMessages));

  return newMessages;
}