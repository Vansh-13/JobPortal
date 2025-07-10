import React from 'react';
import Navbar from '../shared/Navbar';

function Login() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-12">
        <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
         
          <div className="hidden md:block md:w-1/2 bg-indigo-100">
            <img
  src="https://illustrations.popsy.co/gray/remote-work.svg"
  alt="Login illustration"
  className="object-cover w-full h-full"
/>

          </div>

          {/* Right Login Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Login to your account to continue.
            </p>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Don’t have an account?{' '}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
