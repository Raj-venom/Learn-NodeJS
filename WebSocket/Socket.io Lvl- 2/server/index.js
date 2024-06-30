import express from "express";
import { Server } from "socket.io";
import { createServer } from "http"
import cors from "cors"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const port = 4000
const secretKey = "veryasdfjhas"


const app = express()
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

app.use(cors())
app.use(cookieParser())

let user = false

app.get("/", async (req, res) => {
    const { token } = req.cookies

    try {
        const decodedToken = jwt.verify(token, secretKey)

        if (!decodedToken) {
            return res.status(401).json("Logut")
        }

        console.log("deToken: ", decodedToken);

        user = true

        return res
            .status(200)
            .json({ "Loged In": "hello world" })
    } catch (error) {
        console.log("no cooke");
        return res.status(401).json("Logut")


    }

})

app.get("/login", async (req, res) => {

    const token = jwt.sign({ id: "securevalue" }, secretKey)

    return res
        .status(200)
        .cookie("token",
            token,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            }
        )
        .json("you are logged in")

})



io.use((socket, next) => {

    console.log("2");
    cookieParser()(socket.request, socket.request.res || {}, (err) => {

        if (err) return next(err)
        console.log("3");

        const token = socket.request.cookies.token;
        console.log(token,"token");

        console.log("t4");
        if (!token) return next(new Error("Login required"))
        console.log("4");

        user = true

    })

    if (user) next();
})

io.on("connection", (socket) => {
    console.log("\n\n\nUser connected", socket.id);

    socket.emit("welcome", { user: `welcom hello world, ${socket.id}`, age: 24 })
    socket.broadcast.emit("welcome", `${socket.id} joined server`)

    socket.on("message", ({ message, room }) => {
        console.log(message, room);

        // io.emit("recieve-message", data) // to send message to all along with self also 
        // socket.broadcast.emit("recieve-message", data) //  event will be broadcast to all connected clients, except this socket

        // io.to(room).emit("recieve-message", message) // both io.to and sockt.to works same
        socket.to(room).emit("recieve-message", message)
    })


    socket.on("join-room", (room) => {
        socket.join(room)
        console.log("User joined room ", room);
    })

    socket.on("disconnect", (reason) => {
        console.log("user disconnected", socket.id);
        console.log(reason);
    })

})

server.listen(port, () => {
    console.log(`server runing on ${port}`);
})

