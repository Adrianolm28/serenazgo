import React, { useState } from "react";
import Swal from "sweetalert2";
import { database } from "../../../database/database";
import avatarRamirez from "../../../assets/avatar-ramirez.webp";
import "../components/StaffPage.css";

export const StaffPage = () => {
  const [staff, setStaff] = useState(database.staffList);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [areaFilter, setAreaFilter] = useState("Todas");
  const [roleFilter, setRoleFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(database.staffList[0]);

  const filteredStaff = staff.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.dni.includes(searchQuery);

    const matchesStatus =
      statusFilter === "Todas" || user.status === statusFilter;

    const matchesArea =
      areaFilter === "Todas" || user.area === areaFilter;

    const matchesRole =
      roleFilter === "Todas" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesArea && matchesRole;
  });

  const handleRegister = () => {
    Swal.fire({
      title: "Registrar Nuevo Personal",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nombre completo">
        <input id="swal-dni" class="swal2-input" placeholder="Número de DNI">
        <input id="swal-role" class="swal2-input" placeholder="Cargo (ej. Motorizado)">
        <input id="swal-area" class="swal2-input" placeholder="Área (ej. Operaciones)">
        <select id="swal-status" class="swal2-input">
          <option value="Activo">Activo</option>
          <option value="Inactivos">Inactivo</option>
          <option value="En licencia">En licencia</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1d4ed8",
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const dni = document.getElementById("swal-dni").value;
        const role = document.getElementById("swal-role").value;
        const area = document.getElementById("swal-area").value;
        const status = document.getElementById("swal-status").value;

        if (!name || !dni || !role || !area) {
          Swal.showValidationMessage("Por favor completa todos los campos principales");
          return false;
        }

        return { name, dni, role, area, status };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newUser = {
          id: `PER-0${staff.length + 24}`,
          name: result.value.name,
          dni: result.value.dni,
          role: result.value.role,
          area: result.value.area,
          status: result.value.status,
          date: new Date().toLocaleDateString("es-PE"),
          email: `${result.value.name.toLowerCase().replace(/\s+/g, ".")}@nexo.com`,
          phone: "+51 987 654 000"
        };

        setStaff([newUser, ...staff]);
        setSelectedUser(newUser);

        Swal.fire({
          title: "¡Registrado!",
          text: "El colaborador ha sido ingresado correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const handleOpenFiltersModal = () => {
    Swal.fire({
      title: "Filtros Avanzados",
      html: `
        <div style="text-align: left; font-size: 13px; display: flex; flex-direction: column; gap: 10px;">
          <label><strong>Estado del colaborador:</strong></label>
          <select id="swal-filter-status" class="swal2-input" style="margin-top:0">
            <option value="Todas" ${statusFilter === "Todas" ? "selected" : ""}>Todas</option>
            <option value="Activo" ${statusFilter === "Activo" ? "selected" : ""}>Activo</option>
            <option value="Inactivos" ${statusFilter === "Inactivos" ? "selected" : ""}>Inactivos</option>
            <option value="En licencia" ${statusFilter === "En licencia" ? "selected" : ""}>En licencia</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Aplicar Filtros",
      cancelButtonText: "Restablecer",
      confirmButtonColor: "#1d4ed8",
      preConfirm: () => {
        const statusVal = document.getElementById("swal-filter-status").value;
        setStatusFilter(statusVal);
      }
    }).then((res) => {
      if (res.dismiss === Swal.DismissReason.cancel) {
        setStatusFilter("Todas");
        setAreaFilter("Todas");
        setRoleFilter("Todas");
        setSearchQuery("");
      }
    });
  };

  const handleViewUserDetail = (user) => {
    setSelectedUser(user);
    Swal.fire({
      title: `Detalles de ${user.name}`,
      html: `
        <div style="text-align: left; font-size: 13px; line-height: 1.8; color: #0f172a;">
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>DNI:</strong> ${user.dni}</p>
          <p><strong>Cargo:</strong> ${user.role}</p>
          <p><strong>Área:</strong> ${user.area}</p>
          <p><strong>Estado:</strong> ${user.status}</p>
          <p><strong>Fecha de Ingreso:</strong> ${user.date}</p>
          <p><strong>Correo:</strong> ${user.email}</p>
          <p><strong>Teléfono:</strong> ${user.phone}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#1d4ed8"
    });
  };

  const handleDownloadDoc = (docName) => {
    Swal.fire({
      title: "Descargando documento",
      text: `Se está descargando: ${docName}`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false
    });
  };

  const handleViewFullProfile = () => {
    Swal.fire({
      title: `Perfil Completo - ${selectedUser.name}`,
      html: `
        <div style="text-align: left; font-size: 13px; line-height: 1.8; color: #0f172a;">
          <p><strong>ID:</strong> ${selectedUser.id}</p>
          <p><strong>DNI:</strong> ${selectedUser.dni}</p>
          <p><strong>Cargo:</strong> ${selectedUser.role}</p>
          <p><strong>Área:</strong> ${selectedUser.area}</p>
          <p><strong>Estado:</strong> ${selectedUser.status}</p>
          <p><strong>Fecha de Ingreso:</strong> ${selectedUser.date}</p>
          <p><strong>Correo Electrónico:</strong> ${selectedUser.email}</p>
          <p><strong>Teléfono:</strong> ${selectedUser.phone}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#1d4ed8"
    });
  };

  const getStatusPill = (status) => {
    const statusClass = status.toLowerCase().replace(" ", "-");
    return (
      <span className={`status-pill ${statusClass}`}>
        <span className="status-pill-dot"></span>
        {status}
      </span>
    );
  };

  return (
    <div className="staff-container">
      <div className="staff-header-section">
        <div className="staff-title-row">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b1a3a" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h1>Incidencias</h1>
        </div>
        <p className="staff-subtitle">Gestiona la información del personal del sistema NEXO</p>
      </div>

      <div className="staff-kpi-row">
        <div className="staff-kpi-card">
          <div className="kpi-icon-wrapper blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="kpi-text-content">
            <span className="kpi-card-title">Total de personal</span>
            <span className="kpi-card-value">{database.staffStats.total}</span>
          </div>
        </div>

        <div className="staff-kpi-card">
          <div className="kpi-icon-wrapper green">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a">
              <circle cx="12" cy="12" r="12"></circle>
            </svg>
          </div>
          <div className="kpi-text-content">
            <span className="kpi-card-title">Activos</span>
            <span className="kpi-card-value">{database.staffStats.active}</span>
          </div>
        </div>

        <div className="staff-kpi-card">
          <div className="kpi-icon-wrapper red">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc2626">
              <circle cx="12" cy="12" r="12"></circle>
            </svg>
          </div>
          <div className="kpi-text-content">
            <span className="kpi-card-title">Inactivos</span>
            <span className="kpi-card-value">{database.staffStats.inactive}</span>
          </div>
        </div>

        <div className="staff-kpi-card">
          <div className="kpi-icon-wrapper yellow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ca8a04">
              <circle cx="12" cy="12" r="12"></circle>
            </svg>
          </div>
          <div className="kpi-text-content">
            <span className="kpi-card-title">En licencia</span>
            <span className="kpi-card-value">{database.staffStats.onLeave}</span>
          </div>
        </div>

        <div className="staff-kpi-card action-card" onClick={handleRegister}>
          <div className="kpi-icon-wrapper blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <div className="kpi-text-content">
            <span className="kpi-card-title">Registrar personal</span>
            <span className="kpi-card-desc">Agregar un nuevo colaborador al sistema</span>
          </div>
        </div>
      </div>

      <div className="staff-filters-section">
        <div className="staff-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar por ID o nombre completo del usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="staff-filter-box">
          <span className="staff-filter-label">Estado</span>
          <div className="staff-filter-select-wrapper">
            <select
              className="staff-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="Activo">Activo</option>
              <option value="Inactivos">Inactivos</option>
              <option value="En licencia">En licencia</option>
            </select>
            <svg className="select-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="staff-filter-box">
          <span className="staff-filter-label">Área</span>
          <div className="staff-filter-select-wrapper">
            <select
              className="staff-filter-select"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="Operaciones">Operaciones</option>
            </select>
            <svg className="select-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="staff-filter-box">
          <span className="staff-filter-label">Cargo</span>
          <div className="staff-filter-select-wrapper">
            <select
              className="staff-filter-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="Motorizado">Motorizado</option>
            </select>
            <svg className="select-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <button className="btn-outline-blue" onClick={handleOpenFiltersModal}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtros
        </button>

        <button className="btn-solid-blue" onClick={handleRegister}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nuevo personal
        </button>
      </div>

      <div className="staff-main-layout">
        <div className="staff-table-card">
          <div className="staff-table-container">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre completo</th>
                  <th>Cargo</th>
                  <th>Área</th>
                  <th>Estado</th>
                  <th>Ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((user, idx) => (
                  <tr
                    key={idx}
                    className={selectedUser?.id === user.id ? "selected-row" : ""}
                    onClick={() => setSelectedUser(user)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{user.id}</td>
                    <td>
                      <div className="user-cell">
                        <img src={avatarRamirez} alt={user.name} className="user-cell-avatar" />
                        <div className="user-cell-info">
                          <span className="user-cell-name">{user.name}</span>
                          <span className="user-cell-dni">DNI: {user.dni}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.role}</td>
                    <td>{user.area}</td>
                    <td>{getStatusPill(user.status)}</td>
                    <td>{user.date}</td>
                    <td>
                      <button
                        className="action-eye-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewUserDetail(user);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-pagination-footer" style={{ marginTop: "auto" }}>
            <span className="pagination-info" style={{ fontSize: "11px", color: "#64748b" }}>
              Mostrar {filteredStaff.length} de {database.staffStats.total} incidencias
            </span>
            <div className="pagination-controls">
              <button className="page-btn">&lt;</button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button className="page-btn">&gt;</button>
            </div>
          </div>
        </div>

        <div className="staff-profile-card">
          <div className="profile-header-main">
            <div className="profile-avatar-large-wrapper">
              <img src={avatarRamirez} alt={selectedUser.name} className="profile-avatar-large" />
              <div className="profile-status-indicator"></div>
            </div>
            <div>
              <h2 className="profile-name-large">{selectedUser.name}</h2>
              <p className="profile-dni-large">DNI: {selectedUser.dni}</p>
              {getStatusPill(selectedUser.status)}
            </div>
          </div>

          <div className="profile-details-list">
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="profile-detail-label">Cargo</span>
              <span>{selectedUser.role}</span>
            </div>
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <span className="profile-detail-label">Área</span>
              <span>{selectedUser.area}</span>
            </div>
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <span className="profile-detail-label">Correo</span>
              <span style={{ fontSize: "11px", wordBreak: "break-all" }}>{selectedUser.email}</span>
            </div>
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <span className="profile-detail-label">Teléfono</span>
              <span>{selectedUser.phone}</span>
            </div>
            <div className="profile-detail-item">
              <div className="profile-detail-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <span className="profile-detail-label">Ingreso</span>
              <span>{selectedUser.date}</span>
            </div>
          </div>

          <div className="docs-section">
            <div className="docs-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Documentos
              </h3>
              <a className="docs-link" onClick={() => handleDownloadDoc("Todos los documentos")}>Ver todos &rrarr;</a>
            </div>

            <div className="doc-item">
              <div className="doc-item-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
                DNI
              </div>
              <div className="doc-item-right">
                <span className="valid-pill">Válido</span>
                <button className="doc-download-btn" onClick={() => handleDownloadDoc("DNI")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="doc-item">
              <div className="doc-item-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
                Contrato
              </div>
              <div className="doc-item-right">
                <span className="valid-pill">Válido</span>
                <button className="doc-download-btn" onClick={() => handleDownloadDoc("Contrato")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="doc-item">
              <div className="doc-item-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
                Certificados
              </div>
              <div className="doc-item-right">
                <span className="valid-pill">Válido</span>
                <button className="doc-download-btn" onClick={() => handleDownloadDoc("Certificados")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <button className="btn-full-profile" onClick={handleViewFullProfile}>
            Ver perfil completo &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};