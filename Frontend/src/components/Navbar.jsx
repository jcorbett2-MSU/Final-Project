import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/dashboard">Dashboard</Link> | {" "}
      <Link to="/change-password">Change Password</Link> | {" "}
      <Link to="/">Logout</Link>
    </div>
  );
}