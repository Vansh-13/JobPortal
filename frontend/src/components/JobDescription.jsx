import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  MapPin, Briefcase, Clock, IndianRupee, UsersRound, CalendarDays,
  Building2, User, Mail, Phone, FileUp
} from 'lucide-react';
import Navbar from './shared/Navbar';

function JobDescription() {
  const { state } = useLocation();
  const { id } = useParams();

  const [job, setJob] = useState(state?.job || null);
  const [user, setUser] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:7000/api/user/me", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load user profile", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`http://localhost:7000/api/job/${id}`, {
          withCredentials: true,
        });
        setJob(data.job);
      } catch (err) {
        toast.error('Failed to fetch job details.');
        console.error(err);
      }
    };

    if (!job && id) {
      fetchJob();
    }
  }, [job, id]);

  useEffect(() => {
    if (user && job?.application?.length) {
      const userId = user._id || user.id;
      const hasApplied = job.application.some(app => app.applicant === userId);
      setIsApplied(hasApplied);
    }
  }, [user, job]);

  const handleResumeSubmit = async () => {
    const resumeName = selectedResume?.name || user?.profile?.resume;

    if (!resumeName) {
      toast.error("Please upload or select a resume to apply.");
      return;
    }

    try {
      const payload = { resume: resumeName };
      const { data } = await axios.post(
        `http://localhost:7000/api/application/apply/${id}`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Application submitted successfully!");
        setIsApplied(true);
        setJob((prev) => ({
          ...prev,
          application: [...(prev.application || []), { applicant: user._id }],
        }));
        setShowResumeModal(false);
      } else {
        toast.error(data.message || "Application failed.");
      }
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message === "You have already applied for this job") {
        toast.info("You've already applied for this job.");
        setIsApplied(true);
      } else {
        toast.error("Error submitting application.");
      }
      console.error(err);
    }
  };

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-10 text-center text-red-600">
        Job details not found. Please go back and select a job again.
      </div>
    );
  }

  const formattedDate = new Date(job.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 border border-gray-200">
        {/* Company Info */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <img
  src={
    job?.company?.logo?.trim()
      ? `http://localhost:7000${job.company.logo}`
      : 'https://cdn-icons-png.flaticon.com/512/2504/2504799.png'
  }
  alt="Company Logo"
  className="h-16 w-16 rounded-full border p-1 bg-white object-contain"
/>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">{job?.company?.name || 'Company Name'}</h1>
            <p className="text-sm text-gray-500">{job?.company?.website || 'www.example.com'}</p>
          </div>
        </div>

        {/* Job Meta */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{job?.title || 'Job Title'}</h2>
            <p className="text-sm text-gray-600 mt-1 flex flex-wrap gap-4 items-center">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-teal-600" />{job?.location || 'Location'}</span>
              <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4 text-teal-600" />₹{job?.salary || 'Not Mentioned'}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-teal-600" />{job?.jobType || 'Full-Time'}</span>
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs sm:text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Applicants: {job?.application?.length || 0}
            </span>
            <span className="text-xs sm:text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              Posted on: {formattedDate}
            </span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <InfoCard icon={<Briefcase />} label="Job Type" value={job.jobType || 'N/A'} />
          <InfoCard icon={<UsersRound />} label="Applicants" value={`${job.application?.length || 0} Applied`} />
          <InfoCard icon={<CalendarDays />} label="Posted Date" value={formattedDate} />
          <InfoCard icon={<IndianRupee />} label="Salary" value={`₹${job.salary || 'Not Mentioned'}`} />
          <InfoCard icon={<Building2 />} label="Company" value={job?.company?.name || 'N/A'} />
        </div>

        {/* Apply Button or Status */}
        <div className="mb-10">
          {isApplied ? (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-green-200">
               You’ve already applied
            </div>
          ) : (
            <button
              onClick={() => setShowResumeModal(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-md text-sm font-semibold bg-gradient-to-r from-teal-500 to-green-500 text-white hover:from-teal-600 hover:to-green-600 transition-all duration-300"
            >
              Apply Now
            </button>
          )}
        </div>

        {/* Resume Modal */}
        {showResumeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Resume</h3>
              {user && (
                <div className="space-y-3 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal-600" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>{user.phone || 'Not Provided'}</span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <FileUp className="w-4 h-4 text-teal-600" /> Upload Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setSelectedResume(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResumeSubmit}
                  className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Job Description */}
        <div>
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4 text-gray-800">
            Job Description
          </h2>
          <div className="text-gray-700 space-y-4 text-sm leading-relaxed">
            <p>{job?.description || 'No description available.'}</p>
            {Array.isArray(job?.requirements) && job.requirements.length > 0 && (
              <div>
                <strong>Requirements:</strong>
                <ul className="list-disc list-inside mt-2 text-gray-800">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// InfoCard Component
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border shadow-sm">
    <div className="text-teal-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default JobDescription;
