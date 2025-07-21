import React from 'react';
import { BadgeCheck, Clock } from 'lucide-react';

export default function Application() {
  const applications = [
    { date: '2025-07-10', role: 'Frontend Developer', company: 'Google', status: 'Selected' },
    { date: '2025-07-05', role: 'Backend Engineer', company: 'Amazon', status: 'Pending' },
    { date: '2025-06-25', role: 'Full Stack Intern', company: 'StartupX', status: 'Selected' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Applied Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Job Role</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Company</th>
              <th className="px-4 py-2 text-left text-sm text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{app.date}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{app.role}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{app.company}</td>
                <td className="px-4 py-2 text-sm">
                  {app.status === 'Selected' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-green-700 bg-green-100 rounded-md">
                      <BadgeCheck size={14} />
                      Selected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-yellow-700 bg-yellow-100 rounded-md">
                      <Clock size={14} />
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
