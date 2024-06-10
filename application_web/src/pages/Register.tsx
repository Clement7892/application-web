import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import Header from "../components/partial/Header/Header";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://application-web-backend.onrender.com/api/v1/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setMessage("Vous avez bien créé votre compte !");
        navigate("/");
      } else {
        setMessage(response.data.message);
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      setMessage("Une erreur est survenue lors de l'inscription.");
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="register-container">
        <div className="register-form-container">
          <h2>Inscription</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Inscription
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
