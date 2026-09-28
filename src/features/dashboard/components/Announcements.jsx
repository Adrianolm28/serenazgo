import React from "react";

export const Announcements = ({ announcements }) => {
  return (
    <div className="announcements-card">
      <div className="announcements-header">
        <h2>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8 4a2 2 0 0 1-4 0"></path>
          </svg>
          Comunicados y avisos
        </h2>
        <a href="#all" className="see-all-link">Ver todo</a>
      </div>

      <div className="announcements-list">
        {announcements.map((item) => (
          <div key={item.id} className="announcement-item">
            <div className="announcement-left">
              <span className={`announcement-tag ${item.type.toLowerCase()}`}>
                {item.type}
              </span>
              <div className="announcement-body">
                <span className="announcement-title">{item.title}</span>
                <span className="announcement-desc">{item.description}</span>
              </div>
            </div>
            <div className="announcement-right">
              <span>{item.time}</span>
              <span>{item.entity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};