import React, { useEffect, useState } from "react";

interface Leave {
  id: number;
  employee_id: number;
  from_date: string;
  to_date: string;
  reason: string;
  status: string;
  employees?: {
    name: string;
  };
}

const LeaveManagement: React.FC = () => {

  const role = localStorage.getItem("role") || "Employee";
  const employeeId = Number(localStorage.getItem("id"));

  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  // =========================
  // 🔥 FETCH LEAVES (FIXED)
  // =========================

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/api/leaves/${employeeId}/${role}`
      );

      const data = await res.json();

      setLeaves(data);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // APPLY LEAVE
  // =========================

  const applyLeave = async () => {

    if (!fromDate || !toDate || !reason) {
      alert("Fill all fields");
      return;
    }

    try {

      await fetch("http://localhost:3001/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employee_id: employeeId,
          from_date: fromDate,
          to_date: toDate,
          reason: reason
        })
      });

      setFromDate("");
      setToDate("");
      setReason("");

      fetchLeaves();

    } catch (err) {
      console.error("Apply error:", err);
    }
  };

  // =========================
  // APPROVE / REJECT
  // =========================

  const handleStatus = async (id: number, status: string) => {

    try {

      await fetch(`http://localhost:3001/api/leaves/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      fetchLeaves();

    } catch (err) {
      console.error("Status error:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6">
        Leave Management 🚀
      </h2>

      {/* ================= APPLY LEAVE ================= */}

      {role === "Employee" && (

        <div className="mb-6 p-4 bg-white rounded-xl shadow">

          <h3 className="font-bold mb-3">
            Apply Leave
          </h3>

          <div className="flex gap-2">

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={applyLeave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply
            </button>

          </div>

        </div>

      )}

      {/* ================= TABLE ================= */}

      {loading && <p>Loading...</p>}

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Employee</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>

            {leaves.map((l) => (

              <tr key={l.id} className="border-t">

                <td className="p-2">
                  {l.employees?.name || `Emp ${l.employee_id}`}
                </td>

                <td className="p-2">{l.from_date}</td>
                <td className="p-2">{l.to_date}</td>
                <td className="p-2">{l.reason}</td>

                <td className="p-2 font-bold">
                  {l.status}
                </td>

                <td className="p-2">

                  {(role === "Manager" || role === "Team Lead") && l.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleStatus(l.id, "APPROVED")}
                        className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleStatus(l.id, "REJECTED")}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default LeaveManagement;
