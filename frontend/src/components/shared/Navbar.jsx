import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@radix-ui/react-popover';
import {
  LogOut,
  UserCircle2,
  BriefcaseBusiness,
  Menu,
  Building2,
  LayoutDashboard
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setUser } from '../../redux/authSlice';

const Avatar = () => (
  <img
    src="https://github.com/shadcn.png"
    alt="user"
    className="w-10 h-10 rounded-full border border-gray-300 shadow-md hover:shadow-lg transition"
  />
);

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        'http://localhost:7000/api/user/logout',
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success('Logged out successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error('Logout failed!');
    }
  };

  // Normalize role
  const role = user?.role?.toLowerCase().trim().replace(/\s+/g, '');
  const isRecruiter = role === 'recruiter' || role === 'admin';

  // Debug log
  console.log("User Role:", role);
  console.log("Is Recruiter:", isRecruiter);

  const linksForUser = [
    { label: 'Home', to: '/' },
    { label: 'Jobs', to: '/jobs' },
    { label: 'Explore Roles', to: '/browse' }
  ];

  const linksForRecruiter = [
    { label: 'Companies / Campaigns', to: '/admin/company', icon: Building2 },
    { label: 'Jobs Dashboard', to: '/admin/job', icon: LayoutDashboard }
  ];

  const renderLinks = (links) =>
    links.map(({ label, to, icon: Icon }) => (
      <li key={label}>
        <Link to={to} className="flex items-center gap-2 hover:text-teal-600 transition">
          {Icon && <Icon size={16} />} {label}
        </Link>
      </li>
    ));

  return (
    <header className="bg-white/60 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900">
          <BriefcaseBusiness className="text-teal-600" size={26} />
          Job<span className="text-teal-600 font-light">World</span>
        </Link>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          <Menu size={26} className="text-gray-800" />
        </button>

        <div className="hidden md:flex items-center gap-10">
          <nav>
            <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
              {renderLinks(isRecruiter ? linksForRecruiter : linksForUser)}
            </ul>
          </nav>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-4 py-1.5 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 hover:shadow-sm transition text-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-md hover:opacity-90 hover:shadow-md transition text-sm">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <Avatar />
              </PopoverTrigger>
              <PopoverContent
                sideOffset={8}
                className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl p-4 w-64 rounded-xl text-sm"
              >
                <div className="mb-3">
                  <p className="font-semibold text-gray-800">
                    Hello, {user?.firstName || user?.name?.split(" ")[0] || 'User'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {isRecruiter ? 'Managing talent & campaigns' : 'Creative professional focused on results.'}
                  </p>
                </div>
                <div className="flex flex-col gap-3 pt-2 text-sm text-gray-700">
                  <Link to="/profile" className="flex items-center gap-2 hover:text-teal-600 transition">
                    <UserCircle2 size={16} /> Profile
                  </Link>
                  <button onClick={logoutHandler} className="flex items-center gap-2 hover:text-red-600 transition">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-white border-t px-4 py-4 shadow-md animate-slideDown space-y-4">
          <nav>
            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              {renderLinks(isRecruiter ? linksForRecruiter : linksForUser)}
            </ul>
          </nav>

          {!user ? (
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/login">
                <button className="w-full py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-md hover:opacity-90 transition">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 pt-3 text-sm">
              <Link to="/profile" className="flex items-center gap-2 hover:text-teal-600">
                <UserCircle2 size={18} /> Profile
              </Link>
              <button onClick={logoutHandler} className="flex items-center gap-2 hover:text-red-600">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
