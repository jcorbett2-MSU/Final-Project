import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields required");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        password
      });

      alert("Account created!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}