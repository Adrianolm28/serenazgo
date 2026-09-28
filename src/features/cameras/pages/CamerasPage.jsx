import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { database } from "../../../database/database";
import "../components/CamerasPage.css";

export const CamerasPage = () => {
  const [activeTab, setActiveTab] = useState("vivo");
  const [selectedCamFilter, setSelectedCamFilter] = useState("Todas");
  const [cameras, setCameras] = useState(database.cameras);
  const [recordings, setRecordings] = useState(database.recordings);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCameras = cameras.filter((cam) => {
    if (selectedCamFilter === "Todas") return true;
    return cam.name === selectedCamFilter;
  }).slice(0, 4);

  const handleExpandCam = (cam) => {
    Swal.fire({
      title: cam.name,
      html: `
        <div style="width: 100%; height: 350px; border-radius: 12px; overflow: hidden; margin-top: 10px;">
          <iframe
            src="https://maps.google.com/maps?layer=c&cbll=${cam.lat},${cam.lng}&cbp=11,0,0,0,0&output=svembed"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      `,
      width: "700px",
      confirmButtonText: "Cerrar transmisión",
      confirmButtonColor: "#2563eb"
    });
  };

  const handlePlayRecording = (rec) => {
    Swal.fire({
      title: `Grabación: ${rec.name}`,
      text: `Fecha: ${rec.date} | Hora: ${rec.time}`,
      html: `
        <div style="width: 100%; height: 320px; border-radius: 12px; overflow: hidden; margin-top: 10px; background-color: #0f172a;">
          <iframe
            src="https://maps.google.com/maps?layer=c&cbll=${rec.lat},${rec.lng}&cbp=11,0,0,0,0&output=svembed"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      `,
      width: "650px",
      confirmButtonText: "Cerrar reproducción",
      confirmButtonColor: "#2563eb"
    });
  };

  const handleMoreRecordings = () => {
    Swal.fire({
      title: "Historial Completo de Grabaciones",
      text: "Cargando archivo de grabaciones del servidor...",
      icon: "info",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#2563eb"
    });
  };

  return (
    <div className="cameras-container">
      <div className="cameras-header-section">
        <div className="cameras-title-row">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b1a3a" strokeWidth="2.2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <h1>Cámara</h1>
        </div>
        <p className="cameras-subtitle">
          Visualiza en tiempo real y revisa grabaciones de las cámaras de seguridad.
        </p>
      </div>

      <div className="cameras-controls-bar">
        <div className="cam-tabs-wrapper">
          <button
            className={`cam-tab-btn ${activeTab === "vivo" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("vivo")}
          >
            En vivo
          </button>
          <button
            className={`cam-tab-btn ${activeTab === "grabaciones" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("grabaciones")}
          >
            Grabaciones
          </button>

          <div className="cam-live-indicator">
            <span className="cam-live-dot"></span>
            En vivo
          </div>
        </div>

        <div className="cam-filter-select-wrapper">
          <select
            className="cam-filter-select"
            value={selectedCamFilter}
            onChange={(e) => setSelectedCamFilter(e.target.value)}
          >
            <option value="Todas">Todas las cámaras</option>
            {cameras.map((cam) => (
              <option key={cam.id} value={cam.name}>
                {cam.name}
              </option>
            ))}
          </select>
          <svg className="select-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div className="cam-main-layout">
        <div className="cameras-grid-card">
          <div className="cameras-grid">
            {filteredCameras.map((cam) => (
              <div className="camera-feed-card" key={cam.id}>
                <iframe
                  title={cam.name}
                  className="camera-map-iframe"
                  src={`https://maps.google.com/maps?layer=c&cbll=${cam.lat},${cam.lng}&cbp=11,0,0,0,0&output=svembed`}
                  loading="lazy"
                ></iframe>

                <div className="camera-overlay-top">
                  <span className="camera-title-badge">{cam.name}</span>
                  {cam.isHd && <span className="camera-hd-badge">HD</span>}
                </div>

                <div className="camera-overlay-bottom">
                  <span className="camera-time-badge">{currentTime}</span>
                </div>

                <button
                  className="camera-expand-btn"
                  onClick={() => handleExpandCam(cam)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cameras-right-panel">
          <div className="recordings-list">
            {recordings.map((rec) => (
              <div
                className="recording-card"
                key={rec.id}
                onClick={() => handlePlayRecording(rec)}
              >
                <div className="recording-thumb-wrapper">
                  <iframe
                    title={rec.name}
                    className="recording-thumb-iframe"
                    src={`https://maps.google.com/maps?layer=c&cbll=${rec.lat},${rec.lng}&cbp=11,0,0,0,0&output=svembed`}
                  ></iframe>
                </div>

                <div className="recording-info">
                  <span className="recording-title">{rec.name}</span>
                  <div className="recording-meta-row">
                    <div className="meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {rec.date}
                    </div>
                  </div>
                  <div className="recording-meta-row">
                    <div className="meta-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {rec.time}
                    </div>
                  </div>
                </div>

                <button
                  className="btn-play-recording"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayRecording(rec);
                  }}
                >
                  Reproducir
                </button>
              </div>
            ))}
          </div>

          <button className="btn-more-recordings" onClick={handleMoreRecordings}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              Ver más grabaciones
            </div>
            &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};