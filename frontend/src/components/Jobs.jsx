import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

function Jobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50 to-white text-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-6 bg-white/90 backdrop-blur border border-gray-100 shadow-sm rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Filters</h3>
              <FilterCard />
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-teal-700">Available Job Listings</h2>
              <p className="text-sm text-gray-500 mt-1">
                Explore roles that match your skills and goals.
              </p>
            </div>

            {allJobs.length === 0 ? (
              <div className="flex items-center justify-center h-[60vh] text-gray-400 text-center">
                No jobs found.
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {allJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
