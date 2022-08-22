const io = require("socket.io")((3300) || process.env.PORT)

const users = {}

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message : message, name : users[socket.id]})
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('leftChat', users[socket.id])
        delete users[socket.id]
    })
})
