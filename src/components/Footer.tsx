import { Link } from 'react-router-dom';
import { Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-serif text-lg mb-4">About This Project</h3>
            <p className="text-sm leading-relaxed mb-4">
              Preserving and sharing the rich history of Thoralby and Bishopdale
              for future generations. Explore centuries of stories, people, and
              places that shaped our community.
            </p>
            <Link
              to="/about"
              className="text-sage-400 hover:text-sage-300 text-sm font-medium transition-colors"
            >
              Learn more &rarr;
            </Link>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/people" className="hover:text-white transition-colors">
                  People & Families
                </Link>
              </li>
              <li>
                <Link to="/buildings" className="hover:text-white transition-colors">
                  Buildings & Places
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-white transition-colors">
                  Historical Timeline
                </Link>
              </li>
              <li>
                <Link to="/photos" className="hover:text-white transition-colors">
                  Photo Archive
                </Link>
              </li>
              <li>
                <Link to="/maps" className="hover:text-white transition-colors">
                  Maps & Geography
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="hover:text-white transition-colors">
                  Contribute Your Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-lg mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-sage-400" />
                <span>Thoralby, Bishopdale<br />North Yorkshire, England</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-sage-400" />
                <a
                  href="mailto:info@thoralbythroughtime.net"
                  className="hover:text-white transition-colors"
                >
                  info@thoralbythroughtime.net
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-stone-400">
            &copy; {currentYear} Thoralby Through Time. All rights reserved.
          </p>
          <p className="text-sm text-stone-400 flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-sage-500 fill-current" />
            <span>for our community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
