import React from 'react';
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
import WelcomeOverlay from './components/WelcomeOverlay'; // ✅ Add this line

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/browse', element: <Explore /> }
]);

function App() {
  return (
    <>
      {/* ✅ Show welcome screen on load */}
      <WelcomeOverlay />

      {/* ✅ Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Page Routing */}
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
