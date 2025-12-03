import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [townshipsOpen, setTownshipsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setTownshipsOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
            <div className="bg-gray-600 p-2 rounded">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Thoralby Through Time</h1>
              <p className="text-xs text-gray-600">Bishopdale, North Yorkshire</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/bishopdale-valley" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                Bishopdale Valley
              </Link>
              
              {/* Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => setTownshipsOpen(!townshipsOpen)}
                  className="w-full text-left text-gray-700 hover:text-gray-900 font-medium flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span>The Four Townships</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${townshipsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {townshipsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link 
                      to="/townships/thoralby" 
                      className="block text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Thoralby
                    </Link>
                    <Link 
                      to="/townships/newbiggin" 
                      className="block text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Newbiggin
                    </Link>
                    <Link 
                      to="/townships/west-burton" 
                      className="block text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      West Burton
                    </Link>
                    <Link 
                      to="/townships/bishopdale" 
                      className="block text-gray-600 hover:text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Bishopdale
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/people" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                People
              </Link>
              <Link 
                to="/timeline" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                Timeline
              </Link>
              <Link 
                to="/archive" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={closeMobileMenu}
              >
                Archive
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
