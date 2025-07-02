import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import sideImage from "../assets/hpside.avif"; // Update with your actual image path

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-left">
        <div className="welcome-box">
          <h1 className="animated-beat">Welcome to Lenovo's World</h1>
          <p className="subtitle">Redirecting you shortly...</p>
        </div>
      </div>
      <div className="welcome-right">
        <img src={sideImage} alt="Welcome Visual" />
      </div>
    </div>
  );
}

export default Welcome;
