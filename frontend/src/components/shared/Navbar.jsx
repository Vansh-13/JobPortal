import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { LogOut, UserCircle2, BriefcaseBusiness, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Avatar = () => (
  <img
    src="https://github.com/shadcn.png"
    alt="user"
    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
  />
);

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <BriefcaseBusiness className="text-teal-600" size={26} />
          Job<span className="text-teal-600">World</span>
        </Link>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          <Menu size={26} className="text-gray-800" />
        </button>

        <div className="hidden md:flex items-center gap-10">
          <nav>
            <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
              <li><Link to="/" className="hover:text-teal-600 transition">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-teal-600 transition">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-teal-600 transition">Explore Roles</Link></li>
            </ul>
          </nav>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-4 py-1.5 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition text-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-1.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition text-sm">
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
                className="bg-white rounded-md shadow-lg p-4 w-56 border border-gray-200 text-sm text-gray-800"
              >
                <div className="mb-3">
                  <p className="font-semibold">
                    Hello, {user?.firstName || user?.name?.split(" ")[0] || 'User'}
                  </p>
                  <p className="text-gray-500 text-xs">Creative professional focused on results.</p>
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <Link to="/profile" className="flex items-center gap-2 hover:text-teal-600 transition">
                    <UserCircle2 size={16} /> Profile
                  </Link>
                  <Link to="/logout" className="flex items-center gap-2 hover:text-red-600 transition">
                    <LogOut size={16} /> Logout
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-white border-t px-4 py-4 shadow-md space-y-3 animate-slideDown">
          <nav>
            <ul className="space-y-3 text-gray-700 text-sm font-medium">
              <li><Link to="/" className="block hover:text-teal-600">Home</Link></li>
              <li><Link to="/jobs" className="block hover:text-teal-600">Jobs</Link></li>
              <li><Link to="/browse" className="block hover:text-teal-600">Explore Roles</Link></li>
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
                <button className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 pt-3 text-sm">
              <Link to="/profile" className="flex items-center gap-2 hover:text-teal-600">
                <UserCircle2 size={18} /> Profile
              </Link>
              <Link to="/logout" className="flex items-center gap-2 hover:text-red-600">
                <LogOut size={18} /> Logout
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
