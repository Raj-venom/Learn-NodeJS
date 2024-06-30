import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"

function App() {

  const socket = useMemo(() => io("http://localhost:4000"), [])
  const [message, setMessage] = useState("")
  const [SocketID, setSocketID] = useState("")
  const [room, setRoom] = useState("")
  const [chat, setChat] = useState([])
  const [roomName, setRoomName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // send meessage
    socket.emit("message", { message, room })
    setMessage("")
  }

  const joinRoomHandler = (e) => {
    e.preventDefault()
    socket.emit("join-room", roomName)
    setRoomName("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id)
      console.log("user connected", socket.id);
    })

    socket.on("welcome", (data) => {
      console.log(data);
    })

    socket.on("recieve-message", (data) => {
      console.log(data);
      setChat((chat) => [...chat, data])
    })

    return () => {
      socket.disconnect();
    }

  }, [socket])

  return (
    <div>

      <p>{SocketID}</p>


      <form onSubmit={joinRoomHandler}>
        <label htmlFor="roomName">RoomName</label>
        {" "}
        <input id='roomName' value={roomName} onChange={(e) => setRoomName(e.target.value)} type="text" placeholder='Message' />
        <button type='submit'>Join Room</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Message' />
        {" "}

        <input value={room} onChange={(e) => setRoom(e.target.value)} type="text" placeholder='room' />

        <button type='submit'>submit</button>
      </form>

      <div>
        {chat.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

    </div>
  )
}

export default App