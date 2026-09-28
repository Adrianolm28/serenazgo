import React from "react";

export const MetricsCards = ({ metrics }) => {
  return (
    <div className="metrics-grid">
      <div className="metric-card blue">
        <div className="metric-card-left">
          <div className="metric-icon-box blue">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-title">Personal conectados</span>
            <div className="metric-value-container">
              <span className="metric-value">{metrics.connectedPersonal.current}</span>
              <span className="metric-value-total">/ {metrics.connectedPersonal.total}</span>
            </div>
            <span className="metric-sub">en línea</span>
          </div>
        </div>
        <div className="metric-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      <div className="metric-card pink">
        <div className="metric-card-left">
          <div className="metric-icon-box pink">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-title">Incidencias activas</span>
            <div className="metric-value-container">
              <span className="metric-value">{metrics.activeIncidents}</span>
            </div>
            <span className="metric-sub">en proceso</span>
          </div>
        </div>
        <div className="metric-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      <div className="metric-card yellow">
        <div className="metric-card-left">
          <div className="metric-icon-box yellow">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div className="metric-info">
            <span className="metric-title">Alertas pendientes</span>
            <div className="metric-value-container">
              <span className="metric-value">{metrics.pendingAlerts}</span>
            </div>
            <span className="metric-sub">requieren atención</span>
          </div>
        </div>
        <div className="metric-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};