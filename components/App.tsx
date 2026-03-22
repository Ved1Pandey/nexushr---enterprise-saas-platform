import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import LeaveManagement from "./LeaveManagement";

type UserRole =
  | "EMPLOYEE"
  | "TL"
  | "MANAGER"
  | "SR_MANAGER"
  | "VP"
  | "ADMIN";

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [page, setPage] = useState("dashboard");

  // =========================
  // FETCH EMPLOYEES
  // =========================
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/employees");
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setEmployees([]);
    }
  };

  // =========================
  // LOAD APP
  // =========================
  useEffect(() => {

    const saved = localStorage.getItem("nexus_auth");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // 🔥 IMPORTANT
        localStorage.setItem("role", parsed.role);
        localStorage.setItem("email", parsed.email);

        setIsAuthenticated(true);

      } catch {
        localStorage.removeItem("nexus_auth");
      }
    }

    fetchEmployees();

  }, []);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = (userData: any) => {

    setIsAuthenticated(true);

    // 🔥 STORE ALL REQUIRED DATA
    localStorage.setItem("id", userData.id);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("role", userData.role);

    localStorage.setItem(
      "nexus_auth",
      JSON.stringify({
        email: userData.name,
        role: userData.role
      })
    );

  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // =========================
  // MAIN APP
  // =========================
  return (

    <div className="min-h-screen bg-slate-50">

      {/* 🔥 DASHBOARD */}
      {page === "dashboard" && (
        <Dashboard
          employees={employees}
          setPage={setPage}
        />
      )}

      {/* 🔥 LEAVE MANAGEMENT */}
      {page === "leaveManagement" && (
        <LeaveManagement />
      )}

      {/* 🔥 BACK BUTTON */}
      {page !== "dashboard" && (
        <div className="p-4">
          <button
            onClick={() => setPage("dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>
      )}
{/* LOGOUT */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

    </div>

  );
};

export default App;
