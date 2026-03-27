import React, { useState } from "react";

const Login = ({ onLogin }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data && data.id) {
        localStorage.setItem("user", JSON.stringify(data));
        onLogin(data);
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">NexusHR</h1>
        <p className="text-lg opacity-90 mb-6">SaaS Platform for Smart Teams</p>

        <ul className="space-y-2 text-sm opacity-80">
          <li>✔ Manage Employees</li>
          <li>✔ Track Leaves</li>
          <li>✔ Team Analytics</li>
        </ul>
      </div>

      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl w-96">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Login
          </h2>

          <input
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-6 text-gray-500">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Get SaaS Subscription
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;