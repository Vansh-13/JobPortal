import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from "axios";
import { API } from '../../utils/api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      toast.error("Please fill all the fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(`${API}/register`, input);
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
        toast.error("Email already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500";

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
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Create your account</h2>
            <p className="text-sm text-gray-500 mb-6">Join our platform to find jobs or hire talent.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="firstName" value={input.firstName} onChange={changeHandle} placeholder="First Name" className={inputClass} />
                <input type="text" name="lastName" value={input.lastName} onChange={changeHandle} placeholder="Last Name" className={inputClass} />
              </div>
              <input type="email" name="email" value={input.email} onChange={changeHandle} placeholder="Email" className={inputClass} />
              <input type="password" name="password" value={input.password} onChange={changeHandle} placeholder="Password" className={inputClass} />
              <input type="tel" name="phone" value={input.phone} onChange={changeHandle} placeholder="Phone Number" className={inputClass} />
              <select name="role" value={input.role} onChange={changeHandle} className={inputClass}>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <ImSpinner2 className="animate-spin mr-2" size={18} />
                ) : null}
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-teal-600 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
