import React from 'react';
import { FiSearch } from 'react-icons/fi';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-teal-50 via-white to-teal-50 py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Background Gradient Circles for aesthetics */}
      <div className="absolute top-[-100px] right-[-100px] w-72 h-72 bg-teal-100 rounded-full opacity-20 z-0 animate-pulse"></div>
      <div className="absolute bottom-[-120px] left-[-100px] w-96 h-96 bg-teal-200 rounded-full opacity-10 z-0 animate-ping"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Discover Your <span className="text-teal-600">Dream Job</span> Today
        </h1>

        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Find the best opportunities tailored to your skills and ambitions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search by title, company, or skill"
            className="w-full sm:w-96 px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-all text-sm font-semibold shadow-sm">
            <FiSearch size={18} />
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
