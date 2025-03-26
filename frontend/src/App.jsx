import React from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";


const App = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2f4550] via-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b3505] via-transparent to-transparent opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#efc75e10] to-transparent opacity-70 mix-blend-overlay"></div>
      <SaleTopBar />
      <Navbar />
      <HeroSection />

    </div>
  );
};

export default App;
