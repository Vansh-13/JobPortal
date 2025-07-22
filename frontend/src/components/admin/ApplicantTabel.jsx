// src/pages/ApplicantTable.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MoreHorizontal } from 'lucide-react';

function ApplicantTable() {
  const { applicants } = useSelector((state) => state.applicant);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const handleAction = (id, status) => {
    console.log(`Applicant ${id} set to ${status}`);
    // You can make an API call to update applicant status here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={applicant._id} className="hover:bg-gray-50">
              <td className="p-2 border">{applicant.fullName}</td>
              <td className="p-2 border">{applicant.email}</td>
              <td className="p-2 border">{applicant.phone}</td>
              <td className="p-2 border text-right relative">
                <button
                  onClick={() =>
                    setOpenMenuIndex(openMenuIndex === index ? null : index)
                  }
                >
                  <MoreHorizontal className="cursor-pointer" />
                </button>

                {openMenuIndex === index && (
                  <div className="absolute right-2 top-8 bg-white border shadow-md rounded w-32 z-10">
                    <button
                      onClick={() => handleAction(applicant._id, 'Accepted')}
                      className="w-full text-left px-4 py-2 hover:bg-green-100"
                    >
                      ✅ Accept
                    </button>
                    <button
                      onClick={() => handleAction(applicant._id, 'Rejected')}
                      className="w-full text-left px-4 py-2 hover:bg-red-100"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantTable;
