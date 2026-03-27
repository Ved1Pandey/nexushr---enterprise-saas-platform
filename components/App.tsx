import React, { useState } from "react";
import Login from "./Login";
import ApplyLeave from "./ApplyLeave";
import ApproveLeaves from "./ApproveLeaves";
import MyTeam from "./MyTeam";
const App = () => {

  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [page, setPage] = useState("dashboard");

  if (!user) {
    return <Login onLogin={setUser} />;
  }
  const role = (user?.role || "").toLowerCase();

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <div className="w-60 bg-gray-100 p-4 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-6">NexusHR</h2>

          <div className="space-y-3">

            <button onClick={() => setPage("dashboard")}>
              Dashboard
            </button>

            <button onClick={() => setPage("apply")}>
              Apply Leave
            </button>
            {(role.includes("manager") || role.includes("team")) && (
              <>
                <button onClick={() => setPage("approve")}>
                  Approve Leaves
                </button>
                <button onClick={() => setPage("team")}>
                  My Team
                </button>
              </>
            )}
          </div>
        </div>
{/* LOGOUT */}
        <button
          className="bg-red-500 text-white px-3 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
        >
          Logout
        </button>

      </div>
      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-3 rounded mb-4 flex justify-between">
          <span>Dashboard</span>
          <span>{user.name} ({user.role})</span>
        </div>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow rounded">Manage Leaves</div>
            <div className="p-4 bg-white shadow rounded">My Team</div>
            <div className="p-4 bg-white shadow rounded">Reports</div>
          </div>
        )}

        {/* APPLY */}
        {page === "apply" && <ApplyLeave />}

        {/* APPROVE */}
        {page === "approve" && <ApproveLeaves />}

        {/* TEAM */}
        {page === "team" && <MyTeam />}

      </div>

    </div>
  );
};
export default App;