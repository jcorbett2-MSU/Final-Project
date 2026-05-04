import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const isLoggedIn = localStorage.getItem("userId");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Login />}
        />

        <Route
          path="/change-password"
          element={isLoggedIn ? <ChangePassword /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;