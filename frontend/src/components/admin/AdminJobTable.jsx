import React, { useEffect, useState, useRef } from 'react';
import { MoreVertical, Pencil, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAdminJobs, setSearchByText } from '../../redux/jobSlice';

function AdminJobTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.job.allAdminJobs);
  const searchText = useSelector((state) => state.job.searchJobByText);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/job/adminJob', {
          withCredentials: true,
        });

        if (res.data.success && res.data.jobs.length > 0) {
          dispatch(setAllAdminJobs(res.data.jobs));
          setFilteredJobs(res.data.jobs);
        } else {
          dispatch(setAllAdminJobs([]));
          setFilteredJobs([]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
        dispatch(setAllAdminJobs([]));
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch]);

  // Filter jobs by company name
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job?.company?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchText, jobs]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenuId &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId].contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  // Show loading
  if (loading) {
    return <div className="p-6 text-lg font-medium">Loading jobs...</div>;
  }

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by company name..."
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchText}
        onChange={(e) => dispatch(setSearchByText(e.target.value))}
      />

      {/* Jobs Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Position</th>
              <th className="px-6 py-4 font-semibold">Salary</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">Posted On</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{job?.company?.name || "N/A"}</td>
                  <td className="px-6 py-4">{job?.title || "N/A"}</td>
                  <td className="px-6 py-4">₹{job?.salary || "0"}</td>
                  <td className="px-6 py-4">{job?.location || "N/A"}</td>
                  <td className="px-6 py-4">
                    {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 relative">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          setOpenMenuId((prev) => (prev === job._id ? null : job._id))
                        }
                        className="p-2 hover:bg-gray-200 rounded-full"
                        title="Options"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === job._id && (
                        <div
                          ref={(el) => (menuRefs.current[job._id] = el)}
                          className="absolute z-10 mt-10 right-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg animate-fade-in"
                        >
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => navigate(`/admin/job/${job._id}`)}
                          >
                            <Pencil size={16} /> Edit Job
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => navigate(`/admin/job/${job._id}/applicants`)}
                          >
                            <Eye size={16} /> View Applicants
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-6 py-10 text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminJobTable;
