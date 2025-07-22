import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import {
  Briefcase, MapPin, DollarSign, FileText,
  Type, Layers, Users, Shield
} from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const companyList = useSelector((state) => state.company.companies);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    const formattedValue = name === 'salary'
      ? value.replace(/[^0-9]/g, '') // Remove non-numeric for salary
      : value;

    setInput((prev) => ({
      ...prev,
      [name]: name === 'position'
        ? parseInt(formattedValue, 10) || ''
        : formattedValue
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'title', 'description', 'requirements',
      'salary', 'location', 'jobType',
      'experience', 'position', 'companyId'
    ];

    for (const field of requiredFields) {
      if (!input[field]) {
        // toast.warn("⚠ Please fill in the "${field}" field.");
        return false;
      }
    }

    if (isNaN(Number(input.salary))) {
      toast.error("Salary must be a valid number.");
      return false;
    }

    if (isNaN(Number(input.position))) {
      toast.error("Open positions must be a valid number.");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...input,
      company: input.companyId,
      salary: Number(input.salary),
      position: Number(input.position),
      requirements: input.requirements
        .split(',')
        .map(skill => skill.trim())
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:7000/api/job/postJob",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success("Job posted successfully!");
        navigate("/admin/job");
      } else {
        toast.error("Failed to post job. Try again.");
      }
    } catch (err) {
      console.error("Job post error:", err);
      toast.error("Server error. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, icon: Icon, name, type = "text", placeholder }) => (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
        <Icon size={18} className="text-teal-600" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={input[name]}
        onChange={changeHandler}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm placeholder-gray-400"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
          <h1 className="text-4xl font-semibold text-center mb-10 bg-gradient-to-r from-teal-500 via-emerald-400 to-lime-300 text-transparent bg-clip-text tracking-wide drop-shadow-sm">
            Post a New Job
          </h1>

          <form onSubmit={submitHandler} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Job Title" icon={Briefcase} name="title" placeholder="Frontend Developer" />
              <InputField label="Location" icon={MapPin} name="location" placeholder="e.g. Remote, Mumbai" />
              <InputField label="Salary (per month)" icon={DollarSign} name="salary" placeholder="e.g. 60000" />
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  <Type size={18} className="text-teal-600" />
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={input.jobType}
                  onChange={changeHandler}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                >
                  <option value="">-- Select Job Type --</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
              <InputField label="Experience" icon={Shield} name="experience" placeholder="e.g. 2+ years" />
              <InputField label="Open Positions" icon={Users} name="position" type="number" placeholder="e.g. 3" />
              <InputField label="Required Skills" icon={Layers} name="requirements" placeholder="React, Node.js, MongoDB" />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <FileText size={18} className="text-teal-600" />
                Job Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeHandler}
                placeholder="Describe job responsibilities, tech stack, etc..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm resize-none placeholder-gray-400"
              />
            </div>

            {companyList.length > 0 ? (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1">Select Company</label>
                <select
                  name="companyId"
                  value={input.companyId}
                  onChange={changeHandler}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                >
                  <option value="">-- Select Company --</option>
                  {companyList.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-red-500 text-sm font-semibold mt-2">
                ⚠ Please register a company first before posting a job.
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={companyList.length === 0 || loading}
                className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 ease-in-out shadow-lg 
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600'
                  }`}
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;