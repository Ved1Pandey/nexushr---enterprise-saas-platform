import React, { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  leave_balance: number;
}

const MyTeam = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const managerId = user.id;
  const role = (user.role || "").toLowerCase();

  const [team, setTeam] = useState<Employee[]>([]);

  const fetchTeam = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/team/${managerId}/${role}`
      );

      const data = await res.json();

      setTeam(data || []);

    } catch (err) {
      console.error("TEAM ERROR:", err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">

      <h2 className="text-xl font-bold mb-4">
        My Team 👨‍💻
      </h2>

      {team.length === 0 && <p>No team members</p>}

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Leave Balance</th>
          </tr>
        </thead>

        <tbody>

          {team.map((emp) => (
            <tr key={emp.id} className="border-t">

              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.role}</td>
              <td className="p-2">{emp.leave_balance}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default MyTeam;