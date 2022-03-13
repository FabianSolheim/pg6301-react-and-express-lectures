import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ChatApplication } from "./chatApplication";

const initialMessages = [
  {
    user: "User 1",
    message: "Message 1 from main",
  },
  {
    user: "User 2",
    message: "Message 2",
  },
  {
    user: "User 1",
    message: "Message 3",
  },
];

function UserRegistrationForm({ onUsername }) {
  const [username, setUsername] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    onUsername(username);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button>Submit</button>
    </form>
  );
}

function Application() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState(initialMessages);
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://" + window.location.host);
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onmessage = (event) => {
      console.log("message", event);
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message) {
    setMessages((messages) => [...messages, { message, user }]);
    ws.send("Hello! " + message);
  }

  if (!user) {
    return <UserRegistrationForm onUsername={setUser} />;
  }

  return (
    <ChatApplication messages={messages} onNewMessage={handleNewMessage} />
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
