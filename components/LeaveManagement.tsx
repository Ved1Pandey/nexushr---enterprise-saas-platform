import React from "react";

const Dashboard = ({ onLogout }: any) => {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h1 className="text-xl font-bold mb-6 text-blue-600">
          NexusHR
        </h1>

        <ul className="space-y-4">
          <li className="cursor-pointer">Dashboard</li>
          <li className="cursor-pointer">Manage Leaves</li>
          <li className="cursor-pointer">My Team</li>
          <li className="cursor-pointer">Reports</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* HEADER */}
        <div className="bg-white shadow p-4 flex justify-between">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="flex items-center gap-4">
            <span>{name} ({role})</span>

            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="p-6 grid grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded shadow">
            Manage Leaves
          </div>

          <div className="bg-white p-5 rounded shadow">
            My Team
          </div>

          <div className="bg-white p-5 rounded shadow">
            Reports
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
