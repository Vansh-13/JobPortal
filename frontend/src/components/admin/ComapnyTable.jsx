// import React, { useEffect, useState } from 'react';
// import { MoreVertical, Pencil } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import useGetAllCompany from '../../hooks/useGetAllCompany';
// import { searchCompany } from '../../redux/companySlice';

// function CompanyTable() {
//   const [showMenu, setShowMenu] = useState(null);
//   cpst [cpaeis,searchCompany]=usrSeldctor(sore=>store.pay)
//   const { companies } = useSelector((store) => store.company);
//   const { loading, error } = useGetAllCompany();
// cosnt[filter,setfilter]=useState(companies);
// useEffect(()=>{
//       =companies.length>=0 && cpmapies.filter((cpanny)=>{
//         if(searchCompany){
//           return true;

//         }
// return cmpny?.name?.toLowerase().incldes(searchCompany.toLowerCase) // or compnaty name se ilter 
//       })
// },[compies])
//   return (
//     <div className="overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-xl p-4">
//       <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
//         🏢 Recently Registered Companies
//       </h2>

//       <table className="min-w-full text-sm text-left hidden md:table">
//         <thead className="bg-gray-100 text-gray-700 border-b">
//           <tr>
//             <th className="p-4 font-medium">Logo</th>
//             <th className="p-4 font-medium">Name</th>
//             <th className="p-4 font-medium">Date Registered</th>
//             <th className="p-4 font-medium text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody className="text-gray-700">
//           {loading ? (
//             <tr>
//               <td colSpan="4" className="p-6 text-center text-gray-500">Loading...</td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan="4" className="p-6 text-center text-red-500">Failed to load companies.</td>
//             </tr>
//           ) : companies?.length > 0 ? (
//             companies.map((company, index) => (
//               <tr key={company._id || index} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-4">
//                   <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 shadow-sm">
//                     <img
//                       src={`http://localhost:7000${company.logo}` || "/default-logo.png"}
//                       alt={`${company.name} logo`}
//                       className="w-full h-full object-cover"
//                       onError={(e) => (e.target.src = "/default-logo.png")}
//                     />
//                   </div>
//                 </td>
//                 <td className="p-4 font-medium">{company.name}</td>
//                 <td className="p-4">
//                   {new Date(company.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="p-4 text-center relative">
//                   <button
//                     onClick={() => setShowMenu(showMenu === index ? null : index)}
//                     className="text-gray-600 hover:text-teal-600"
//                   >
//                     <MoreVertical size={20} />
//                   </button>

//                   {showMenu === index && (
//                     <div className="absolute top-10 right-8 z-50 bg-white border border-gray-200 rounded-md shadow-md w-36">
//                       <button
//                         onClick={() => {
//                           setShowMenu(null);
//                           // TODO: Add Edit logic
//                         }}
//                         className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                       >
//                         <Pencil size={16} /> Edit
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="p-6 text-center text-gray-500">No companies found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* 📱 Mobile View Cards */}
//       <div className="md:hidden flex flex-col gap-4">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">Failed to load companies.</p>
//         ) : companies?.length > 0 ? (
//           companies.map((company, index) => (
//             <div
//               key={company._id || index}
//               className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm relative"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300">
//                   <img
//                     src={`http://localhost:7000${company.logo}` || "/default-logo.png"}
//                     alt="Logo"
//                     className="w-full h-full object-cover"
//                     onError={(e) => (e.target.src = "/default-logo.png")}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold">{company.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     Registered on: {new Date(company.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowMenu(showMenu === index ? null : index)}
//                   className="text-gray-600 hover:text-teal-600"
//                 >
//                   <MoreVertical size={20} />
//                 </button>
//               </div>

//               {showMenu === index && (
//                 <div className="absolute top-4 right-4 z-50 bg-white border border-gray-200 rounded-md shadow-md w-32 mt-2">
//                   <button
//                     onClick={() => {
//                       setShowMenu(null);
//                       // TODO: Add Edit logic
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                   >
//                     <Pencil size={16} /> Edit
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No companies found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompanyTable;


import React, { useState, useEffect } from 'react';
import { MoreVertical, Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';
import useGetAllCompany from '../../hooks/useGetAllCompany';
import { useNavigate } from 'react-router-dom';

function CompanyTable() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(null);
  const { companies, searchCompany } = useSelector((store) => store.company);
  const { loading, error } = useGetAllCompany();
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const filtered = companies?.filter((company) =>
      company.name?.toLowerCase().includes(searchCompany.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [companies, searchCompany]);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-100 rounded-xl border border-gray-200 shadow-2xl">
     <h2 className="text-3xl font-semibold text-gray-700 text-center mb-8 tracking-wide font-sans">
  <span className="text-blue-600">🏢</span> Company Directory
</h2>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border-collapse rounded-lg shadow">
          <thead>
            <tr className="bg-teal-50 border-b text-gray-800 text-sm uppercase tracking-wider">
              <th className="p-4 text-left">Logo</th>
              <th className="p-4 text-left">Company Name</th>
              <th className="p-4 text-left">Registered</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="4" className="p-6 text-center text-gray-500">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="4" className="p-6 text-center text-red-500">Failed to load companies.</td></tr>
            ) : filteredCompanies?.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <tr key={company._id || index} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 shadow">
                      <img
                        src={`http://localhost:7000${company.logo}` || "/default-logo.png"}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/default-logo.png")}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-800">{company.name}</td>
                  <td className="p-4 text-gray-600">{new Date(company.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-center relative">
                    <button
                      onClick={() => setShowMenu(showMenu === index ? null : index)}
                      className="text-gray-600 hover:text-teal-600 transition"
                      aria-label="Actions"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {showMenu === index && (
                      <div className="absolute top-10 right-8 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-36">
                        <button
                          onClick={() => {
                            setShowMenu(null);
                            navigate(`/admin/company/${company._id}`);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 w-full"
                        >
                          <Pencil size={16} /> Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="p-6 text-center text-gray-500">No companies found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load companies.</p>
        ) : filteredCompanies?.length > 0 ? (
          filteredCompanies.map((company, index) => (
            <div
              key={company._id || index}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-md relative"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={`http://localhost:7000${company.logo}` || "/default-logo.png"}
                    alt="Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/default-logo.png")}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
                  <p className="text-sm text-gray-500">Registered: {new Date(company.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => setShowMenu(showMenu === index ? null : index)}
                  className="text-gray-600 hover:text-teal-600"
                >
                  <MoreVertical size={20} />
                </button>
              </div>
              {showMenu === index && (
                <div className="absolute top-4 right-4 z-50 bg-white border border-gray-200 rounded-md shadow-md w-32 mt-2">
                  <button
                    onClick={() => {
                      setShowMenu(null);
                      navigate(`/admin/company/${company._id}`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 w-full text-left"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyTable;
