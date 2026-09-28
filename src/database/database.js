export const database = {
  users: [
    {
      id: 1,
      dni: "12345678",
      password: "admin123",
      name: "Elena Gutiérrez Morales",
      role: "Personal de Serenazgo motorizado",
      avatar: "avatar-elena.webp",
      email: "elenagutiérrez@nexo.com",
      phone: "+51 987 654 321"
    }
  ],
  metrics: {
    connectedPersonal: { current: 18, total: 24 },
    activeIncidents: 1,
    pendingAlerts: 3
  },
  incidentsStats: {
    total: 42,
    open: 14,
    inProgress: 12,
    resolved: 16
  },
  staffStats: {
    total: 58,
    active: 52,
    inactive: 4,
    onLeave: 2
  },
  staffList: [
    {
      id: "PER-024",
      name: "Ana Torres",
      dni: "73665393",
      role: "Motorizado",
      area: "Operaciones",
      status: "Activo",
      date: "12-03-2024",
      email: "ana.torres@nexo.com",
      phone: "+51 987 654 321"
    },
    {
      id: "PER-025",
      name: "S. Lopez",
      dni: "72445677",
      role: "Motorizado",
      area: "Operaciones",
      status: "Inactivos",
      date: "12-03-2024",
      email: "s.lopez@nexo.com",
      phone: "+51 987 654 322"
    },
    {
      id: "PER-026",
      name: "S. Solis",
      dni: "72445677",
      role: "Motorizado",
      area: "Operaciones",
      status: "Activo",
      date: "12-03-2024",
      email: "s.solis@nexo.com",
      phone: "+51 987 654 323"
    },
    {
      id: "PER-027",
      name: "S. Salas",
      dni: "72445677",
      role: "Motorizado",
      area: "Operaciones",
      status: "Activo",
      date: "12-03-2024",
      email: "s.salas@nexo.com",
      phone: "+51 987 654 324"
    },
    {
      id: "PER-028",
      name: "S. Perez",
      dni: "72445677",
      role: "Motorizado",
      area: "Operaciones",
      status: "Activo",
      date: "12-03-2024",
      email: "s.perez@nexo.com",
      phone: "+51 987 654 325"
    },
    {
      id: "PER-029",
      name: "S. Rojas",
      dni: "72445677",
      role: "Motorizado",
      area: "Operaciones",
      status: "Inactivos",
      date: "12-03-2024",
      email: "s.rojas@nexo.com",
      phone: "+51 987 654 326"
    },
    {
      id: "PER-030",
      name: "L. Rojas",
      dni: "72445677",
      role: "Motorizado",
      area: "Operaciones",
      status: "En licencia",
      date: "12-03-2024",
      email: "l.rojas@nexo.com",
      phone: "+51 987 654 327"
    }
  ],
  incidents: [
    {
      id: "INC-024",
      type: "Acoso callejero",
      description: "Señor perseguía a una niña saliendo del colegio",
      location: "Parque del Maestro",
      priority: "Alta",
      status: "Abierta",
      responsible: "S. Ramirez",
      responsibleRole: "Serenazgo",
      dateTime: "25/09/2026 19:42 p.m."
    },
    {
      id: "INC-025",
      type: "Persona en zona restringida",
      description: "Individuo en área restringida sin autorización",
      location: "Parque del Maestro",
      priority: "Media",
      status: "En proceso",
      responsible: "S. Ramirez",
      responsibleRole: "Serenazgo",
      dateTime: "25/09/2026 19:42 p.m."
    },
    {
      id: "INC-026",
      type: "Altercado reportado",
      description: "Discusión entre dos personas en la zona de acceso principal",
      location: "Parque del Maestro",
      priority: "Media",
      status: "En proceso",
      responsible: "S. Ramirez",
      responsibleRole: "Serenazgo",
      dateTime: "25/09/2026 19:42 p.m."
    },
    {
      id: "INC-027",
      type: "Objeto abandonado",
      description: "Discusión entre dos personas en la zona de acceso principal",
      location: "Parque del Maestro",
      priority: "Media",
      status: "Abierta",
      responsible: "S. Ramirez",
      responsibleRole: "Serenazgo",
      dateTime: "25/09/2026 19:42 p.m."
    },
    {
      id: "INC-028",
      type: "Falla de cámara",
      description: "Se encontró una cámara que no graba del todo",
      location: "Parque del Maestro",
      priority: "Alta",
      status: "Abierta",
      responsible: "S. Ramirez",
      responsibleRole: "Serenazgo",
      dateTime: "25/09/2026 19:42 p.m."
    },
    {
      id: "INC-029",
      type: "Acoso callejero",
      description: "Se encontró una cámara que no graba del todo",
      location: "Parque del Maestro",
      priority: "Alta",
      status: "Resuelta",
      responsible: "S. Ramirez",
      responsibleRole: "Serenazgo",
      dateTime: "25/09/2026 19:42 p.m."
    }
  ],
  announcements: [
    {
      id: 1,
      type: "Urgente",
      title: "Refuerzo de patrullaje en zonas de riesgo",
      description: "Se solicita mantener mayor presencia en los parques por incremento de incidencias en las últimas horas.",
      time: "Hoy, 20:15",
      entity: "Municipalidad de SJL"
    },
    {
      id: 2,
      type: "Información",
      title: "Cambio de turno - Turno noche",
      description: "El personal de turno noche ingresa a partir de las 22:00 hrs.",
      time: "Hoy, 16:22",
      entity: "PNP"
    },
    {
      id: 3,
      type: "Coordinación",
      title: "Reunión con PNP",
      description: "Mañana 17:00 p.m. en la comisaría de SJL para coordinación de operativos.",
      time: "Hoy, 20:15",
      entity: "Municipalidad de SJL"
    },
    {
      id: 4,
      type: "General",
      title: "Mantenimientos de equipos",
      description: "Se realizará mantenimiento preventivo a las cámaras corporales el viernes 26.",
      time: "Hoy, 16:22",
      entity: "PNP"
    },
    {
      id: 5,
      type: "General",
      title: "Mantenimientos de equipos",
      description: "Se realizará mantenimiento preventivo a las cámaras corporales el viernes 26.",
      time: "",
      entity: "PNP"
    }
  ],
  contacts: [
    {
      id: 1,
      name: "S. Ramirez",
      status: "Disponible",
      lastMessage: "De acuerdo.",
      time: "20:41",
      unread: 0,
      active: true
    },
    {
      id: 2,
      name: "J. Flores",
      status: "En intervención",
      lastMessage: "Ya estoy en la incidencia. Avisto es o...",
      time: "20:40",
      unread: 1,
      active: false
    },
    {
      id: 3,
      name: "M. Torres",
      status: "En descanso",
      lastMessage: "",
      time: "",
      unread: 0,
      active: false
    },
    {
      id: 4,
      name: "M. Torres",
      status: "En descanso",
      lastMessage: "",
      time: "",
      unread: 0,
      active: false
    },
    {
      id: 5,
      name: "M. Torres",
      status: "En descanso",
      lastMessage: "",
      time: "",
      unread: 0,
      active: false
    },
    {
      id: 6,
      name: "M. Torres",
      status: "En descanso",
      lastMessage: "",
      time: "",
      unread: 0,
      active: false
    },
    {
      id: 7,
      name: "M. Torres",
      status: "En descanso",
      lastMessage: "",
      time: "",
      unread: 0,
      active: false
    },
    {
      id: 8,
      name: "M. Torres",
      status: "Disponible",
      lastMessage: "",
      time: "",
      unread: 0,
      active: false
    }
  ],
  chatMessages: [
    {
      id: 1,
      sender: "me",
      text: "¿Cómo va todo en la zona?",
      time: "20:40"
    },
    {
      id: 2,
      sender: "S. Ramirez",
      text: "Todo tranquilo por ahora. Estoy en el Parque del Maestro.",
      time: "20:40"
    },
    {
      id: 3,
      sender: "me",
      text: "Recibido. Si ves algo inusual, avísame de inmediato.",
      time: "20:40"
    },
    {
      id: 4,
      sender: "S. Ramirez",
      text: "De acuerdo.",
      time: "20:41"
    }
  ],
  cameras: [
    {
      id: 1,
      name: "Cámara 1 - Entrada principal",
      location: "Entrada principal",
      lat: -11.9805,
      lng: -77.0012,
      isHd: true
    },
    {
      id: 2,
      name: "Cámara 2 - Entrada principal",
      location: "Parque del Maestro",
      lat: -11.982,
      lng: -77.0025,
      isHd: true
    },
    {
      id: 3,
      name: "Cámara 3 - Entrada principal",
      location: "Parque del Maestro",
      lat: -11.9835,
      lng: -77.0038,
      isHd: false
    },
    {
      id: 4,
      name: "Cámara 4 - Entrada principal",
      location: "Parque del Maestro",
      lat: -11.985,
      lng: -77.0045,
      isHd: true
    },
    {
      id: 5,
      name: "Cámara 5 - Parque del Maestro",
      location: "Parque del Maestro",
      lat: -11.986,
      lng: -77.005,
      isHd: true
    },
    {
      id: 6,
      name: "Cámara 6 - Parque del Maestro",
      location: "Parque del Maestro",
      lat: -11.987,
      lng: -77.006,
      isHd: false
    }
  ],
  recordings: [
    {
      id: 1,
      name: "Cámara 1 - Entrada principal",
      date: "26-01-2026",
      time: "17:22 p.m.",
      lat: -11.9805,
      lng: -77.0012
    },
    {
      id: 2,
      name: "Cámara 2 - Parque del Maestro",
      date: "26-01-2026",
      time: "17:22 p.m.",
      lat: -11.982,
      lng: -77.0025
    },
    {
      id: 3,
      name: "Cámara 3 - Parque del Maestro",
      date: "26-01-2026",
      time: "17:22 p.m.",
      lat: -11.9835,
      lng: -77.0038
    },
    {
      id: 4,
      name: "Cámara 4 - Parque del Maestro",
      date: "26-01-2026",
      time: "17:22 p.m.",
      lat: -11.985,
      lng: -77.0045
    },
    {
      id: 5,
      name: "Cámara 5 - Parque del Maestro",
      date: "26-01-2026",
      time: "17:22 p.m.",
      lat: -11.986,
      lng: -77.005
    },
    {
      id: 6,
      name: "Cámara 6 - Parque del Maestro",
      date: "26-01-2026",
      time: "17:22 p.m.",
      lat: -11.987,
      lng: -77.006
    }
  ]
};