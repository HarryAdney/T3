import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronDown } from 'lucide-react';

const Header = () => {
  const [townshipsOpen, setTownshipsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gray-600 p-2 rounded">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Thoralby Through Time</h1>
              <p className="text-xs text-gray-600">Bishopdale, North Yorkshire</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link to="/bishopdale-valley" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Bishopdale Valley
            </Link>
            
            {/* Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTownshipsOpen(true)}
              onMouseLeave={() => setTownshipsOpen(false)}
            >
              <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center space-x-1 transition-colors">
                <span>The Four Townships</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {townshipsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                  <Link to="/townships/thoralby" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    Thoralby
                  </Link>
                  <Link to="/townships/newbiggin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    Newbiggin
                  </Link>
                  <Link to="/townships/west-burton" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    West Burton
                  </Link>
                  <Link to="/townships/bishopdale" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    Bishopdale
                  </Link>
                </div>
              )}
            </div>

            <Link to="/people" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              People
            </Link>
            <Link to="/timeline" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Timeline
            </Link>
            <Link to="/archive" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Archive
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
