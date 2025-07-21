import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, Linkedin, Github, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10 pb-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <Link to="/" className="flex items-center gap-1 text-lg font-semibold text-white">
              <BriefcaseBusiness className="text-teal-500" size={20} />
              Job<span className="text-teal-500">World</span>
            </Link>
            <p className="text-sm text-gray-400 leading-snug max-w-[220px]">
              Connecting talent with opportunity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">About</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition">Services</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400 transition">Terms</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-2">Services</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Job Posting</li>
              <li>Resume Builder</li>
              <li>Career Advice</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 mt-1">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">
                <Github size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-10 border-t border-gray-800 pt-4 px-2">
        &copy; {new Date().getFullYear()} JobWorld. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
