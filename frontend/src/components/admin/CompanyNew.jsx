// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Building2, PencilLine, CheckCircle, XCircle } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Navbar from '../shared/Navbar';

import { RefreshCw } from "lucide-react";

// function CompanyNew() {
//   const navigate = useNavigate();
//   const [companyName, setCompanyName] = useState('');
//   const [user, setUser] = useState(null);

//   // Check user login on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userInfo = localStorage.getItem('user');

//     if (!token || !userInfo) {
//       toast.error('Please login first');
//       return navigate('/login'); // redirect if not logged in
//     }

//     try {
//       setUser(JSON.parse(userInfo));
//     } catch (err) {
//       console.error("Error parsing user info:", err);
//     }
//   }, []);

//   const registerNewCompany = async () => {
//     if (!companyName.trim()) {
//       toast.error('Please enter a company name');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post(
//         "http://localhost:7000/api/company/register",
//         { companyName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res?.data?.success) {
//         toast.success(res.data.message || "Company registered successfully!");
//         const companyId = res?.data?.company?._id;
//         navigate(`/admin/company/${companyId}`);
//       } else {
//         toast.error(res?.data?.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error?.response?.data?.message || "Failed to register company");
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
//         {/* Left Side Panel */}
//         <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
//           <div className="flex items-center space-x-3 text-teal-600">
//             <Building2 className="w-8 h-8" />
//             <h1 className="text-3xl font-bold text-gray-800">Create Your Company</h1>
//           </div>
//           <p className="text-gray-600 text-sm">
//             Start by giving your company a unique name. This name will be displayed on your dashboard, jobs, and listings.
//           </p>
//           <ul className="text-gray-500 text-sm list-disc pl-5 space-y-1">
//             <li>Make sure it's professional and recognizable.</li>
//             <li>You can update it later from settings.</li>
//             <li>Only one company allowed per recruiter profile.</li>
//           </ul>
//         </div>

//         {/* Form Section */}
//         <div className="lg:w-1/2 bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">
//           <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
//             Company Name
//           </label>
//           <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
//             <div className="px-3 text-teal-500">
//               <PencilLine className="w-5 h-5" />
//             </div>
//             <input
//               type="text"
//               id="company"
//               placeholder="e.g., JobHunt, Microsoft, DevSphere"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               className="w-full px-3 py-2 focus:outline-none text-gray-800"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="mt-6 flex justify-end gap-4">
//             <button
//               onClick={() => navigate('/admin/company')}
//               className="flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
//             >
//               <XCircle className="w-4 h-4" />
//               Cancel
//             </button>
//             <button
//               onClick={registerNewCompany}
//               className="flex items-center gap-2 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition"
//             >
//               <CheckCircle className="w-5 h-5" />
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyNew;



