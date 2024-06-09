import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Forum.css";
import HeaderLogin from "../components/partial/HeaderLogin/HeaderLogin";

interface Message {
  _id: string;
  content: string;
  username: string;
  userId: string;
  createdAt: string;
}

interface UserInfo {
  id: string;
  username: string;
  email: string;
}

const Forum = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const token: string | null = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `https://application-web-backend.onrender.com/api/v1/forum/messages`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
    }
  };

  useEffect(() => {
    const decodeToken = () => {
      if (token) {
        const base64Url = token.split(".")[1];
        const decodedToken = JSON.parse(window.atob(base64Url));
        const { id, name: username, email } = decodedToken;
        setUserInfo({ id, username, email });
      }
    };

    fetchMessages();
    decodeToken();
  }, [token]);

  const handleCreateMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `https://application-web-backend.onrender.com/api/v1/forum/messages`,
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewMessage("");
      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      fetchMessages();
    } catch (error) {
      console.error("Erreur lors de la création du message:", error);
    }
  };

  if (!token) {
    return <div>Vous devez être connecté pour accéder au forum.</div>;
  }

  return (
    <div className="App">
      <HeaderLogin />
      <div className="forum-container">
        <h1>Forum</h1>
        <div className="messages-list">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`message-item ${
                userInfo?.id === message.userId ? "message-own" : ""
              } ${
                userInfo?.id === message.userId ? "align-right" : "align-left"
              }`}
            >
              <div className="message-header">
                <span className="message-username">{message.username}</span>
                <span className="message-timestamp">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrire un message..."
          />
          <button onClick={handleCreateMessage}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
