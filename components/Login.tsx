import React, { useState } from "react";

const Login = ({ onLogin }: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      // 🔥 IMPORTANT LINE
      onLogin(data);

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">

      <h2 className="text-2xl mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2 mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2 mb-2"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Login
      </button>

    </div>
  );
};

export default Login;
