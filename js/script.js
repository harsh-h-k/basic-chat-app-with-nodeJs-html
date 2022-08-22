const socket = io('http://localhost:3300')

const form = document.getElementById('sendMessage-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value
    append(`You : ${message}`, 'right')
    messageInput.value = ""
    socket.emit('send', message)
})

const userName = prompt("Enter Your Name To Join Chat") ;
socket.emit('new-user-joined', userName)

socket.on('user-joined', name => {
    append(`${name} joined.`,'left')
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`,'left')
})

socket.on('leftChat', data => {
    append(`${data} left the chat`,'left')
})