import { log } from "console";
import React, { useState } from "react";

const ApplyLeave: React.FC = () => {

const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")
const [reason,setReason] = useState("")

const handleApplyLeave = async () => {

const employeeId = Number (localStorage.getItem("id"))
console.log ("EmployeeId:",employeeId)
if(!employeeId) {alert("User not logged in")
    return 
}
const res = await fetch("http://localhost:3001/api/leaves",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
employee_id:employeeId,
from_date:fromDate,
to_date:toDate,
reason:reason
})

})
const data = await res.json ()
alert("Leave applied")

}

return (

<div className="min-h-screen bg-slate-50 p-6">

<h2 className="text-xl font-bold mb-4">
Apply Leave
</h2>

<div className="bg-white rounded-xl shadow p-4 w-96">

<input
type="date"
className="border p-2 w-full mb-3"
onChange={(e)=>setFromDate(e.target.value)}
/>

<input
type="date"
className="border p-2 w-full mb-3"
onChange={(e)=>setToDate(e.target.value)}
/>

<textarea
placeholder="Reason"
className="border p-2 w-full mb-3"
onChange={(e)=>setReason(e.target.value)}
/>

<button
onClick={handleApplyLeave}
className ="bg-blue-600 text-white px-4 py-2 rounded"
>
Submit Leave
</button>

</div>

</div>

)

}

export default ApplyLeave