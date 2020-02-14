const app = require('express')()
const http = require('http').createServer(app)
const socketio = require('socket.io')(http)

app.get('/', (req, res) => {
    res.send("Server is running")
})

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
})

http.listen(process.env.PORT)