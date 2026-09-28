import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import avatarElena from "../../../assets/avatar-elena.webp";

export const TopHeader = ({ user, onNavigateToProfile }) => {
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Alerta de pánico reportada en Parque del Maestro", time: "Hace 5 min" },
    { id: 2, text: "Cámara 3 requiere revisión técnica", time: "Hace 12 min" },
    { id: 3, text: "Unidad M-04 reporta ingreso a sector 2", time: "Hace 20 min" }
  ]);
  const [currentDateTime, setCurrentDateTime] = useState({ date: "", time: "" });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "P.M" : "A.M";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, "0");

      setCurrentDateTime({
        date: `${day} de ${month} de ${year}`,
        time: `${formattedHours}:${minutes} ${ampm}`
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationsClick = () => {
    if (notifications.length === 0) {
      Swal.fire({
        title: "Notificaciones",
        text: "No tienes notificaciones pendientes.",
        icon: "info",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    const notificationListHtml = notifications
      .map(
        (n) => `
        <div style="text-align: left; padding: 10px 12px; margin-bottom: 8px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
          <div style="font-size: 13px; font-weight: 700; color: #0f172a;">${n.text}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${n.time}</div>
        </div>
      `
      )
      .join("");

    Swal.fire({
      title: "Centro de Notificaciones",
      html: `<div style="max-height: 250px; overflow-y: auto; margin-top: 10px;">${notificationListHtml}</div>`,
      showCancelButton: true,
      confirmButtonText: "Marcar todas como leídas",
      cancelButtonText: "Cerrar",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b"
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications([]);
        setUnreadCount(0);
        Swal.fire({
          title: "Notificaciones leídas",
          text: "Has marcado todas las notificaciones como leídas.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  };

  const handleStatusClick = () => {
    Swal.fire({
      title: "Estado del Sistema",
      html: `
        <div style="text-align: left; font-size: 13px; color: #334155; line-height: 1.6;">
          <p><strong>Servidor Central:</strong> Operativo (99.9%)</p>
          <p><strong>Conexión GPS:</strong> Activa</p>
          <p><strong>Red de Cámaras:</strong> Conectada</p>
          <p><strong>Última sincronización:</strong> Justo ahora</p>
        </div>
      `,
      icon: "success",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#2563eb"
    });
  };

  const handleProfileClick = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    } else {
      Swal.fire({
        title: user?.name || "Elena Gutiérrez Morales",
        text: user?.role || "Personal de Serenazgo motorizado",
        imageUrl: avatarElena,
        imageWidth: 90,
        imageHeight: 90,
        imageAlt: "Avatar",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#2563eb"
      });
    }
  };

  return (
    <header className="top-header">
      <div className="header-actions">
        <div
          className="notification-badge"
          onClick={handleNotificationsClick}
          style={{ cursor: "pointer" }}
          title="Notificaciones"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
        </div>

        <div
          className="user-profile"
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
          title="Ver perfil"
        >
          <img src={avatarElena} alt={user?.name || "Elena"} className="user-avatar" />
          <div className="user-info">
            <span className="user-name">{user?.name || "Elena Gutiérrez Morales"}</span>
            <span className="user-role">{user?.role || "Personal de Serenazgo motorizado"}</span>
          </div>
        </div>

        <div className="header-time">
          <span>{currentDateTime.date || "26 de Setiembre de 2026"}</span>
          <strong>{currentDateTime.time || "17:16 P.M"}</strong>
        </div>

        <div
          className="system-status"
          onClick={handleStatusClick}
          style={{ cursor: "pointer" }}
          title="Estado del sistema"
        >
          <span className="status-dot"></span>
          <span>Sistema operativo</span>
        </div>
      </div>
    </header>
  );
};