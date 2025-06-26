import "./App.css";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";

function App() {
  return (
    <>
      <div className="main-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroSection />}></Route>
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
