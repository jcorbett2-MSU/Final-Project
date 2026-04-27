import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    const username = localStorage.getItem("username");

    await axios.put("http://localhost:3000/api/auth/change-password", {
      username,
      newPassword
    });

    alert("Password updated!");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Change Password</h2>

        <form onSubmit={handleChange}>
          <input type="password" onChange={e => setNewPassword(e.target.value)} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}