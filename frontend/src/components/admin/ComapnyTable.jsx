import React, { useState } from 'react';
import { MoreVertical, Pencil } from 'lucide-react';

function CompanyTable() {
  const [showMenu, setShowMenu] = useState(null);

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-md">
      <table className="w-full text-sm text-left">
        <caption className="text-lg font-semibold text-gray-800 my-4 px-4">
          Recently Registered Companies
        </caption>
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Logo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t hover:bg-gray-50 relative">
            <td className="p-3">🌐</td>
            <td className="p-3">OpenAI Inc.</td>
            <td className="p-3">2025-07-18</td>
            <td className="p-3 relative">
              <button
                onClick={() => setShowMenu(showMenu === 1 ? null : 1)}
                className="text-gray-600 hover:text-teal-600"
              >
                <MoreVertical size={18} />
              </button>

              {/* Dropdown Menu */}
              {showMenu === 1 && (
                <div className="absolute top-8 right-3 z-10 bg-white border border-gray-200 rounded shadow-md w-28">
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      // Handle edit action
                      setShowMenu(null);
                    }}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompanyTable;
