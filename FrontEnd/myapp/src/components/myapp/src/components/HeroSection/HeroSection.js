import React from "react";
import "./HeroSection.css"; // Assuming you will create a CSS file for styling

function HeroSection() {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Welcome to Our Application</h1>
      <p className="hero-subtitle">Your journey starts here</p>
      <button className="hero-cta-button">Get Started</button>
    </div>
  );
}

export default HeroSection;