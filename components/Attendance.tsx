import React, { useEffect, useState } from "react";

interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  status: string;
}

const AttendancePage: React.FC = () => {

  const employeeId = Number(localStorage.getItem("id"));
  const role = localStorage.getItem("role");

  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH ATTENDANCE
  // =========================

  const fetchAttendance = async () => {
    try {

      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/api/attendance/${employeeId}/${role}`
      );

      const data = await res.json();

      setAttendance(data);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // MARK ATTENDANCE
  // =========================

  const markAttendance = async (status: string) => {

    try {

      await fetch("http://localhost:3001/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employee_id: employeeId,
          status: status
        })
      });

      fetchAttendance();

    } catch (err) {
      console.error("Mark error:", err);
    }

  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6">
        Attendance 📅
      </h2>

      {/* ================= MARK BUTTON ================= */}

      {role === "Employee" && (

        <div className="mb-6">

          <button
            onClick={() => markAttendance("PRESENT")}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Mark Present
          </button>

          <button
            onClick={() => markAttendance("ABSENT")}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Mark Absent
          </button>

        </div>

      )}

      {/* ================= TABLE ================= */}

      {loading && <p>Loading...</p>}

      <div className="bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((a) => (

              <tr key={a.id} className="border-t">

                <td className="p-2">{a.date}</td>

                <td className="p-2 font-bold">
                  {a.status === "PRESENT" && (
                    <span className="text-green-600">PRESENT</span>
                  )}
                  {a.status === "ABSENT" && (
                    <span className="text-red-600">ABSENT</span>
                  )}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AttendancePage;
