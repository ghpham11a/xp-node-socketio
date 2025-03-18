const { query } = require("express");

const socket = io("http://localhost:3000", {
    auth: {
        secret: "This is a secret"
    },
    query: {
        meaningOfLife: 42
    }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('welcome', (msg) => {
    console.log(msg);
    alert(msg);
})

socket.on('chat message', (msg) => {
    console.log(msg);
    const item = document.createElement('li');
    item.textContent = msg;
    item.className = "message";
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})