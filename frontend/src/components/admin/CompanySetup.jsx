// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   Building2,
//   PencilLine,
//   MapPin,
//   Image,
//   Globe,
//   ArrowLeft,
// } from 'lucide-react';
// import Navbar from '../shared/Navbar';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function CompanySetup() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [companyData, setCompanyData] = useState({
//     companyName: '',
//     description: '',
//     logo: null,
//     location: '',
//     website: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'logo') {
//       setCompanyData({ ...companyData, logo: files[0] });
//     } else {
//       setCompanyData({ ...companyData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     Object.entries(companyData).forEach(([key, val]) => {
//       if (val) formData.append(key, val);
//     });

//     try {
//       await axios.put(`http://localhost:7000/api/company/update/${id}`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       toast.success('Company updated successfully');
//       navigate('/admin/company');
//     } catch (err) {
//       toast.error('Error updating company');
//       console.error(err);
//     }
//   };
//   const fetchCompany = async () => {
//   try {
//     const res = await axios.get(
//       `http://localhost:7000/api/company/get/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     const { company } = res.data;

//     // Change here: map API response to your state fields
//     setCompanyData({
//       companyName: company.name || "",
//       description: company.description || "",
//       logo: company.logo || null,
//       location: company.location || "",
//       website: company.website || "",
//     });
//   } catch (error) {
//     console.error("Error fetching company", error);
//     toast.error("Something went wrong!");
//   }
// };


//   // const fetchCompany = async () => {
//   //   const token = localStorage.getItem('token');
//   //   try {
//   //     const res = await axios.get(`http://localhost:7000/api/company/get/${id}`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //       withCredentials: true,
//   //     });

//   //     const data = res.data?.company;
//   //     if (!data) throw new Error("Company data not found");

//   //     setCompanyData({
//   //       companyName: data.name || '',
//   //       description: data.description || '',
//   //       logo: data.logo || null,
//   //       location: data.location || '',
//   //       website: data.website || '',
//   //     });
//   //   } catch (err) {
//   //     toast.error('Error fetching company');
//   //     console.error(err);
//   //   }
//   // };

//   useEffect(() => {
//     if (id) fetchCompany();
//   }, [id]);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
//         {/* Left section - Info */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-4">
//             {/* {companyData.logo && typeof companyData.logo === 'string' && (
//               <img
//                 src={companyData.logo}
//                 alt="Company Logo"
//                 className="h-20 w-20 rounded border border-gray-200 object-contain bg-white p-2"
//               />
//             )} */}
//             {companyData.logo && typeof companyData.logo === "string" && (
//   <img
//     src={`http://localhost:7000${companyData.logo}`}
//     alt="Logo"
//     className="h-20 w-20 rounded object-contain border bg-white p-2"
//   />
// )}

//             <div>
//               <h2 className="text-lg font-semibold text-teal-700">
//                 {companyData?.companyName || 'Your Company'}
//               </h2>
//               <p className="text-sm text-gray-500">Admin Dashboard</p>
//             </div>
//           </div>
//           <p className="text-sm text-gray-600 leading-relaxed">
//             Keep your company profile up-to-date to attract better talent. It’s visible on your company page.
//           </p>
//         </div>

//         {/* Right section - Form */}
//         <div className="col-span-2 bg-white rounded-xl shadow-sm p-8 border border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-xl font-semibold text-teal-600">Edit Company</h1>
//             <button
//               onClick={() => navigate('/admin/company/new')}
//               className="flex items-center gap-1 text-sm text-teal-600 hover:underline"
//             >
//               <ArrowLeft size={16} /> Back
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Company Name */}
//             <FormInput
//               icon={<Building2 className="text-teal-600 w-4 h-4" />}
//               label="Company Name"
//               name="companyName"
//               value={companyData.companyName}
//               onChange={handleChange}
//               placeholder="OpenAI Inc."
//               required
//             />

//             {/* Location */}
//             <FormInput
//               icon={<MapPin className="text-teal-600 w-4 h-4" />}
//               label="Location"
//               name="location"
//               value={companyData.location}
//               onChange={handleChange}
//               placeholder="San Francisco, CA"
//               required
//             />

//             {/* Website */}
//             <FormInput
//               icon={<Globe className="text-teal-600 w-4 h-4" />}
//               label="Website"
//               name="website"
//               type="url"
//               value={companyData.website}
//               onChange={handleChange}
//               placeholder="https://yourcompany.com"
//             />

