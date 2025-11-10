import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">
            Get In Touch
          </h1>
          <p className="text-lg text-stone-600">
            Have questions or want to contribute? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-sage-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Email</h3>
                  <p className="text-stone-600">info@thoralby-history.org</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-sage-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Phone</h3>
                  <p className="text-stone-600">+44 (0) 1234 567890</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-sage-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Location</h3>
                  <p className="text-stone-600">Thoralby, Bishopdale<br />North Yorkshire, England</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sage-600 text-white py-3 rounded-lg font-medium hover:bg-sage-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
