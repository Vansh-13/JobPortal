import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCompanies } from '../redux/companySlice'; 

function useGetAllCompany() {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/Company/get", {
          withCredentials: true,
        });

        if (res.data.success) { 
          dispatch(setCompanies(res.data.companies)); 
        } else {
          throw new Error('Failed to fetch companies');
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, [dispatch]);

  return { loading, error };
}

export default useGetAllCompany;
