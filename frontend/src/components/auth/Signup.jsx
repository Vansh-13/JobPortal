import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import api from '../../utils/api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const changeHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, role, password } = input;

    if (!firstName || !lastName || !email || !phone || !role || !password) {
      toast.error("⚠️ Please fill all the fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("⚠️ Invalid email format.");
      return false;
    }

    if (password.length < 8) {
      toast.error("⚠️ Password must be at least 8 characters.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("⚠️ Phone number must be 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post('/user/register', input);
      toast.success("Registration Successful!");
      navigate("/login");
      setInput({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        password: ""
      });
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("⚠️ Email already exists. Please try another.");
      } else if (error.response?.data?.message) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500";

  const handleGoogleSignup = () => {
    // Fallback to localhost:7000 if env not set
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000';
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center px-4 py-10">
        <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden md:block md:w-1/2 bg-teal-50">
            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              alt="Signup illustration"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Join our platform to find jobs or hire talent.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={input.firstName}
                  onChange={changeHandle}
                  placeholder="First Name"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  onChange={changeHandle}
                  placeholder="Last Name"
                  className={inputClass}
                />
              </div>

              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandle}
                placeholder="Email"
                className={inputClass}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeHandle}
                  placeholder="Password (min 8 characters)"
                  className={inputClass}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-teal-600"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>

              <input
                type="tel"
                name="phone"
                value={input.phone}
                onChange={changeHandle}
                placeholder="Phone Number (10 digits)"
                className={inputClass}
              />

              <select
                name="role"
                value={input.role}
                onChange={changeHandle}
                className={inputClass}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading && <ImSpinner2 className="animate-spin mr-2" size={18} />}
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>

            {/* Google Signup */}
            {input.role === 'user' && (
              <div className="mt-6 text-center">
                <p className="text-gray-500 mb-2">or</p>
                <button
                  onClick={handleGoogleSignup}
                  className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  <FcGoogle size={22} />
                  <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
                </button>
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-teal-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
