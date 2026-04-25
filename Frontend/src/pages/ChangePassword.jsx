import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");

    await axios.put("http://localhost:3000/api/auth/change-password", {
      username,
      newPassword
    });

    alert("Password updated!");
  };

  return (
    <form onSubmit={handleChange}>
      <h2>Change Password</h2>
      <input type="password" onChange={e => setNewPassword(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}