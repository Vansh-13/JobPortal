import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import ComapnyTable from './ComapnyTable';

function Companies() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Input + Button Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Filter by name"
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-1/2"
          />
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition duration-200"
            onClick={() => {
              navigate("/admin/company/new");
            }}
          >
            + New Company
          </button>
        </div>

        {/* Title */}
        <div className="mb-6 text-gray-800">
          <h2 className="text-2xl font-bold">Manage Your Companies</h2>
          <p className="text-sm text-gray-600">
            Add, update or remove companies from your admin panel.
          </p>
        </div>

        {/* Table */}
        <ComapnyTable />
      </div>
    </div>
  );
}

export default Companies;
