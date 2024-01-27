export async function getMessages() {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { role: "user", text: 'Hello world' },
        { role: "assistant", text: 'Hello again' },
      ]);
    }, 500);
  });
}