import { Link } from 'react-router-dom';
import { Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-stone-900 text-stone-300">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-serif text-lg text-white">About This Project</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Preserving and sharing the rich history of Thoralby and Bishopdale
              for future generations. Explore centuries of stories, people, and
              places that shaped our community.
            </p>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors text-sage-400 hover:text-sage-300"
            >
              Learn more &rarr;
            </Link>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/people" className="transition-colors hover:text-white">
                  People & Families
                </Link>
              </li>
              <li>
                <Link to="/buildings" className="transition-colors hover:text-white">
                  Buildings & Places
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="transition-colors hover:text-white">
                  Historical Timeline
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="transition-colors hover:text-white">
                  Photo Archive
                </Link>
              </li>
              <li>
                <Link to="/maps" className="transition-colors hover:text-white">
                  Maps & Geography
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="transition-colors hover:text-white">
                  Contribute Your Story
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg text-white">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 w-4 h-4 mt-1 text-sage-400" />
                <span>Thoralby, Bishopdale<br />North Yorkshire, England</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="flex-shrink-0 w-4 h-4 text-sage-400" />
                <a
                  href="mailto:info@thoralbythroughtime.net"
                  className="transition-colors hover:text-white"
                >
                  info@thoralbythroughtime.net
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 space-y-4 border-t border-stone-800 sm:flex-row sm:space-y-0">
          <p className="text-sm text-stone-400">
            &copy; {currentYear} Thoralby Through Time. All rights reserved.
          </p>
          <p className="flex items-center space-x-1 text-sm text-stone-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-current text-sage-500" />
            <span>for our community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
