import React from "react";
import avatarRamirez from "../../../assets/avatar-ramirez.webp";
import "../components/MapPage.css";

export const MapPage = () => {
  return (
    <div className="map-page-container">
      <div className="map-header-bar">
        <div className="map-title-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <h1>Mapa operativo</h1>
        </div>

        <div className="map-filters-row">
          <div className="map-search-input">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input backgroundColor="#ffff" type="text" placeholder="Buscar dirección, zona o incidencia..." />
          </div>

          <select className="map-select-filter">
            <option>Todos los serenos</option>
          </select>

          <select className="map-select-filter">
            <option>Todas las incidencias</option>
          </select>

          <button className="map-filter-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filtros
          </button>
        </div>
      </div>

      <div className="map-body-layout">
        <div className="map-canvas-card">
          <div className="map-viewport">
            <svg className="map-svg-bg" viewBox="0 0 800 500" preserveAspectRatio="none">
              <rect width="800" height="500" fill="#cce3de" />
              
              <path d="M 120 0 L 800 350 L 800 500 L 0 500 Z" fill="#d9dcd6" />
              <path d="M 250 80 Q 400 120 380 400 Q 200 450 250 80 Z" fill="#a3c4bc" />
              <path d="M 340 180 Q 450 200 420 300 Q 330 320 340 180 Z" fill="#e5989b" opacity="0.6" />

              <line x1="0" y1="150" x2="800" y2="70" stroke="#ffffff" strokeWidth="18" />
              <line x1="550" y1="0" x2="440" y2="500" stroke="#ffffff" strokeWidth="22" />
              <line x1="0" y1="300" x2="800" y2="480" stroke="#ffffff" strokeWidth="12" />

              <text x="425" y="48" fill="#495057" fontSize="13" fontWeight="bold">Av. Perú</text>
              <text x="460" y="450" fill="#ffffff" fontSize="12" fontWeight="bold" transform="rotate(-78 460 450)">pendencia</text>
              <text x="290" y="210" fill="#6d597a" fontSize="11" fontWeight="bold">Rapstyle SJL</text>
            </svg>

            <div className="map-overlay-legend">
              <h4>Leyenda</h4>
              <div className="legend-item">
                <span className="legend-dot green"></span>
                <span>General</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot blue"></span>
                <span>Sereno</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot purple"></span>
                <span>Zona segura</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot grey"></span>
                <span>Ruta sugerida</span>
              </div>
            </div>

            <div className="map-marker-pin" style={{ top: "32%", left: "43%" }}>
              <div className="sereno-badge-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                </svg>
              </div>
            </div>

            <div className="map-marker-pin" style={{ top: "28%", left: "77%" }}>
              <div className="sereno-badge-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                </svg>
              </div>
            </div>

            <div className="map-marker-pin" style={{ top: "58%", left: "51%" }}>
              <div className="sereno-badge-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                </svg>
              </div>
            </div>

            <div className="map-marker-pin" style={{ top: "62%", left: "67%" }}>
              <div className="sereno-badge-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                </svg>
              </div>
            </div>

            <div className="map-marker-pin" style={{ top: "84%", left: "55%" }}>
              <div className="sereno-badge-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                </svg>
              </div>
            </div>

            <div className="map-marker-pin" style={{ top: "83%", left: "78%" }}>
              <div className="sereno-badge-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"/>
                </svg>
              </div>
            </div>

            <div className="map-incident-callout">
              <div className="incident-red-icon" style={{ width: "24px", height: "24px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="map-incident-callout-text">
                <h5>Incidencias</h5>
                <p>Parque del Maestro</p>
              </div>
            </div>

            <div className="map-overlay-incident-card">
              <div className="incident-card-header">
                <div className="incident-red-icon" style={{ width: "28px", height: "28px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h4>Incidencias</h4>
                  <div className="incident-card-sub">Parque del Maestro</div>
                </div>
              </div>
              <div className="incident-card-priority">Acoso - Prioridad alta</div>
              <a href="#detalles" className="incident-card-link">Ver detalles &rarr;</a>
            </div>
          </div>

          <div className="map-status-footer">
            <div className="status-footer-item">
              <span className="legend-dot green"></span>
              <span>8 serenos conectados</span>
            </div>
            <div className="status-footer-item">
              <span className="legend-dot" style={{ backgroundColor: "#f59e0b" }}></span>
              <span>3 en intervención</span>
            </div>
            <div className="status-footer-item">
              <span className="legend-dot blue"></span>
              <span>4 Disponibles</span>
            </div>
          </div>
        </div>

        <div className="map-side-panel">
          <div className="incident-detail-card">
            <div className="incident-detail-header">
              <div className="incident-red-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="incident-detail-info">
                <h3>Incidencias</h3>
                <h4>Parque del Maestro</h4>
                <p>Acoso - Prioridad alta</p>
                <div className="priority-tag-row">
                  <span className="legend-dot" style={{ backgroundColor: "#ef4444" }}></span>
                  <span>Prioridad alta</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="section-subtitle-row">
              <h4>Personal más cercano</h4>
              <a href="#todos">Ver todos</a>
            </div>

            <div className="nearby-list">
              <div className="nearby-item">
                <div className="nearby-user-box">
                  <img src={avatarRamirez} alt="S. Ramirez" className="nearby-avatar" />
                  <div className="nearby-info">
                    <span className="nearby-name">S. Ramirez</span>
                    <span className="nearby-status">Disponible</span>
                  </div>
                </div>
                <span className="nearby-distance">3 metros</span>
                <button className="btn-assign">Asignar</button>
              </div>

              <div className="nearby-item">
                <div className="nearby-user-box">
                  <img src={avatarRamirez} alt="M. Torres" className="nearby-avatar" />
                  <div className="nearby-info">
                    <span className="nearby-name">M. Torres</span>
                    <span className="nearby-status">Disponible</span>
                  </div>
                </div>
                <span className="nearby-distance">3 metros</span>
                <button className="btn-assign">Asignar</button>
              </div>

              <div className="nearby-item">
                <div className="nearby-user-box">
                  <img src={avatarRamirez} alt="L. Lopez" className="nearby-avatar" />
                  <div className="nearby-info">
                    <span className="nearby-name">L. Lopez</span>
                    <span className="nearby-status">Disponible</span>
                  </div>
                </div>
                <span className="nearby-distance">5 metros</span>
                <button className="btn-assign">Asignar</button>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="section-subtitle-row">
              <h4>Acciones rápidas</h4>
            </div>

            <div className="quick-actions-grid">
              <button className="quick-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Llamar al personal
              </button>

              <button className="quick-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Llamar PNP
              </button>

              <button className="quick-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Enviar mensaje
              </button>

              <button className="quick-action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                Ver ruta en mapa
              </button>
            </div>
          </div>

          <div className="info-alert-box">
            <svg className="info-alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Puedes asignar al sereno más cercano o comunicarte directamente desde el chat.</span>
          </div>
        </div>
      </div>
    </div>
  );
};