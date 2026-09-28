import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { TopHeader } from "../components/TopHeader";
import { MetricsCards } from "../components/MetricsCards";
import { Announcements } from "../components/Announcements";
import { ChatSection } from "../components/ChatSection";
import { MapPage } from "../../map/pages/MapPage";
import { IncidentsPage } from "../../incidents/pages/IncidentsPage";
import { StaffPage } from "../../staff/pages/StaffPage";
import { CamerasPage } from "../../cameras/pages/CamerasPage";
import { ProfilePage } from "../../profile/pages/ProfilePage";
import { database } from "../../../database/database";
import "../components/Dashboard.css";

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("inicio");
  const currentUser = database.users[0];

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="main-content">
        <TopHeader user={currentUser} />
        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
          {activeTab === "inicio" ? (
            <div className="dashboard-body" style={{ padding: 0 }}>
              <div className="left-panel">
                <div className="welcome-banner">
                  <h1>Buenos días Elena</h1>
                </div>
                <MetricsCards metrics={database.metrics} />
                <Announcements announcements={database.announcements} />
              </div>
              <div className="right-panel">
                <ChatSection
                  initialMessages={database.chatMessages}
                  contacts={database.contacts}
                />
              </div>
            </div>
          ) : activeTab === "mapa" ? (
            <MapPage />
          ) : activeTab === "incidencias" ? (
            <IncidentsPage />
          ) : activeTab === "personal" ? (
            <StaffPage />
          ) : activeTab === "camara" ? (
            <CamerasPage />
          ) : activeTab === "configuracion" ? (
            <ProfilePage />
          ) : null}
        </div>
      </div>
    </div>
  );
};