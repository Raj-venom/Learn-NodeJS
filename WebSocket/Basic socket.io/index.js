import express from "express";
import http from "http"
import { Server } from "socket.io";


const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = 4000

app.use(express.static('public'))

io.on("connection", (Socket) =>{
    console.log("A user connected", Socket.id);

    Socket.on("message", (msg) => {
        console.log("client message",msg);
       io.emit("message", msg)
    })
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

//fdf

server.listen(PORT, () => {
    console.log("server running on port:", PORT)
})