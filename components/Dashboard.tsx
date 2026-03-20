import React, { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
  leave_balance: number;
}

const Dashboard: React.FC<any> = ({ employees, setPage }) => {

  const userRole = (localStorage.getItem("role") || "").toLowerCase();
  const userId = Number(localStorage.getItem("id"));

  const [team, setTeam] = useState<any[]>([]);

  // =========================
  // FETCH TEAM
  // =========================
  useEffect(() => {

    const fetchTeam = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/team/${userId}/${userRole}`
        );
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Team fetch error:", err);
      }
    };

    if (userRole.includes("manager") || userRole.includes("lead")) {
      fetchTeam();
    }

  }, []);

  // =========================
// CURRENT USER
  // =========================
  const currentUser = employees.find(
    (e: any) => e.id === userId
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
{/* HEADER */}
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-bold">NexusHR Dashboard</h2>
<div className="flex items-center gap-3">
          <span className="font-semibold">
            {localStorage.getItem("name")}
          </span>
          <span className="text-sm text-gray-500">
            {localStorage.getItem("role")}
          </span>
<button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
 {/* ================= MANAGER / TEAM LEAD ================= */}
      {(userRole.includes("manager") || userRole.includes("lead")) && (

        <div className="bg-white rounded-xl shadow p-4">

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              Team Overview
            </h2>

            <div>
              <button
                onClick={() => setPage("leaveManagement")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Leaves
              </button>

              <button
                onClick={() => setPage("attendance")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg ml-2"
              >
                Attendance
              </button>
            </div>
          </div>

          {/* TEAM LIST */}
          <div className="mt-4">

            {team.length === 0 && (
              <p>No team members</p>
            )}

            {team.map((t: any) => (
              <div key={t.id} className="border p-3 mb-2 rounded">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* ================= EMPLOYEE ================= */}
      {userRole === "employee" && (

        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="text-lg font-semibold mb-3">
            Employee Panel
          </h2>

          <p className="font-bold mb-3">
            Leave Balance: {currentUser?.leave_balance || 0}
          </p>

          <button
            onClick={() => setPage("leave")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Apply Leave
          </button>

          <button
            onClick={() => setPage("attendance")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg ml-2"
          >
            Attendance
          </button>

        </div>
      )}

    </div>
  );
};

export default Dashboard;
