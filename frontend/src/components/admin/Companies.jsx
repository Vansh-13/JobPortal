// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../shared/Navbar';
// import ComapnyTable from './ComapnyTable';
// import { searchCompany } from '../../redux/companySlice';

// function Companies() {
//   const navigate = useNavigate();
// const[search,setSearch]=useState("");
// const dispallce=useDisapta
// useEffect()=>{
//         dispaahc(searchCompany(input))
// },[input];
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Company Management</h1>
//             <p className="text-gray-500 text-sm mt-1">
//               Add, update or manage companies from your dashboard.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/admin/company/new")}
//             className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 w-full sm:w-auto"
//           >
//             + New Company
//           </button>
//         </div>

//         {/* Filter Input */}
//         <div className="mb-6">
//           <input
//             type="text"
//             onChange={(e)=>{
//               setSearch(e.target.value);
//             }}
//             placeholder="Search company by name..."
//             className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
//           />
//         </div>

//         {/* Table Section */}
//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
//           <ComapnyTable />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Companies;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import CompanyTable from './ComapnyTable.jsx';
import { searchCompany } from '../../redux/companySlice';

function Companies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCompany(search));
  }, [search, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Company Management</h1>
            <p className="text-gray-500 text-sm mt-1">
              Add, update or manage companies from your dashboard.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/company/new")}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 w-full sm:w-auto"
          >
            + New Company
          </button>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company by name..."
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <CompanyTable />
        </div>
      </div>
    </div>
  );
}

export default Companies;

