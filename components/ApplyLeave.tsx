import React, { useState } from "react";

const ApplyLeave = () => {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");

  const apply = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!from || !to || !reason) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:3001/api/leaves", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        employee_id: user.id,
        from_date: from,
        to_date: to,
        reason
      })
    });

    alert("Leave applied");
    setFrom(""); setTo(""); setReason("");
  };

  return (
    <div>
      <h3 className="text-xl mb-3">Apply Leave</h3>

      <input type="date" onChange={(e)=>setFrom(e.target.value)} className="border p-2 mr-2"/>
      <input type="date" onChange={(e)=>setTo(e.target.value)} className="border p-2 mr-2"/>
      <input placeholder="Reason" onChange={(e)=>setReason(e.target.value)} className="border p-2 mr-2"/>

      <button onClick={apply} className="bg-blue-500 text-white px-3 py-1">
        Apply
      </button>
    </div>
  );
};

export default ApplyLeave;
