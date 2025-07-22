import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilLine, CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../shared/Navbar';

function CompanyNew() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (!token || !userInfo) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }
  }, [navigate]);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:7000/api/company/register',
        { companyName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success(res.data.message || 'Company created successfully');
        navigate(`/admin/company/${res.data.company._id}`);
      } else {
        toast.error(res?.data?.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to create company');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-inter">
      <Navbar />
      <div className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-2 items-center gap-12">
        
        {/* Left Side - Info Panel */}
        <div className="space-y-6">
          <ShieldCheck className="w-12 h-12 text-teal-600" />
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Let’s create your company profile
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Create your company identity for job listings and applications. This name will appear on all public job postings and dashboards.
          </p>
          <ul className="text-sm text-gray-500 list-disc ml-6 space-y-1">
            <li>Use a unique and professional name</li>
            <li>Only one company allowed per recruiter account</li>
            <li>You can edit additional details later</li>
          </ul>
        </div>

        {/* Right Side - Form Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 border">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Company Registration</h3>

          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-teal-500">
            <PencilLine className="w-5 h-5 text-teal-500 mr-2" />
            <input
              type="text"
              placeholder="e.g., HireVerse, Jobify"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full outline-none text-gray-800"
              disabled={isLoading}
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => navigate('/admin/company')}
              className="flex items-center gap-2 px-5 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              disabled={isLoading}
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={registerNewCompany}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" /> Create Company
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyNew;
