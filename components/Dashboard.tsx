import React from "react";
import {
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
}const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-600 font-semibold";
    case "On Leave":
      return "text-yellow-600 font-semibold";
    case "Inactive":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
};
const Dashboard: React.FC<{ employees: Employee[] }> = ({ employees }) => {
  const handleDelete = async (id: number) => {
  try {
    await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  } catch (err) {
    console.error("Delete failed", err);
  }
};
  return (
  <div className="min-h-screen bg-slate-50 p-6">
    <h1 className="text-2xl font-bold mb-4">Dashboard Working ✅</h1>
    <p className="mb-6">Total employees: {employees.length}</p>
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Employees</h2>
      <table className="w-full border">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
{employees.map((emp) => (
  <tr key={emp.id}>
    <td className="p-2">{emp.name}</td>
    <td className="p-2">{emp.role}</td>
    <td className={`py-2 ${getStatusColor(emp.status)}`}>
      {emp.status}
    </td>
    <td>
      <button
        onClick={() => handleDelete(emp.id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </td>
  </tr>
))}        </tbody>
      </table>
    </div>
  </div>
);
};
export default Dashboard;