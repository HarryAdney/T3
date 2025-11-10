import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'People', path: '/people' },
    { name: 'Buildings', path: '/buildings' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Maps', path: '/maps' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Official Records', path: '/official-records' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

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
            {navigation.map((item) => (
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
            ))}
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
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-sage-100 text-sage-900'
                    : 'text-stone-700 hover:bg-parchment-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
