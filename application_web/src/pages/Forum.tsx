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
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [editMessageContent, setEditMessageContent] = useState<string>("");
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
    } catch (error) {
      console.error("Erreur lors de la création du message:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.delete(
        `https://application-web-backend.onrender.com/api/v1/forum/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
    }
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditMessageId(messageId);
    setEditMessageContent(content);
  };

  const handleUpdateMessage = async () => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.put(
        `https://application-web-backend.onrender.com/api/v1/forum/messages/${editMessageId}`,
        { content: editMessageContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === editMessageId
            ? { ...message, content: editMessageContent }
            : message
        )
      );
      setEditMessageId(null);
      setEditMessageContent("");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du message:", error);
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
              {editMessageId === message._id ? (
                <div className="edit-message">
                  <textarea
                    value={editMessageContent}
                    onChange={(e) => setEditMessageContent(e.target.value)}
                  />
                  <button onClick={handleUpdateMessage}>
                    <img src="/check.svg" alt="Update" />
                  </button>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
              {userInfo?.id === message.userId && (
                <div className="message-actions">
                  <button
                    onClick={() =>
                      handleEditMessage(message._id, message.content)
                    }
                  >
                    <img src="/pencil.svg" alt="Edit" />
                  </button>
                  <button onClick={() => handleDeleteMessage(message._id)}>
                    <img src="/trash-2.svg" alt="Delete" />
                  </button>
                </div>
              )}
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
