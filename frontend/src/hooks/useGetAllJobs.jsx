import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '../redux/jobSlice';

function useGetAllJobs() {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/job/getJob", {
          withCredentials: true,
        });

        if (res.data.success) { 
          dispatch(setAllJobs(res.data.jobs));
        } else {
          throw new Error('Failed to fetch jobs');
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch]);

  return { loading, error };
}

export default useGetAllJobs;
