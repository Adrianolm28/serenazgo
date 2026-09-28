import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { database } from "../../../database/database";
import avatarElena from "../../../assets/avatar-elena.webp";
import "../components/ProfilePage.css";

export const ProfilePage = () => {
  const initialUser = database.users[0];

  const [formData, setFormData] = useState({
    name: initialUser.name || "Elena Gutiérrez Morales",
    role: initialUser.role || "Personal de Serenazgo motorizado",
    dni: initialUser.dni || "12345678",
    email: initialUser.email || "elenagutiérrez@nexo.com",
    phone: initialUser.phone || "+51 987 654 321"
  });

  const [avatarSrc, setAvatarSrc] = useState(avatarElena);
  const fileInputRef = useRef(null);

  const [idSecurity, setIdSecurity] = useState("");
  const [emailSecurity, setEmailSecurity] = useState("");
  const [passwordSecurity, setPasswordSecurity] = useState("");

  const [showId, setShowId] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
      Swal.fire({
        title: "¡Foto actualizada!",
        text: "La imagen de perfil se ha cambiado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Guardando cambios",
      text: "Se han actualizado los datos de tu perfil personal.",
      icon: "success",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#165dfc"
    });
  };

  const handleUpdatePasswordModal = () => {
    Swal.fire({
      title: "Actualizar Contraseña",
      html: `
        <input id="swal-curr-pass" type="password" class="swal2-input" placeholder="Contraseña actual">
        <input id="swal-new-pass" type="password" class="swal2-input" placeholder="Nueva contraseña">
        <input id="swal-confirm-pass" type="password" class="swal2-input" placeholder="Confirmar nueva contraseña">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar Contraseña",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#165dfc",
      preConfirm: () => {
        const curr = document.getElementById("swal-curr-pass").value;
        const newP = document.getElementById("swal-new-pass").value;
        const conf = document.getElementById("swal-confirm-pass").value;

        if (!curr || !newP || !conf) {
          Swal.showValidationMessage("Por favor completa todos los campos");
          return false;
        }

        if (newP !== conf) {
          Swal.showValidationMessage("Las contraseñas no coinciden");
          return false;
        }

        return { newP };
      }
    }).then((res) => {
      if (res.isConfirmed) {
        setPasswordSecurity(res.value.newP);
        Swal.fire({
          title: "¡Contraseña Actualizada!",
          text: "Tu contraseña ha sido modificada con éxito.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar Sesión?",
      text: "Estás a punto de salir del sistema operativo NEXO.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b"
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: "Sesión Finalizada",
          text: "Redirigiendo al inicio de sesión...",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-main-layout">
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Perfil</h2>
            <p className="profile-card-subtitle">Información personal y datos de tu cuenta</p>
          </div>

          <div className="profile-avatar-row">
            <img src={avatarSrc} alt="Avatar" className="profile-avatar-img" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <button className="btn-change-photo" onClick={handleTriggerFileInput}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              Cambiar foto
            </button>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="profile-form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                className="profile-input"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="profile-form-group">
              <label>Rol / Cargo</label>
              <input
                type="text"
                name="role"
                className="profile-input"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>

            <div className="profile-form-group">
              <label>DNI / ID</label>
              <input
                type="text"
                name="dni"
                className="profile-input"
                value={formData.dni}
                onChange={handleInputChange}
              />
            </div>

            <div className="profile-form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="profile-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="profile-form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="phone"
                className="profile-input"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn-save-profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Guardar cambios
            </button>
          </form>
        </div>

        <div className="profile-sidebar-card">
          <h3 className="sidebar-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Correo de NEXO
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="security-input-wrapper">
              <span className="security-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type={showId ? "text" : "password"}
                className="security-input"
                value={idSecurity}
                onChange={(e) => setIdSecurity(e.target.value)}
                placeholder="ID"
              />
              <button
                type="button"
                className="security-input-icon-right"
                onClick={() => setShowId(!showId)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>

            <div className="security-input-wrapper">
              <span className="security-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type={showEmail ? "text" : "password"}
                className="security-input"
                value={emailSecurity}
                onChange={(e) => setEmailSecurity(e.target.value)}
                placeholder="Correo"
              />
              <button
                type="button"
                className="security-input-icon-right"
                onClick={() => setShowEmail(!showEmail)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>

            <div className="security-input-wrapper">
              <span className="security-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="security-input"
                value={passwordSecurity}
                onChange={(e) => setPasswordSecurity(e.target.value)}
                placeholder="Contraseña"
              />
              <button
                type="button"
                className="security-input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>

            <button type="button" className="btn-update-password" onClick={handleUpdatePasswordModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Actualizar contraseña
            </button>
          </div>

          <hr className="profile-divider" />

          <div className="logout-header-info">
            <h3 className="sidebar-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Cerrar sesión
            </h3>
            <p className="logout-subtitle">Finaliza tu sesión de forma segura.</p>
          </div>

          <button type="button" className="btn-logout" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};