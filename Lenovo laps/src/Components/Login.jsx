import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/19187761.jpg";

function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });
  const [adminCreds, setAdminCreds] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    !email
      ? "Email is required."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Invalid email.";
  const validatePassword = (pw) =>
    !pw
      ? "Password is required."
      : pw.length < 6
      ? "Password must be at least 6 characters."
      : "";

  const creds = isAdmin ? adminCreds : userCreds;
  const setCreds = isAdmin ? setAdminCreds : setUserCreds;

  const handleChange = ({ target: { name, value } }) => {
    setFormError("");
    setCreds((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "email" ? validateEmail(value) : validatePassword(value),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(creds.email),
      password: validatePassword(creds.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setFormError("");

    try {
      if (isAdmin) {
        // Hardcoded admin check
        if (
          creds.email === "sribalan@gmail.com" &&
          creds.password === "123456"
        ) {
          alert(`Welcome Admin, ${creds.email}`);
          localStorage.setItem("isAdmin", "true");
          navigate("/home");
        } else {
          setFormError("Invalid admin credentials.");
        }
      } else {
        // Login user via backend API
        const response = await axios.post("http://localhost:8080/api/login", creds);

        if (response.status === 200 && response.data === "Login successful") {
          alert(`Welcome, ${creds.email}`);
          localStorage.setItem("isAdmin", "false");
          navigate("/home");
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setFormError("Invalid user email or password.");
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading ||
    !creds.email ||
    !creds.password ||
    errors.email ||
    errors.password;

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-box" role="main" aria-label="Login form">
        <div className="tabs">
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            className={!isAdmin ? "active" : ""}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            className={isAdmin ? "active" : ""}
          >
            Admin Login
          </button>
        </div>

        <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={creds.email}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.email}
            />
          </label>
          {errors.email && <p role="alert">{errors.email}</p>}

          <label>
            Password
            <input
              name="password"
              type="password"
              value={creds.password}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.password}
            />
          </label>
          {errors.password && <p role="alert">{errors.password}</p>}

          {formError && <p role="alert">{formError}</p>}

          <button type="submit" disabled={isDisabled}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {!isAdmin && (
          <p>
            Don’t have an account? <Link to="/register">Register here</Link>.
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
