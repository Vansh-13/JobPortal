import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import Latestjobs from './Latestjobs';
import Footer from './shared/Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  useGetAllJobs();
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user); 

  useEffect(() => {
    if (user?.role?.toLowerCase() === 'recruiter') {
      navigate("/admin/company"); 
    }
  }, [user, navigate]); 

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <Latestjobs />
      <Footer />
    </div>
  );
}

export default Home;
