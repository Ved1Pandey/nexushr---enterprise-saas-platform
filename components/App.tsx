import React, { useEffect, useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) setIsAuthenticated(true);
  }, []);

  const handleLogin = (user: any) => {
    localStorage.setItem("id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("role", user.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={logout} />;
};

export default App;
