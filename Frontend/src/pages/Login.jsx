import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
            username,
            password,
        });

        localStorage.setItem("userId", res.data.userId);
        window.location.href= "/dashboard";
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick="handleLogin">Login</button>
        </div>
    );
}