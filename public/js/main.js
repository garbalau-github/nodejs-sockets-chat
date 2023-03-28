// Access DOM elements
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL query
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const username = params.username ? params.username : 'Anonymous';
const room = params.room;

// This file is loaded by the browser
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Receiving 'message' event from server
socket.on('message', (message) => {
  // Output message to DOM
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text (from the input field with id 'msg')
  const message = e.target.elements.msg;

  // Emit message to server
  socket.emit('chatMessage', message.value);

  // Clear input
  message.value = '';
  message.focus();
});

// Output message to DOM
function outputMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `
    <div>
      <p class='meta'>
        <span>${message.username}</span>
        <span>${message.time}</span>
      </p>
      <p>${message.text}</p>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `;
}
