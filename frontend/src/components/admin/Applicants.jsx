// src/pages/Applicants.jsx
import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantTable from './ApplicantTabel';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setApplicants } from '../../redux/applicationsSlice';

function Applicants() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((state) => state.applicant);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token from localStorage
        const res = await axios.get(
          `http://localhost:7000/api/application/${id}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ attach token in Authorization header
            },
          }
        );

        if (res.data.success) {
          dispatch(setApplicants(res.data.applicants));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Applicants ({applicants.length})</h1>
        <ApplicantTable />
      </div>
    </div>
  );
}

export default Applicants;
