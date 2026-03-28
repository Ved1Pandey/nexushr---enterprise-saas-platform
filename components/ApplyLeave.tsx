import React, { useState } from "react";

const ApplyLeave: React.FC = () => {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleApplyLeave = async () => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    console.log("USER:", user);

    if (!user.id || !fromDate || !toDate || !reason) {
      alert("All fields required");
      return;
    }

    try {

      console.log("SENDING:", {
        employee_id: user.id,
        from_date: fromDate,
        to_date: toDate,
        reason: reason
      });

      const res = await fetch("http://localhost:3001/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employee_id: user.id,
          from_date: fromDate,
          to_date: toDate,
          reason: reason
        })
      });

      if (!res.ok) {
        alert("Failed to apply leave");
        return;
      }

      alert("Leave applied ✅");

      setFromDate("");
      setToDate("");
      setReason("");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        Apply Leave
      </h2>

      <div className="bg-white p-4 rounded shadow w-96">

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason"
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={handleApplyLeave}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>

      </div>

    </div>
  );
};

export default ApplyLeave;
