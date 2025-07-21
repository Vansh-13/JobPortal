import React from 'react';
import { FiSearch } from 'react-icons/fi';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-100 py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Background Aesthetic Blobs */}
      <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-teal-200 rounded-full opacity-30 blur-3xl z-0"></div>
      <div className="absolute bottom-[-100px] left-[-80px] w-96 h-96 bg-cyan-300 rounded-full opacity-20 blur-2xl z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-light text-gray-800 mb-6 leading-tight drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
            Discover Your Dream Job
          </span>
        </h1>

        <p className="text-gray-700 text-base sm:text-lg mb-10 font-light">
          Unlock endless career opportunities that match your skills.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search by title, company, or skill"
            className="w-full sm:w-96 px-6 py-3 rounded-full shadow-md border-none focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/80 backdrop-blur placeholder-gray-500 text-sm"
          />
          <button className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-full hover:scale-105 transition transform duration-200 shadow-md text-sm font-medium">
            <FiSearch size={18} />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
