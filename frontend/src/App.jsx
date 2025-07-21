import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/shared/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Explore from './components/Explore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/profile/Profile';
import JobDescription from './components/JobDescription';
import api from './utils/api';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import Companies from './components/admin/Companies';
import CompanyNew from './components/admin/CompanyNew';

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/browse', element: <Explore /> },
  { path: '/profile', element: <Profile /> },
  { path: '/description/:id', element: <JobDescription /> },
  {
    path:'/admin/company', element:<Companies/>
  },{
    path:'/admin/job',
  },
  {
    path:"/admin/company/new",
    element:<CompanyNew/>
  }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //const res = await api.get('/user/me'); 
        //dispatch(setUser(res.data.user));      
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
