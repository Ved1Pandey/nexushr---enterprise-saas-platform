import React, { useState } from "react";
const LeavePanel: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

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
          reason,
        }),
      });

      alert("Leave applied ✅");
      setFromDate("");
      setToDate("");
      setReason("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded mt-6">
      <h3 className="font-bold mb-2">Apply Leave</h3>

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={applyLeave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Leave
      </button>
    </div>
  );
};

export default LeavePanel;
