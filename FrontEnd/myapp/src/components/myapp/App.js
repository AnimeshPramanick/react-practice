import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./src/components/Home/Home";
import Login from "./src/components/Login/Login";
import Signup from "./src/components/Signup/Signup";
import HeroSection from "./src/components/HeroSection/HeroSection";

function App() {
  return (
    <Router>
      <div>
        <HeroSection />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;