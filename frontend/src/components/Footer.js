import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Thoralby Through Time</h3>
            </div>
            <p className="text-sm">
              Preserving and sharing the rich heritage of Thoralby and Bishopdale through stories, photographs, and maps.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About This Project</Link></li>
              <li><Link to="/people" className="hover:text-white transition-colors">People & Families</Link></li>
              <li><Link to="/archive" className="hover:text-white transition-colors">Photo Archive</Link></li>
              <li><Link to="/timeline" className="hover:text-white transition-colors">Timeline</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get Involved</h3>
            <p className="text-sm mb-4">
              Do you have photographs or stories to share? We'd love to hear from you.
            </p>
            <Link 
              to="/contribute" 
              className="inline-block bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors text-sm"
            >
              Contribute Your Story
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Thoralby Through Time. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
