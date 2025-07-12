import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Linkedin, Github, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-4 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex flex-row sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 min-w-[650px] sm:min-w-0">

          <div className="space-y-2 min-w-[150px]">
            <Link to="/" className="flex items-center gap-1 text-base font-medium text-white">
              <BriefcaseBusiness className="text-teal-500" size={20} />
              Job<span className="text-teal-500">World</span>
            </Link>
            <p className="text-xs text-gray-400 leading-snug">
              Connecting talent with opportunity.
            </p>
          </div>

          <div className="space-y-2 min-w-[150px]">
            <h4 className="text-white text-sm font-medium">Quick Links</h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-400">About</Link></li>
              <li><Link to="/services" className="hover:text-teal-400">Services</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400">Terms</Link></li>
            </ul>
          </div>

          <div className="space-y-2 min-w-[150px]">
            <h4 className="text-white text-sm font-medium">Services</h4>
            <ul className="space-y-1 text-xs">
              <li className="text-gray-400">Job Posting</li>
              <li className="text-gray-400">Resume Builder</li>
              <li className="text-gray-400">Career Advice</li>
            </ul>
          </div>

          <div className="space-y-2 min-w-[150px]">
            <h4 className="text-white text-sm font-medium">Follow Us</h4>
            <div className="flex space-x-3 mt-1">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400">
                <Github size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6 border-t border-gray-800 pt-3 px-2">
        &copy; {new Date().getFullYear()} JobWorld. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
