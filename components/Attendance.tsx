import React, { useEffect, useState } from "react";

interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  check_in: string;
  check_out: string;
}

const AttendancePage: React.FC = () => {

  const employeeId = Number(localStorage.getItem("id"));
  const role = (localStorage.getItem("role") || "").toLowerCase();

  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
const fetchAttendance = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/api/attendance/${employeeId}/${role}`
      );

      const data = await res.json();
      setAttendance(data || []);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= CHECK IN =================
const checkIn = async () => {
    try {
await fetch("http://localhost:3001/api/attendance/checkin", {
  method: "POST",
headers: {
 "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employee_id: employeeId
        })
      });
fetchAttendance();

    } catch (err) {
console.error("Checkin error:", err);
}
};

 // ================= CHECK OUT =================
const checkOut = async () => {
    try {
      await fetch("http://localhost:3001/api/attendance/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          employee_id: employeeId
        })
      });

      fetchAttendance();

    } catch (err) {
      console.error("Checkout error:", err);
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

      {/* ================= BUTTON ================= */}
{/* 🔥 EMPLOYEE ONLY */}
{!role.includes("manager") && !role.includes("lead") && (
        <div className="mb-6">

          <button
            onClick={checkIn}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Check In
          </button>

          <button
            onClick={checkOut}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Check Out
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
              <th className="p-2">Check In</th>
              <th className="p-2">Check Out</th>
            </tr>
          </thead>

          <tbody>

            {attendance.length > 0 ? (
              attendance.map((a) => (

                <tr key={a.id} className="border-t">

                  <td className="p-2">{a.date}</td>

                  <td className="p-2 text-green-600">
                    {a.check_in
                      ? new Date(a.check_in).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td className="p-2 text-blue-600">
                    {a.check_out
                      ? new Date(a.check_out).toLocaleTimeString()
                      : "-"}
                  </td>

                </tr>

              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  No attendance data
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AttendancePage;
