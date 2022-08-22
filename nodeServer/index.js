// Started Socket server at Port 3300 for local machine 
const io = require("socket.io")((3300) || process.env.PORT)

// to store details of all users that have joined the chat 
const users = {}

// Events that will be emitted or server will respond when the connection is successfully made 
io.on('connection', socket => {
    // When the event "new-user-joined" will be fired from frontEnd, It will give it's name, Here we can also add condition to limit the number of users in a chat
    socket.on('new-user-joined', name => {
        // store details with their unique chat id
        users[socket.id] = name
        // It will then broadcast to all users - event "user-joined" to inform about the user that has joined 
        socket.broadcast.emit('user-joined', name)
    })

    // When a event - "send" is fired from frontEnd, means when anyone sends a message 
    socket.on('send', message => {
        // We will broadcast a event - "receive" with message data to show to every joined user 
        socket.broadcast.emit('receive', {message : message, name : users[socket.id]})
    })

    // When socket connection is lost , we get to know from frontEnd. It is a inbuild event of socket.io 
    socket.on('disconnect', message => {
        // We will emit event - leftChat and broadcast to all to inform about the user that left 
        socket.broadcast.emit('leftChat', users[socket.id])
        delete users[socket.id]
    })
})
