import React, { useEffect, useState } from "react";

interface Leave {
  id: number;
  employee_id: number;
  from_date: string;
  to_date: string;
  reason: string;
  status: string;
}

const LeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("")
const [toDate, setToDate] = useState("")
const [reason, setReason] = useState("")

  // ✅ FETCH LEAVES
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/leaves");
      const data = await res.json();
      setLeaves(data);
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    } finally {
      setLoading(false);
    }
  };
// ✅ APPLY LEAVE
const applyLeave = async () => {
  try {
    await fetch("http://localhost:3001/api/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: 1,
        from_date: fromDate,
        to_date: toDate,
        reason: reason,
      }),
    });

    setFromDate("");
    setToDate("");
    setReason("");

    fetchLeaves(); // refresh
  } catch (err) {
    console.error("Leave apply failed:", err);
  }
};
  // ✅ APPROVE / REJECT
  const handleStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`http://localhost:3001/api/leaves/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchLeaves(); // 🔥 refresh
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Leave Management 🚀</h2>
{/* APPLY LEAVE */}
<div className="mb-6 p-4 bg-white rounded-xl shadow">
  <h3 className="font-bold mb-2">Apply Leave</h3>

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
      Apply Leave
    </button>
  </div>
</div>
      {loading && <p>Loading...</p>}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-t">
                <td className="p-3">{leave.employee_id}</td>
                <td className="p-3">{leave.from_date}</td>
                <td className="p-3">{leave.to_date}</td>
                <td className="p-3">{leave.reason}</td>

                <td className="p-3 font-semibold">
                  {leave.status === "APPROVED" && (
                    <span className="text-green-600">APPROVED</span>
                  )}
                  {leave.status === "REJECTED" && (
                    <span className="text-red-600">REJECTED</span>
                  )}
                  {leave.status === "PENDING" && (
                    <span className="text-yellow-600">PENDING</span>
                  )}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleStatus(leave.id, "APPROVED")}
                    className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatus(leave.id, "REJECTED")}
                    className="bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {leaves.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;