import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, ChevronDown } from 'lucide-react';

interface NavItem {
  name: string;
  path?: string;
  children?: { name: string; path: string }[];
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const location = useLocation();

  const navigation: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Bishopdale Valley', path: '/bishopdale-valley' },
    {
      name: 'The Four Townships',
      children: [
        { name: 'Bishopdale', path: '/townships/bishopdale' },
        { name: 'Thoralby', path: '/townships/thoralby' },
        { name: 'Burton-cum-Walden', path: '/townships/burton-cum-walden' },
        { name: 'Newbiggin', path: '/townships/newbiggin' },
      ],
    },
    { name: 'People', path: '/people' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Archive', path: '/archive' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (children?: { name: string; path: string }[]) => {
    if (!children) return false;
    return children.some((child) => location.pathname === child.path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-sage-600 group-hover:bg-sage-700">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold leading-none text-stone-900">
                Thoralby Through Time
              </h1>
              <p className="text-xs text-stone-600">Bishopdale, North Yorkshire</p>
            </div>
          </Link>

          <nav className="items-center hidden space-x-1 md:flex">
            {navigation.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        isDropdownActive(item.children)
                          ? 'bg-sage-100 text-sage-900'
                          : 'text-stone-700 hover:bg-parchment-100'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 w-56 py-2 mt-1 bg-white border shadow-lg top-full rounded-xl border-stone-200">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2 text-sm font-medium transition-colors ${
                              isActive(child.path)
                                ? 'bg-sage-100 text-sage-900'
                                : 'text-stone-700 hover:bg-parchment-100'
                            }`}
                          >
                            {child.name}
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
                  to={item.path!}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path!)
                      ? 'bg-sage-100 text-sage-900'
                      : 'text-stone-700 hover:bg-parchment-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-colors rounded-lg md:hidden text-stone-700 hover:bg-parchment-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="py-4 border-t md:hidden border-stone-200">
            {navigation.map((item) => {
              if (item.children) {
                return (
                  <div key={item.name} className="mb-1">
                    <button
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isDropdownActive(item.children)
                          ? 'bg-sage-100 text-sage-900'
                          : 'text-stone-700 hover:bg-parchment-100'
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isMobileDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isMobileDropdownOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileDropdownOpen(false);
                            }}
                            className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive(child.path)
                                ? 'bg-sage-100 text-sage-900'
                                : 'text-stone-700 hover:bg-parchment-100'
                            }`}
                          >
                            {child.name}
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
                  to={item.path!}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path!)
                      ? 'bg-sage-100 text-sage-900'
                      : 'text-stone-700 hover:bg-parchment-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
