import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { API } from '../../utils/api.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice.js';
import { ImSpinner2 } from 'react-icons/im'; // Spinner Icon

function Login() {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const changeHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { email, password, role } = input;
    if (!email || !password || !role) {
      toast.error("Please fill all the fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${API}/login`, input);
      toast.success("Login Successful!");
      dispatch(setUser(response.data.user));
      navigate("/");
      setInput({ email: "", password: "", role: "" });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center px-4 py-12">
        <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="hidden md:block md:w-1/2 bg-teal-50">
            <img src="https://illustrations.popsy.co/gray/remote-work.svg" alt="Login illustration" className="object-cover w-full h-full" />
          </div>
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
            <p className="text-sm text-gray-500 mb-6">Login to your account to continue.</p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input type="email" name="email" value={input.email} onChange={changeHandle} placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="password" name="password" value={input.password} onChange={changeHandle} placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <select name="role" value={input.role} onChange={changeHandle} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
              </select>
              <button type="submit" className="w-full py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition">Login</button>
            </form>
            {loading && (
              <div className="flex justify-center mt-4">
                <ImSpinner2 className="animate-spin text-teal-600" size={24} />
              </div>
            )}
            <p className="mt-4 text-sm text-gray-500">
              Don’t have an account? <a href="/signup" className="text-teal-600 hover:underline">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
