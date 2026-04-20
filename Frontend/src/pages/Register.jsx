import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        await axios.post("http://localhost:3000/api/auth/register", {
            username,
            password,
        });

        alert("User created!");
    };

    return (
        <div>
      <h2>Register</h2>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
    );
}