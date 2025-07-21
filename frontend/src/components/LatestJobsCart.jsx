import React from 'react';

function LatestJobsCart({ job }) {
  return (
    <div className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 space-y-4 border border-gray-100">
      {/* Company Info */}
      <div>
        <h3 className="text-gray-700 text-sm font-medium">
          {job.company?.name || job.company || 'Company Name'}
        </h3>
        <p className="text-gray-500 text-xs">
          {job.location || job.company?.location || 'Location not specified'}
        </p>
      </div>

      {/* Role Title & Description */}
      <div>
        <h2 className="text-gray-800 text-base sm:text-lg font-semibold mb-1">
          {job.title || 'Job Title'}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {job.description?.slice(0, 180) || 'No job description available.'}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          {job.positions ? `${job.positions} Position${job.positions > 1 ? 's' : ''}` : 'N/A'}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
          {job.jobType || 'Full-time'}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
          {job.salary || '₹ Not Mentioned'}
        </span>
      </div>
    </div>
  );
}

export default LatestJobsCart;
