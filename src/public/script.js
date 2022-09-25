const messageInput = document.getElementById("message-input");
const form = document.getElementById("form");
const buttonSend = document.getElementById("button-send");

const socket = io({ auth: { token: "abcd" } });

buttonSend.addEventListener("click", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  console.log("value:", message);
  socket.emit("messageToServer", message);
});
