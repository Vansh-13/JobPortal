import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Application from '../Application';
import { Pen } from 'lucide-react';
import { useSelector } from 'react-redux';
import api from '../../utils/api.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const { user } = useSelector((store) => store.auth);

  const isRecruiter = user?.role?.toLowerCase() === 'recruiter' || user?.role?.toLowerCase() === 'admin';

  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
  });

  const [profileData, setProfileData] = useState({
    bio: '',
    skills: '',
    company: '',
    resumeOriginalName: '',
    resume: '',
  });

  const [resumeFile, setResumeFile] = useState(null);

  const [addressData, setAddressData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [editUserInfo, setEditUserInfo] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [showApplications, setShowApplications] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/user/me');
        const userData = data.user;

        setUserInfo({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          role: userData.role || '',
        });

        setProfileData({
          bio: userData.profile?.bio || '',
          skills: userData.profile?.skills || '',
          company: userData.profile?.company || '',
          resumeOriginalName: userData.profile?.resumeOriginalName || '',
          resume: userData.profile?.resume || '',
        });

        setAddressData({
          addressLine1: userData.address?.addressLine1 || '',
          addressLine2: userData.address?.addressLine2 || '',
          city: userData.address?.city || '',
          state: userData.address?.state || '',
          postalCode: userData.address?.postalCode || '',
          country: userData.address?.country || '',
        });
      } catch (error) {
        console.error("Error fetching /user/me:", error);
        toast.error("Failed to fetch user profile");
      }
    };

    fetchUser();
  }, [user]);

  const handleInputChange = (e, setter) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveUserInfo = async () => {
    try {
      await api.post('/user/update', userInfo);
      toast.success("User info saved.");
      setEditUserInfo(false);
    } catch (err) {
      toast.error("Failed to save user info.");
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('bio', profileData.bio);
      formData.append('skills', profileData.skills);
      formData.append('company', profileData.company);
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      await api.post('/user/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile updated successfully.');
      setEditProfile(false);
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  const handleSaveAddress = async () => {
    try {
      await api.post('/user/address/update', addressData);
      toast.success('Address updated successfully.');
      setEditAddress(false);
    } catch (err) {
      toast.error('Failed to update address.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-6 px-4 md:px-8">
        {isRecruiter ? (
          <div className="bg-white border shadow-md rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recruiter Profile</h2>
            <div className="text-sm text-gray-700 space-y-3">
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Phone:</strong> {userInfo.phone}</p>
              <p><strong>Role:</strong> {userInfo.role}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Profile Info</h2>
              <button
                onClick={() => setShowApplications(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Show Applied Jobs
              </button>
            </div>

            {/* User Info */}
            <div className="bg-white border shadow-md rounded-xl p-6 md:p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">User Info</h2>
                  <p className="text-sm text-gray-500">Personal details</p>
                </div>
                <button
                  onClick={() => setEditUserInfo(!editUserInfo)}
                  className="text-blue-600 border border-blue-500 px-4 py-1.5 text-sm rounded-md flex items-center gap-1 hover:bg-blue-50"
                >
                  <Pen size={14} /> Edit
                </button>
              </div>

              {editUserInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(userInfo).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-sm font-medium capitalize">{key}</label>
                      <input
                        name={key}
                        value={value}
                        onChange={(e) => handleInputChange(e, setUserInfo)}
                        className="w-full border rounded-md p-2 text-sm"
                      />
                    </div>
                  ))}
                  <div className="col-span-full text-right">
                    <button
                      onClick={handleSaveUserInfo}
                      className="bg-blue-600 text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                      Save Info
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                  <p><strong>Email:</strong> {userInfo.email}</p>
                  <p><strong>Phone:</strong> {userInfo.phone}</p>
                  <p><strong>Role:</strong> {userInfo.role}</p>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="bg-white border shadow-md rounded-xl p-6 md:p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
                  <p className="text-sm text-gray-500">Professional details</p>
                </div>
                <button
                  onClick={() => setEditProfile(!editProfile)}
                  className="text-green-600 border border-green-500 px-4 py-1.5 text-sm rounded-md flex items-center gap-1 hover:bg-green-50"
                >
                  <Pen size={14} /> Edit
                </button>
              </div>

              {editProfile ? (
                <div className="space-y-5">
                  <input type="text" name="bio" placeholder="Bio" value={profileData.bio} onChange={(e) => handleInputChange(e, setProfileData)} className="w-full border p-2 rounded" />
                  <input type="text" name="skills" placeholder="Skills (comma separated)" value={profileData.skills} onChange={(e) => handleInputChange(e, setProfileData)} className="w-full border p-2 rounded" />
                  <input type="text" name="company" placeholder="Company" value={profileData.company} onChange={(e) => handleInputChange(e, setProfileData)} className="w-full border p-2 rounded" />

                  <label className="text-sm font-medium">Resume / CV</label>
                  <input type="file" accept=".pdf,.doc,.docx,.png" onChange={(e) => setResumeFile(e.target.files[0])} className="w-full mt-1 border rounded-md p-2 text-sm bg-white" />
                  {resumeFile && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected File: <span className="text-green-600 font-medium">{resumeFile.name}</span>
                    </p>
                  )}

                  <div className="text-right">
                    <button onClick={handleSaveProfile} className="bg-green-600 text-white text-sm px-6 py-2 rounded-md hover:bg-green-700">
                      Save Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Bio:</strong> {profileData.bio || 'Not added yet'}</p>
                  <p><strong>Skills:</strong> {profileData.skills || 'Not added yet'}</p>
                  <p><strong>Company:</strong> {profileData.company || 'Not added yet'}</p>
                  {profileData.resumeOriginalName && (
                    <p><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/resumes/${profileData.resume}`} download className="text-green-600 underline">{profileData.resumeOriginalName}</a></p>
                  )}
                </div>
              )}
            </div>

            {/* Address Info */}
            <div className="bg-white border shadow-md rounded-xl p-6 md:p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                  <p className="text-sm text-gray-500">Your location details</p>
                </div>
                <button
                  onClick={() => setEditAddress(!editAddress)}
                  className="text-purple-600 border border-purple-500 px-4 py-1.5 text-sm rounded-md flex items-center gap-1 hover:bg-purple-50"
                >
                  <Pen size={14} /> Edit
                </button>
              </div>

              {editAddress ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(addressData).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-sm font-medium capitalize">{key}</label>
                      <input
                        name={key}
                        value={value}
                        onChange={(e) => handleInputChange(e, setAddressData)}
                        className="w-full border rounded-md p-2 text-sm"
                      />
                    </div>
                  ))}
                  <div className="col-span-full text-right">
                    <button
                      onClick={handleSaveAddress}
                      className="bg-purple-600 text-white text-sm px-6 py-2 rounded-md hover:bg-purple-700"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Address Line 1:</strong> {addressData.addressLine1}</p>
                  <p><strong>Address Line 2:</strong> {addressData.addressLine2}</p>
                  <p><strong>City:</strong> {addressData.city}</p>
                  <p><strong>State:</strong> {addressData.state}</p>
                  <p><strong>Postal Code:</strong> {addressData.postalCode}</p>
                  <p><strong>Country:</strong> {addressData.country}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {showApplications && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl relative">
            <button
              onClick={() => setShowApplications(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Applied Companies</h2>
            <Application />
          </div>
        </div>
      )}
    </>
  );
}
