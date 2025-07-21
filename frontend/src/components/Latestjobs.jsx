import React from 'react';
import LatestJobsCart from './LatestJobsCart';
import { useSelector } from 'react-redux';

function LatestJobs() {
  const allJobs = useSelector((store) => store.job.allJobs); 

  const sortedJobs = [...allJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            <span className="text-teal-600">Latest & Top</span> Job Openings
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Discover handpicked opportunities that align with your career goals.
          </p>
        </div>

        {/* Job Grid */}
        {sortedJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <LatestJobsCart job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default LatestJobs;
