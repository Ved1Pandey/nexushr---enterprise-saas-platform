import React, { useEffect, useState } from "react";

const ApproveLeaves = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = (user.role || "").toLowerCase();

  const [leaves, setLeaves] = useState<any[]>([]);

  // 🔥 FETCH LEAVES
  const fetchLeaves = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/leaves/${user.id}/${role}`
      );

      const data = await res.json();

      console.log("LEAVES:", data);

      setLeaves(data || []);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 🔥 APPROVE / REJECT
  const handleStatus = async (id: number, status: string) => {
    try {
      await fetch(`http://localhost:3001/api/leaves/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      fetchLeaves(); // refresh

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <h3>Approve Leaves</h3>

      {leaves.length === 0 && <p>No leaves found</p>}

      {leaves.map((l: any) => (
        <div key={l.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>

          <p><b>{l.employees?.name||"Employee"+l .employee_id }</b></p>
          <p>{l.from_date} → {l.to_date}</p>
          <p>{l.reason}</p>
          <p>Status: {l.status}</p>

          {l.status === "PENDING" && (
            <>
              <button onClick={() => handleStatus(l.id, "APPROVED")}>
                Approve
              </button>

              <button onClick={() => handleStatus(l.id, "REJECTED")}>
                Reject
              </button>
            </>
          )}

        </div>
      ))}

    </div>
  );
};

export default ApproveLeaves;