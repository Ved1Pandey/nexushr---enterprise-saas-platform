import React, { useEffect, useState } from "react";

const ApproveLeaves: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = (user.role || "").toLowerCase();

  const [leaves, setLeaves] = useState<any[]>([]);

  const fetchLeaves = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/leaves/${user.id}/${role}`
      );
      const data = await res.json();
      setLeaves(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

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
      console.error(err);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Approve Leaves
      </h2>

      {leaves.length === 0 && <p>No leave requests</p>}

      {leaves.map((l) => (
        <div key={l.id} className="border p-3 mb-3 rounded">

          <p><b>{l.employees?.name}</b></p>
          <p>{l.from_date} → {l.to_date}</p>
          <p>{l.reason}</p>

          <p className="font-bold mt-2">{l.status}</p>

          {(role.includes("manager") || role.includes("team")) &&
            l.status === "PENDING" && (
              <div className="mt-2">

                <button
                  onClick={() => handleStatus(l.id, "APPROVED")}
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleStatus(l.id, "REJECTED")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>

              </div>
          )}

        </div>
      ))}

    </div>
  );
};

export default ApproveLeaves;
