import React, { useState } from "react";
import Swal from "sweetalert2";
import { database } from "../../../database/database";
import logoNexo from "../../../assets/logo-nexo.webp";
import "./LoginForm.css";

export const LoginForm = ({ onLoginSuccess }) => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = database.users.find(
      (user) => user.dni === dni && user.password === password
    );

    if (foundUser) {
      Swal.fire({
        title: "Acceso correcto",
        text: `Bienvenido(a) ${foundUser.name}`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        if (onLoginSuccess) {
          onLoginSuccess(foundUser);
        }
      });
    } else {
      setError("DNI o contraseña incorrectos");
      Swal.fire({
        title: "Error de acceso",
        text: "DNI o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        confirmButtonColor: "#1d4ed8"
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-container">
          <img src={logoNexo} alt="NEXO" className="nexo-logo" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              type="text"
              placeholder="DNI / Código de personal"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
};