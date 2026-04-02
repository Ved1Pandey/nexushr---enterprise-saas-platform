import { useEffect, useState } from "react";

const ApproveLeaves = () => {
  const [leaves, setLeaves] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchLeaves = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/leaves/${user.id}/${user.role}`
      );
      const data = await res.json();
      console.log("DATA:", data);
      setLeaves(data);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`http://localhost:3001/api/leaves/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchLeaves(); // refresh
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Approve Leaves</h2>

      {leaves.length === 0 ? (
        <p>No leaves found</p>
      ) : (
        leaves.map((l) => (
          <div key={l.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <p><b>Emp ID:</b> {l.employee_id}</p>
            <p><b>From:</b> {l.from_date}</p>
            <p><b>To:</b> {l.to_date}</p>
            <p><b>Status:</b> {l.status}</p>

            <button onClick={() => updateStatus(l.id, "APPROVED")}>
              Approve
            </button>

            <button onClick={() => updateStatus(l.id, "REJECTED")}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveLeaves;