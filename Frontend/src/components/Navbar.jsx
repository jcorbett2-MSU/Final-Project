import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/dashboard">Dashboard |</Link>
      <Link to="/change-password"> Change Password</Link>
      <button onClick={handleLogout} style={{ width: "auto", marginLeft: "10px" }}>
        Logout
      </button>
    </div>
  );
}