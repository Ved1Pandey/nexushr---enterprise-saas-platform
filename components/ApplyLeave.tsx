import React, { useState } from "react";

const ApplyLeave: React.FC = () => {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleApplyLeave = async () => {

    console.log("BUTTON CLICKED");

    const employeeId = Number(localStorage.getItem("id"));
    console.log("EMPLOYEE ID:", employeeId);

    // ✅ validation
    if (!employeeId || !fromDate || !toDate || !reason) {
      alert("All fields required");
      return;
    }

    try {

      const res = await fetch("http://localhost:3001/api/leaves", {
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

      const data = await res.json();

      console.log("SERVER RESPONSE:", data);

      // ❌ अगर error आया तो show करो
      if (!res.ok) {
        alert("Error: " + data.error);
        return;
      }

      // ✅ success
      alert("Leave applied successfully");

      // reset form
      setFromDate("");
      setToDate("");
      setReason("");

    } catch (err) {

      console.error("ERROR:", err);
      alert("Server error");

    }

  };

  return (

    <div className="min-h-screen bg-slate-50 p-6">

      <h2 className="text-xl font-bold mb-4">
        Apply Leave
      </h2>

      <div className="bg-white rounded-xl shadow p-4 w-96">

        <input
          type="date"
          value={fromDate}
          className="border p-2 w-full mb-3"
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          className="border p-2 w-full mb-3"
          onChange={(e) => setToDate(e.target.value)}
        />

        <textarea
          value={reason}
          placeholder="Reason"
          className="border p-2 w-full mb-3"
          onChange={(e) => setReason(e.target.value)}
        />

        <button
          onClick={handleApplyLeave}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit Leave
        </button>

      </div>

    </div>

  );

};

export default ApplyLeave;
