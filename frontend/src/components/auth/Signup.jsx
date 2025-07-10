// import React from 'react';
// import Navbar from '../shared/Navbar';

// function Signup() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//           <div className="mb-6 text-center">
//             <h2 className="text-2xl font-semibold text-gray-800">Create an Account</h2>
//             <p className="mt-1 text-sm text-gray-500">Join to explore opportunities or hire talent.</p>
//           </div>

//           <form className="space-y-5">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">First Name</label>
//                 <input
//                   type="text"
//                   className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   placeholder="John"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Last Name</label>
//                 <input
//                   type="text"
//                   className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                   placeholder="Doe"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 placeholder="••••••••"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <input
//                 type="tel"
//                 className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//                 placeholder="+91 9876543210"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Role</label>
//               <select className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
//                 <option value="">Select Role</option>
//                 <option value="user">User</option>
//                 <option value="recruiter">Recruiter</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="mt-6 text-sm text-center text-gray-500">
//             Already have an account?{' '}
//             <a href="/login" className="text-indigo-600 hover:underline">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React from 'react';
import Navbar from '../shared/Navbar';

function Signup() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Image/Illustration */}
          <div className="hidden md:block md:w-1/2 bg-indigo-50">
            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              alt="Signup illustration"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Signup Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Join our platform to find jobs or hire talent.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-field"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="input-field"
              />

              <input
                type="password"
                placeholder="Password"
                className="input-field"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="input-field"
              />

              <select className="input-field">
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="recruiter">Recruiter</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition"
              >
                Signup
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:underline">
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
