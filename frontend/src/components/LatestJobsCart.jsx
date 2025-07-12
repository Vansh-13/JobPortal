import React from 'react';

function LatestJobsCart() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
      <div>
        <h3 className="text-gray-700 text-sm">Tata Consultancy Services</h3>
        <p className="text-gray-500 text-xs">Bangalore, India</p>
      </div>

      <div>
        <h2 className="text-gray-800 text-base sm:text-lg mb-1">Frontend Developer (React.js)</h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          We are looking for a skilled frontend developer to join our team. You'll work on modern web applications using React.js, ensuring top-notch performance and user experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">3 Positions</span>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Full-time</span>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">₹18–24 LPA</span>
      </div>
    </div>
  );
}

export default LatestJobsCart;
