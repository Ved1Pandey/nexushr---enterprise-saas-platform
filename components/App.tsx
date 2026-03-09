import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import LeaveManagement from "./LeaveManagement";
import ApplyLeave from "./ApplyLeave";

type UserRole =
  | "EMPLOYEE"
  | "TL"
  | "MANAGER"
  | "SR_MANAGER"
  | "VP"
  | "ADMIN";

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState<UserRole>("EMPLOYEE");

  // page switch
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

      console.error("Fetch failed:", err);

      setEmployees([]);

    }

  };

  // =========================
  // LOAD APP
  // =========================

  useEffect(() => {

    const savedAuth = localStorage.getItem("nexus_auth");

    if (savedAuth) {

      try {

        const parsed = JSON.parse(savedAuth);

        setUserEmail(parsed.email);
        setRole(parsed.role);
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

  const handleLogin = (email: string, userRole: UserRole) => {

    setUserEmail(email);
    setRole(userRole);
    setIsAuthenticated(true);

    localStorage.setItem(
      "nexus_auth",
      JSON.stringify({ email, role: userRole })
    );

  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    setIsAuthenticated(false);

    localStorage.removeItem("nexus_auth");

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

      {page === "dashboard" && (

        <Dashboard
          employees={employees}
          onRefresh={fetchEmployees}
          setPage={setPage}
        />

      )}

      {page === "leave" && (

        <ApplyLeave setPage={setPage} />

      )}

      {page === "leaveManagement" && (

        <LeaveManagement />

      )}

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