import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import bgImage from "../assets/2238239.jpg";

function Register() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!user.email.trim() || !user.email.includes("@")) {
      alert("Please enter a valid email.");
      return false;
    }
    if (user.password.trim().length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const cleanUrl = "http://localhost:8080/api/register".trim(); // prevent %0A error
      const response = await axios.post(cleanUrl, user);

      if (response.data === "User already exists") {
        alert("User already exists. Please login.");
      } else {
        alert("User registered successfully!");
        setUser({ email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "Registration failed.";
      alert("Registration failed:\n" + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
