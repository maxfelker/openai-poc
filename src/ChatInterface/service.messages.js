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
  const messages = [
    { role: "assistant", text: 'This natural language proof-of-concept is powered by artificial intelligence using OpenAI - experiences will vary.' },
    { role: "assistant", text: 'Get started by asking a question or using the /help command' },
    { role: "user", text: inputValue}
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages);
    }, 500);
  });
}