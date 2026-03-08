import React, { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
  leave_balance: number;
}
const getStatusColor = (status: string) => {
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
const Dashboard: React.FC<any> = 
({ employees, onRefresh, setPage }) => 
{

const userRole = localStorage.getItem("role")

const [showForm, setShowForm] = useState(false)
const [name, setName] = useState("")
const [role, setRole] = useState("")
const [status, setStatus] = useState("Active")
const handleAddEmployee = async () => {

try{

await fetch("http://localhost:3001/api/employees",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
role,
status
})

})

setShowForm(false)
setName("")
setRole("")
setStatus("Active")

}catch(err){

console.error("Add failed",err)

}

}

const handleDelete = async (id:number) => {

try{

await fetch(`http://localhost:3001/api/employees/${id}`,{
method:"DELETE"
})

}catch(err){

console.error("Delete failed",err)

}

}

return (
<div className="min-h-screen bg-slate-50 p-6">
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-bold">
NexusHR Dashboard
</h2>
<div className="flex items-center gap-3">
<span className="font-semibold">
{localStorage.getItem("name")}</span>
<span className="text-sm text-gray-500">{localStorage.getItem("role")}</span>
<button
onClick={()=>{localStorage.clear();window.location.reload();}}
className="bg-red-500 text-white px-3 py-1 rounded">
Logout
</button>
</div>
</div>
{userRole === "MANAGER" && (
<div className="bg-white rounded-xl shadow p-4">
<div className="flex justify-between items-center mb-3">
<h2 className="text-lg font-semibold">Employees</h2>
<button
onClick={()=>setShowForm(true)}className="px-4 py-2 bg-blue-600 text-white rounded-lg"
>
+ Add Employee</button>
<button
onClick={()=>setPage("leaveManagement")}
className="px-4 py-2 bg-purple-600 text-white rounded-lg ml-2"
>
View Leave Requests
</button>
</div>
<table className="w-full border mt-4">

<thead className="bg-slate-100">
<tr>
<th className="text-left p-2">ID</th>
<th className="text-left p-2">Name</th>
<th className="text-left p-2">Role</th>
<th className="text-left p-2">Leave Balance</th>
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
<td className="p-2">{emp.leave_balance}</td>

<td className={`p-2 ${getStatusColor(emp.status)}`}>
{emp.status}
</td>

<td className="p-2">
<button
onClick={()=>handleDelete(emp.id)}
className="bg-red-500 text-white px-2 py-1 rounded"
>
Delete
</button>
</td>

</tr>
))}

</tbody>

</table>
</div>

)}

{userRole === "EMPLOYEE" && (

<div className="bg-white rounded-xl shadow p-4">

<h2 className="text-lg font-semibold mb-3">
Employee Panel
</h2>

<button
onClick={()=>setPage("leave")}
className="px-4 py-2 bg-green-600 text-white rounded-lg"
>
Apply Leave
</button>

</div>

)}


</div>
)
}
export default Dashboard
