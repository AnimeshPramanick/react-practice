import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="main-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Application</h1>
        <p className="hero-subtitle">Your journey starts here</p>
        <button className="hero-cta-button" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
