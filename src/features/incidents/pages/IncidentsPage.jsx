import React, { useState } from "react";
import Swal from "sweetalert2";
import { database } from "../../../database/database";
import avatarRamirez from "../../../assets/avatar-ramirez.webp";
import "../components/IncidentsPage.css";

export const IncidentsPage = () => {
  const [incidents, setIncidents] = useState(database.incidents);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState("Todas");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredIncidents = incidents.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "Todos" || item.status === statusFilter;

    const matchesPriority =
      priorityFilter === "Todas" || item.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "Todas" || item.type === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleOpenDetails = (item) => {
    Swal.fire({
      title: `Detalles: ${item.id}`,
      html: `
        <div style="text-align: left; font-size: 13px; color: #334155; display: flex; flex-direction: column; gap: 8px;">
          <p><strong>Tipo:</strong> ${item.type}</p>
          <p><strong>Descripción:</strong> ${item.description}</p>
          <p><strong>Ubicación:</strong> ${item.location}</p>
          <p><strong>Prioridad:</strong> <span style="color: ${item.priority === 'Alta' ? '#ef4444' : '#d97706'}">${item.priority}</span></p>
          <p><strong>Estado:</strong> ${item.status}</p>
          <p><strong>Responsable:</strong> ${item.responsible} (${item.responsibleRole})</p>
          <p><strong>Fecha/Hora:</strong> ${item.dateTime}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#1d4ed8"
    });
  };

  const handleRegisterIncident = () => {
    Swal.fire({
      title: "Registrar Nueva Incidencia",
      html: `
        <input id="swal-type" class="swal2-input" placeholder="Tipo (ej. Acoso callejero)">
        <input id="swal-desc" class="swal2-input" placeholder="Descripción de los hechos">
        <input id="swal-location" class="swal2-input" placeholder="Ubicación (ej. Parque del Maestro)">
        <select id="swal-priority" class="swal2-input">
          <option value="Alta">Prioridad Alta</option>
          <option value="Media">Prioridad Media</option>
          <option value="Baja">Prioridad Baja</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1d4ed8",
      preConfirm: () => {
        const type = document.getElementById("swal-type").value;
        const description = document.getElementById("swal-desc").value;
        const location = document.getElementById("swal-location").value;
        const priority = document.getElementById("swal-priority").value;

        if (!type || !description || !location) {
          Swal.showValidationMessage("Por favor completa todos los campos");
          return false;
        }

        return { type, description, location, priority };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newInc = {
          id: `INC-0${incidents.length + 25}`,
          type: result.value.type,
          description: result.value.description,
          location: result.value.location,
          priority: result.value.priority,
          status: "Abierta",
          responsible: "S. Ramirez",
          responsibleRole: "Serenazgo",
          dateTime: new Date().toLocaleString()
        };

        setIncidents([newInc, ...incidents]);

        Swal.fire({
          title: "¡Registrado!",
          text: "La incidencia ha sido registrada correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const handleExport = () => {
    Swal.fire({
      title: "Exportar Datos",
      text: "Generando reporte de incidencias en formato CSV...",
      icon: "info",
      timer: 1500,
      showConfirmButton: false
    });
  };

  return (
    <div className="incidents-container">
      <div className="incidents-header-top">
        <div className="incidents-title-box">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <h1>Incidencias</h1>
            <p className="incidents-subtitle">Gestión y seguimiento de todos los casos registrados</p>
          </div>
        </div>

        <div className="incidents-kpi-grid">
          <div className="kpi-card blue">
            <div className="kpi-info-box">
              <span className="kpi-title">Total de incidencias</span>
              <span className="kpi-value">{database.incidentsStats.total}</span>
              <span className="kpi-sub">12% vs semana anterior</span>
            </div>
            <div className="kpi-icon-circle blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
          </div>

          <div className="kpi-card pink">
            <div className="kpi-info-box">
              <span className="kpi-title">Abiertas</span>
              <span className="kpi-value">{database.incidentsStats.open}</span>
              <span className="kpi-sub">3%</span>
            </div>
            <div className="kpi-icon-circle pink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>

          <div className="kpi-card yellow">
            <div className="kpi-info-box">
              <span className="kpi-title">En proceso</span>
              <span className="kpi-value">{database.incidentsStats.inProgress}</span>
              <span className="kpi-sub">2%</span>
            </div>
            <div className="kpi-icon-circle yellow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>

          <div className="kpi-card green">
            <div className="kpi-info-box">
              <span className="kpi-title">Resueltas</span>
              <span className="kpi-value">{database.incidentsStats.resolved}</span>
              <span className="kpi-sub">5%</span>
            </div>
            <div className="kpi-icon-circle green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="incidents-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Buscar por ID, descripción o ubicación..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="incidents-filter-row">
        <div className="filter-item-group">
          <span className="filter-label">Estado</span>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Abierta">Abierta</option>
            <option value="En proceso">En proceso</option>
            <option value="Resuelta">Resuelta</option>
          </select>
        </div>

        <div className="filter-item-group">
          <span className="filter-label">Prioridad</span>
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div className="filter-item-group">
          <span className="filter-label">Categoría</span>
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Acoso callejero">Acoso callejero</option>
            <option value="Persona en zona restringida">Persona en zona restringida</option>
            <option value="Altercado reportado">Altercado reportado</option>
            <option value="Objeto abandonado">Objeto abandonado</option>
            <option value="Falla de cámara">Falla de cámara</option>
          </select>
        </div>

        <div className="filter-item-group">
          <span className="filter-label">Fecha</span>
          <select className="filter-select">
            <option>12/09/2026</option>
          </select>
        </div>

        <div className="filter-item-group">
          <span className="filter-label">Responsables</span>
          <select className="filter-select">
            <option>Todos</option>
          </select>
        </div>

        <div className="filter-actions-group">
          <button className="btn-export" onClick={handleExport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Exportar
          </button>

          <button className="btn-add-incident" onClick={handleRegisterIncident}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Registrar incidencia
          </button>
        </div>
      </div>

      <div className="incidents-table-card">
        <div className="incidents-table-wrapper">
          <table className="incidents-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo de incidencia</th>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Fecha/Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((item, index) => (
                <tr key={index}>
                  <td className="col-id">{item.id}</td>
                  <td>
                    <div className="col-type">
                      <span className="dot-type"></span>
                      <span>{item.type}</span>
                    </div>
                  </td>
                  <td style={{ maxWidth: "220px" }}>{item.description}</td>
                  <td>
                    <div className="col-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{item.location}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge-tag ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-tag ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <div className="col-responsible">
                      <img src={avatarRamirez} alt={item.responsible} className="resp-avatar" />
                      <div className="resp-info">
                        <span className="resp-name">{item.responsible}</span>
                        <div className="resp-role-row">
                          <span className="status-dot" style={{ width: "6px", height: "6px" }}></span>
                          <span>{item.responsibleRole}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: "11px", color: "#1e3a8a", fontWeight: "600" }}>
                    {item.dateTime}
                  </td>
                  <td>
                    <button className="btn-details" onClick={() => handleOpenDetails(item)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination-footer">
          <span className="pagination-info">
            Mostrar {filteredIncidents.length} de {database.incidentsStats.total} incidencias
          </span>

          <div className="pagination-controls">
            <button className="page-btn">&lt;</button>
            <button
              className={`page-btn ${currentPage === 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`page-btn ${currentPage === 2 ? "active" : ""}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className={`page-btn ${currentPage === 3 ? "active" : ""}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <button
              className={`page-btn ${currentPage === 4 ? "active" : ""}`}
              onClick={() => setCurrentPage(4)}
            >
              4
            </button>
            <button
              className={`page-btn ${currentPage === 5 ? "active" : ""}`}
              onClick={() => setCurrentPage(5)}
            >
              5
            </button>
            <button className="page-btn">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};