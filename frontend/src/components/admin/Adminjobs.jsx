import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import AdminJobTable from './AdminJobTable.jsx';

function Adminjobs() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
              Company Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Add, update or manage jobs from your dashboard.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/job/new")}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 w-full sm:w-auto"
          >
            + Post New Job
          </button>
        </div>

        {/* Job Table */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <AdminJobTable />
        </div>
      </div>
    </div>
  );
}

export default Adminjobs;
