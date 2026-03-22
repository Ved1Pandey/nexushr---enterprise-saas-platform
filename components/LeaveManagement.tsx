import React, { useEffect, useState } from "react";

const LeaveManagement = () => {

  const rawRole = (localStorage.getItem("role") || "").toLowerCase();
  const employeeId = Number(localStorage.getItem("id"));

  let role = "employee";
  if (rawRole.includes("manager")) role = "manager";
  else if (rawRole.includes("lead")) role = "lead";
  else if (rawRole.includes("executive")) role = "employee";

  const [leaves, setLeaves] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const fetchLeaves = async () => {
    const res = await fetch(
      `http://localhost:3001/api/leaves/${employeeId}/${role}`
    );
    const data = await res.json();
    setLeaves(data || []);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const applyLeave = async () => {
    if (!fromDate || !toDate || !reason) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:3001/api/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        employee_id: employeeId,
        from_date: fromDate,
        to_date: toDate,
        reason
      })
    });

    setFromDate("");
    setToDate("");
    setReason("");

    fetchLeaves();
  };

  const handleStatus = async (id: number, status: string) => {
    await fetch(`http://localhost:3001/api/leaves/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    fetchLeaves();
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Leave Management</h2>

      {/* 🔥 APPLY */}
      {role === "employee" && (
        <div className="mb-4">

          <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className="border p-2 mr-2" />
          <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} className="border p-2 mr-2" />
          <input type="text" value={reason} onChange={(e)=>setReason(e.target.value)} placeholder="Reason" className="border p-2 mr-2" />

          <button onClick={applyLeave} className="bg-blue-600 text-white px-3 py-2">
            Apply Leave
          </button>

        </div>
      )}

      {/* TABLE */}
      <table className="w-full border">

        <thead>
          <tr>
            <th>Emp</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id} className="border">

              <td>{l.employees?.name || l.employee_id}</td>
              <td>{l.from_date}</td>
              <td>{l.to_date}</td>
              <td>{l.reason}</td>
              <td>{l.status}</td>

              <td>
                {(role === "manager" || role === "lead") &&
                  l.status === "PENDING" && (
                    <>
                      <button onClick={()=>handleStatus(l.id,"APPROVED")} className="bg-green-500 text-white px-2 mr-2">
                        Approve
                      </button>

                      <button onClick={()=>handleStatus(l.id,"REJECTED")} className="bg-red-500 text-white px-2">
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
  );
};

export default LeaveManagement;
