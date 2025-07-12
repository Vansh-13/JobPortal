import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import Latestjobs from './Latestjobs';
import Footer from './shared/Footer';
import WelcomeOverlay from './WelcomeOverlay';

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <WelcomeOverlay /> 
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <Latestjobs />
      <Footer />
    </div>
  );
}

export default Home;
