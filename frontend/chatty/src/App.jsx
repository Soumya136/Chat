import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <>
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h2>Join a chat!!!</h2>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Room ID"
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button onClick={joinRoom}>Join the Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </>
  );
}

export default App;
