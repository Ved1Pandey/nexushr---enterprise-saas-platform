import React, {useState}from "react";
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
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
const [role, setRole] = useState("");
const [status, setStatus] = useState("Active");
    const handleAddEmployee = async () => {
  try {
    await fetch("http://localhost:3001/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        role,
        status,
      }),
    });
  
    setShowForm(false);
    setName("");
    setRole("");
    setStatus("Active");
    
    window.location.reload();
  } catch (err) {
    console.error("Add failed", err);
  }
};const handleDelete = async (id: number) => {
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
<div className="flex justify-between items-center mb-3">
  <h2 className="text-lg font-semibold">Employees</h2>
  <button
  onClick={() => setShowForm(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
>
  + Add Employee
</button>
</div>
  {showForm && (
  <div className="mb-4 p-4 border rounded bg-gray-50 space-y-3">
    <input
  type="text"
  placeholder="Employee Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border p-2 w-full rounded"
/>
<input
  type="text"
  placeholder="Role"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="border p-2 w-full rounded"
/>
<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="border p-2 w-full rounded"
>
  <option value="Active">Active</option>
  <option value="On Leave">On Leave</option>
  <option value="Inactive">Inactive</option>
</select>

<button
  onClick={handleAddEmployee}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Save Employee
</button>
</div>
  )}
      <table className="w-full border">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>
        <tbody>
{employees.map((emp) => (
  <tr key={emp.id}>
    <td className="p-2">{emp.id}</td>
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