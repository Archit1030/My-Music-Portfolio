import React, { useState } from "react";
import "@/App.css";
import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    // Smooth scroll to music section
    setTimeout(() => {
      const musicSection = document.getElementById('music');
      if (musicSection) {
        musicSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="App min-h-screen bg-black">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Hero Section */}
      <Hero onEnter={handleEnter} />
      
      {/* Main Content Sections */}
      <div id="music">
        <MusicSection />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
