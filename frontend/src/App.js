import React, { useState } from "react";
import "@/App.css";
import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import GestureControlSection from "@/components/GestureControlSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";

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
    <MusicPlayerProvider>
    <div className="App min-h-screen bg-black relative">
      {/* Film grain texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-50"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Hero Section */}
      <Hero onEnter={handleEnter} />
      
      {/* Main Content Sections with stagger animations */}
      <motion.div 
        id="music"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <MusicSection />
      </motion.div>
      
      <motion.div
        id="gesture"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <GestureControlSection />
      </motion.div>

      <motion.div 
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <AboutSection />
      </motion.div>
      
      <motion.div 
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <ProjectsSection />
      </motion.div>
      
      {/* Footer */}
      <Footer />
    </div>
    </MusicPlayerProvider>
  );
}

export default App;
