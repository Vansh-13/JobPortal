import React from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

const jobArrays = [1, 2, 3, 4, 5, 6, 7, 8];

function Jobs() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              <FilterCard />
            </div>
          </aside>

          {/* Job Listing Grid */}
          <main className="w-full lg:w-3/4">
            {jobArrays.length === 0 ? (
              <div className="flex items-center justify-center h-[60vh] text-gray-400">
                No jobs found.
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {jobArrays.map((_, index) => (
                  <Job key={index} />
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
