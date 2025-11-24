import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { FileText, MapPin, Image, Calendar, LogOut, Users } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';

export function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    } else {
      setUser(user);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-stone-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const sections = [
    {
      icon: MapPin,
      title: 'Townships',
      description: 'Manage township pages and content',
      path: '/admin/townships',
      color: 'sage',
    },
    {
      icon: FileText,
      title: 'Pages',
      description: 'Edit general pages and content',
      path: '/admin/pages',
      color: 'parchment',
    },
    {
      icon: Image,
      title: 'Photographs',
      description: 'Manage photo archive',
      path: '/admin/photographs',
      color: 'sage',
    },
    {
      icon: Calendar,
      title: 'Timeline Events',
      description: 'Add and edit timeline events',
      path: '/admin/events',
      color: 'parchment',
    },
    {
      icon: Users,
      title: 'People',
      description: 'Manage people and families',
      path: '/admin/people',
      color: 'sage',
    },
  ];

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
              Admin Dashboard
            </h1>
            <p className="text-stone-600">
              Welcome back, {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 space-x-2 text-stone-700 transition-colors bg-stone-100 rounded-lg hover:bg-stone-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="flex flex-col p-6 transition-shadow card group hover:shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl bg-${section.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <section.icon className={`w-6 h-6 text-${section.color}-700`} />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-stone-900">
                {section.title}
              </h3>
              <p className="text-stone-600">{section.description}</p>
            </Link>
          ))}
        </div>

        <div className="p-6 mt-8 border rounded-lg bg-sage-50 border-sage-200">
          <h2 className="mb-2 font-serif text-xl font-semibold text-stone-900">
            Content Management System
          </h2>
          <p className="text-stone-700">
            Use the sections above to manage different types of content on the website.
            All changes are saved to the database and will be visible on the public site.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
