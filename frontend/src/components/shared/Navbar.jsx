import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { LogOut, User2, Briefcase, Menu } from 'lucide-react';

const Avatar = () => (
  <img
    src="https://github.com/shadcn.png"
    alt="user"
    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
  />
);

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const user = false;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo + Icon */}
        <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
          <Briefcase className="text-indigo-600" size={26} />
          Job<span className="text-indigo-600">World</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          <Menu size={26} className="text-gray-800" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <nav>
            <ul className="flex items-center gap-6 text-[15px] font-medium text-gray-700">
              <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-indigo-600 transition">Jobs</a></li>
              <li><a href="/browse" className="hover:text-indigo-600 transition">Browse</a></li>
            </ul>
          </nav>

          {/* Auth buttons / Avatar */}
          {!user ? (
            <div className="flex items-center gap-3">
              <button className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">
                Login
              </button>
              <button className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Signup
              </button>
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
                  <p className="font-medium">Hello, User</p>
                  <p className="text-gray-500 text-sm">Creative professional with a focus on results.</p>
                </div>
                <div className="flex flex-col gap-3 text-[14px]">
                  <a href="/profile" className="flex items-center gap-2 hover:text-indigo-600 transition">
                    <User2 size={16} /> Profile
                  </a>
                  <a href="/logout" className="flex items-center gap-2 hover:text-red-600 transition">
                    <LogOut size={16} /> Logout
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t px-4 py-4 shadow-md space-y-3 animate-slideDown">
          <nav>
            <ul className="space-y-3 text-gray-700 text-base font-medium">
              <li><a href="/" className="block hover:text-indigo-600">Home</a></li>
              <li><a href="/jobs" className="block hover:text-indigo-600">Jobs</a></li>
              <li><a href="/browse" className="block hover:text-indigo-600">Browse</a></li>
            </ul>
          </nav>

          {!user ? (
            <div className="flex flex-col gap-3 pt-3">
                <a href='/login'> <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">
                Login
              </button></a>
              <a href='/signup'>
              <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                Signup
              </button></a>
              
            </div>
          ) : (
            <div className="space-y-3 pt-3">
              <a href="/profile" className="flex items-center gap-2 hover:text-indigo-600">
                <User2 size={18} /> Profile
              </a>
              <a href="/logout" className="flex items-center gap-2 hover:text-red-600">
                <LogOut size={18} /> Logout
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
