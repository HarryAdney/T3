import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, MapPin, FileEdit, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTownshipsOpen, setIsTownshipsOpen] = useState(false);
  const location = useLocation();
  const { isEditor } = useAuth();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Bishopdale Valley', path: '/bishopdale-valley' },
    {
      name: 'The Four Townships',
      path: '/four-townships',
      dropdown: [
        { name: 'Thoralby', path: '/thoralby' },
        { name: 'Bishopdale', path: '/bishopdale' },
        { name: 'West Burton', path: '/west-burton' },
        { name: 'Newbiggin', path: '/newbiggin' },
      ]
    },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Maps', path: '/maps' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isTownshipActive = () => {
    const townshipPaths = ['/four-townships', '/thoralby', '/bishopdale', '/west-burton', '/newbiggin'];
    return townshipPaths.includes(location.pathname);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center group-hover:bg-sage-700 transition-colors">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-stone-900 leading-none">
                Thoralby Through Time
              </h1>
              <p className="text-xs text-stone-600">Bishopdale, North Yorkshire</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setIsTownshipsOpen(true)}
                    onMouseLeave={() => setIsTownshipsOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        isTownshipActive()
                          ? 'bg-sage-100 text-sage-900'
                          : 'text-stone-700 hover:bg-parchment-100'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    {isTownshipsOpen && (
                      <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-sage-100 text-sage-900'
                                : 'text-stone-700 hover:bg-parchment-100'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-sage-100 text-sage-900'
                      : 'text-stone-700 hover:bg-parchment-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-parchment-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {isEditor && (
              <Link
                to="/pages"
                className="p-2 rounded-lg text-sage-700 hover:bg-sage-100 transition-colors"
                aria-label="Manage Pages"
              >
                <FileEdit className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-parchment-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="pb-4">
            <input
              type="search"
              placeholder="Search people, places, events..."
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              autoFocus
            />
          </div>
        )}

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            {navigation.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.path} className="space-y-1">
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isTownshipActive()
                          ? 'bg-sage-100 text-sage-900'
                          : 'text-stone-700 hover:bg-parchment-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                            isActive(subItem.path)
                              ? 'bg-sage-50 text-sage-900'
                              : 'text-stone-600 hover:bg-parchment-50'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-sage-100 text-sage-900'
                      : 'text-stone-700 hover:bg-parchment-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            {isEditor && (
              <Link
                to="/pages"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-sage-700 bg-sage-50 hover:bg-sage-100"
              >
                <FileEdit className="w-4 h-4" />
                Manage Pages
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
