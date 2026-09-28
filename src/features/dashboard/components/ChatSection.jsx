import React, { useState } from "react";
import avatarRamirez from "../../../assets/avatar-ramirez.webp";

export const ChatSection = ({ initialMessages, contacts }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages([...messages, newMessage]);
    setText("");
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Disponible": return "status-dot";
      case "En intervención": return "status-dot en-intervencion";
      case "En descanso": return "status-dot en-descanso";
      default: return "status-dot no-disponible";
    }
  };

  return (
    <div className="chat-container">
      {/* Columna Izquierda: Conversación */}
      <div className="chat-main-area">
        <div className="chat-header-top">
          <div className="chat-active-user">
            <img src={avatarRamirez} alt="S. Ramirez" className="chat-active-avatar" />
            <div className="chat-active-info">
              <h3>S. Ramirez</h3>
              <span className="chat-active-status">
                <span className="status-dot"></span> Disponible
              </span>
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="12" cy="5" r="1.5"></circle>
              <circle cx="12" cy="19" r="1.5"></circle>
            </svg>
          </button>
        </div>

        <div className="messages-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-bubble ${msg.sender === "me" ? "sent" : "received"}`}
            >
              <span>{msg.text}</span>
              <div className="message-time-container">
                <span className="message-time">{msg.time}</span>
                {msg.sender === "me" && (
                  <svg className="message-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                     <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <div className="chat-tools">
            <button className="chat-tool-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </button>
            <button className="chat-tool-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </button>
            <button className="chat-tool-btn">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </button>
          </div>
          <form onSubmit={handleSend} className="chat-input-box">
            <input
              type="text"
              placeholder="Escribe un mensaje...."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="send-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <line x1="22" y1="2" x2="11" y2="13"></line>
                 <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Columna Derecha: Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-list-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
             <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          Chat
        </div>

        <div className="chat-search-container">
          <div className="chat-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Buscar personal, grupo o mensaje..." />
          </div>
        </div>

        <div className="chat-tabs">
          <span className="chat-tab active">Personas</span>
          <span className="chat-tab">Grupos</span>
          <span className="chat-tab">No leídos (3)</span>
        </div>

        <div className="contacts-scroll">
          {(contacts || []).map((contact) => (
            <div key={contact.id} className={`contact-item ${contact.active ? "active" : ""}`}>
              <div className="contact-avatar-box">
                <img src={avatarRamirez} alt={contact.name} className="contact-avatar" />
              </div>
              <div className="contact-info-wrapper">
                <div className="contact-header-row">
                  <span className="contact-name">{contact.name}</span>
                  {contact.time && <span className="contact-time">{contact.time}</span>}
                </div>
                <div className="contact-status-row">
                   <span className={getStatusColorClass(contact.status)}></span>
                   <span className="contact-status-text">{contact.status}</span>
                </div>
                {contact.lastMessage && (
                   <span className="contact-last-message">{contact.lastMessage}</span>
                )}
              </div>
              {contact.unread > 0 && (
                <div className="unread-badge">{contact.unread}</div>
              )}
            </div>
          ))}
        </div>
        
        <button className="load-more-btn">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
           </svg>
           Ver más conversaciones
        </button>
      </div>
    </div>
  );
};