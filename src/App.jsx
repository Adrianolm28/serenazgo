import React, { useState } from "react";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <main>
      {isAuthenticated ? (
        <DashboardPage />
      ) : (
        <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </main>
  );
}

export default App;