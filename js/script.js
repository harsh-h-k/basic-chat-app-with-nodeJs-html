// Here we will link to the socket server, that here is running on port - 3300 
const socket = io('http://localhost:3300')

// We will get all elements that will be required while sending a message as well as showing the message 
const form = document.getElementById('sendMessage-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

// append Function - I have added this function to add message to div - messageContainer, where all messages will be shown 
const append = (message, position) => {
    // It will create a new div and message text  
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    // adding message class for styling and position class for left/right position 
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

// When message is send from user, will listen event - submit 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value
    append(`You : ${message}`, 'right')
    messageInput.value = ""
    socket.emit('send', message)
})

// Prompting to get name of user 
const userName = prompt("Enter Your Name To Join Chat") ;
// Emitting new-user-joined event with that userName 
socket.emit('new-user-joined', userName)

// receiving data from user-joined event from server 
socket.on('user-joined', name => {
    append(`${name} joined.`,'left')
})

// receive event to get message 
socket.on('receive', data => {
    append(`${data.name} : ${data.message}`,'left')
})

// when any user left
socket.on('leftChat', data => {
    append(`${data} left the chat`,'left')
})