//             {/* Logo */}
//             <FormFileInput
//               icon={<Image className="text-teal-600 w-4 h-4" />}
//               label="Logo"
//               name="logo"
//               onChange={handleChange}
//             />

//             {/* Description */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
//               <div className="flex items-start gap-2 border rounded-md px-3 py-2 bg-white">
//                 <PencilLine className="text-teal-600 w-4 h-4 mt-1" />
//                 <textarea
//                   name="description"
//                   rows="4"
//                   value={companyData.description}
//                   onChange={handleChange}
//                   placeholder="Describe your company culture, values, and vision..."
//                   className="w-full text-sm bg-transparent focus:outline-none resize-none"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="col-span-2">
//               <button
//                 type="submit"
//                 className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable Input Component
// const FormInput = ({ icon, label, name, value, onChange, placeholder, required, type = 'text' }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//     <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
//       {icon}
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="w-full text-sm bg-transparent focus:outline-none"
//       />
//     </div>
//   </div>
// );

// // File Input Component
// const FormFileInput = ({ icon, label, name, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
//     <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
//       {icon}
//       <input
//         type="file"
//         name={name}
//         accept="image/*"
//         onChange={onChange}
//         className="w-full text-sm bg-transparent focus:outline-none"
//       />
//     </div>
//   </div>
// );

// export default CompanySetup;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Building2,
  PencilLine,
  MapPin,
  Image,
  Globe,
  ArrowLeft,
} from 'lucide-react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

function CompanySetup() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [companyData, setCompanyData] = useState({
    companyName: '',
    description: '',
    logo: null,
    location: '',
    website: '',
  });

  const [existingLogo, setExistingLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setCompanyData({ ...companyData, logo: files[0] });
    } else {
      setCompanyData({ ...companyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    Object.entries(companyData).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      await axios.put(
        `http://localhost:7000/api/company/update/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success('Company updated successfully');
      navigate('/admin/company');
    } catch (err) {
      toast.error('Error updating company');
      console.error(err);
    }
  };

  const fetchCompany = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/company/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials:true,
        }
      );

      const { company } = res.data;
      setCompanyData({
        companyName: company.name || '',
        description: company.description || '',
        logo: null,
        location: company.location || '',
        website: company.website || '',
      });
      setExistingLogo(company.logo);
    } catch (error) {
      console.error('Error fetching company', error);
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    if (id) fetchCompany();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left section - Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {existingLogo && typeof existingLogo === 'string' && (
              <img
                src={`http://localhost:7000${existingLogo}`}
                alt="Company Logo"
                className="h-20 w-20 rounded border border-gray-200 object-contain bg-white p-2"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-teal-700">
                {companyData.companyName || 'Your Company'}
              </h2>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Keep your company profile up-to-date to attract better talent.
            It’s visible on your company page.
          </p>
        </div>

        {/* Right section - Form */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-teal-600">Edit Company</h1>
            <button
              onClick={() => navigate('/admin/company')}
              className="flex items-center gap-1 text-sm text-teal-600 hover:underline"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <FormInput
              icon={<Building2 className="text-teal-600 w-4 h-4" />}
              label="Company Name"
              name="companyName"
              value={companyData.companyName}
              onChange={handleChange}
              placeholder="OpenAI Inc."
              required
            />

            {/* Location */}
            <FormInput
              icon={<MapPin className="text-teal-600 w-4 h-4" />}
              label="Location"
              name="location"
              value={companyData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              required
            />

            {/* Website */}
            <FormInput
              icon={<Globe className="text-teal-600 w-4 h-4" />}
              label="Website"
              name="website"
              type="url"
              value={companyData.website}
              onChange={handleChange}
              placeholder="https://yourcompany.com"
            />

            {/* Logo */}
            <FormFileInput
              icon={<Image className="text-teal-600 w-4 h-4" />}
              label="Upload New Logo"
              name="logo"
              onChange={handleChange}
            />

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <div className="flex items-start gap-2 border rounded-md px-3 py-2 bg-white">
                <PencilLine className="text-teal-600 w-4 h-4 mt-1" />
                <textarea
                  name="description"
                  rows="4"
                  value={companyData.description}
                  onChange={handleChange}
                  placeholder="Describe your company culture, values, and vision..."
                  className="w-full text-sm bg-transparent focus:outline-none resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Component
const FormInput = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full text-sm bg-transparent focus:outline-none"
      />
    </div>
  </div>
);

// File Input Component
const FormFileInput = ({ icon, label, name, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
      {icon}
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        className="w-full text-sm bg-transparent focus:outline-none"
      />
    </div>
  </div>
);

export default CompanySetup;
