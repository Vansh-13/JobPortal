import React from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';

const randomJobs = [1, 2, 3];

function Explore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 font-sans">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight leading-snug">
              Explore Jobs
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Find your next opportunity from top startups & companies
            </p>
          </div>

          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            defaultValue="recent"
          >
            <option value="recent">Sort by: Most Recent</option>
            <option value="salary">Sort by: Salary</option>
            <option value="remote">Sort by: Remote</option>
          </select>
        </div>

        {/* Jobs Grid */}
        {randomJobs.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p>No jobs found. Try changing your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {randomJobs.map((_, index) => (
              <Job key={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Explore;
