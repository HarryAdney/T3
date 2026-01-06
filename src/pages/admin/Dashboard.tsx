import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { useAuth, useSignOut } from '../../components/auth/ProtectedRoute';
import { FileText, MapPin, Image, Calendar, LogOut, Users, HardDrive, Shield } from 'lucide-react';

interface User {
  id: string;
  email: string;
  user_metadata: {
    role?: string;
  };
}

export function AdminDashboard() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { signOut, loading: signingOut } = useSignOut();
  const [profile, setProfile] = useState<{ role: string } | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 rounded-full border-sage-200 border-t-sage-600 animate-spin" />
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userRole = profile?.role || user.user_metadata?.role || 'editor';
  const userName = user.email?.split('@')[0] || 'User';

  const contentSections = [
    {
      icon: MapPin,
      title: 'Townships',
      description: 'Manage township pages and content',
      path: '/admin/townships',
      color: 'sage',
      requiredRole: 'editor',
    },
    {
      icon: FileText,
      title: 'Pages',
      description: 'Edit general pages and content',
      path: '/admin/pages',
      color: 'parchment',
      requiredRole: 'editor',
    },
    {
      icon: Image,
      title: 'Photographs',
      description: 'Manage photo archive',
      path: '/admin/photographs',
      color: 'sage',
      requiredRole: 'editor',
    },
    {
      icon: Calendar,
      title: 'Timeline Events',
      description: 'Add and edit timeline events',
      path: '/admin/events',
      color: 'parchment',
      requiredRole: 'editor',
    },
    {
      icon: Users,
      title: 'People',
      description: 'Manage people and families',
      path: '/admin/people',
      color: 'sage',
      requiredRole: 'editor',
    },
  ];

  const adminSections = [
    {
      icon: HardDrive,
      title: 'Media Library',
      description: 'Upload and manage media files',
      path: '/admin/media',
      color: 'stone',
      requiredRole: 'admin',
    },
    {
      icon: Shield,
      title: 'User Management',
      description: 'Manage user accounts and roles',
      path: '/admin/users',
      color: 'sage',
      requiredRole: 'admin',
    },
  ];

  const visibleContentSections = contentSections.filter(
    (section) => section.requiredRole === 'editor'
  );

  const visibleAdminSections = adminSections.filter(
    (section) => section.requiredRole === 'admin' && userRole === 'admin'
  );

  const roleBadges: Record<string, { label: string; color: string }> = {
    admin: { label: 'Administrator', color: 'bg-sage-100 text-sage-700' },
    editor: { label: 'Editor', color: 'bg-parchment-200 text-stone-700' },
    viewer: { label: 'Viewer', color: 'bg-stone-100 text-stone-600' },
  };

  const roleBadge = roleBadges[userRole] || roleBadges.editor;

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center space-x-3">
              <p className="text-stone-600">
                Welcome back, <span className="font-medium text-stone-900">{userName}</span>
              </p>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleBadge.color}`}>
                {roleBadge.label}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="flex items-center px-4 py-2 space-x-2 transition-colors rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{signingOut ? 'Signing out...' : 'Log Out'}</span>
          </button>
        </div>

        {/* Content Sections */}
        <div className="mb-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
            Content Management
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleContentSections.map((section) => (
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
        </div>

        {/* Admin Sections (only visible to admins) */}
        {visibleAdminSections.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Administration
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleAdminSections.map((section) => (
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
          </div>
        )}

        {/* Help Section */}
        <div className="p-6 border rounded-lg bg-sage-50 border-sage-200">
          <h2 className="mb-2 font-serif text-xl font-semibold text-stone-900">
            Getting Started
          </h2>
          <p className="mb-4 text-stone-700">
            Use the sections above to manage different types of content on the website.
            All changes are saved to the database and will be visible on the public site.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="mb-2 font-semibold text-stone-900">Editing Content</h3>
              <p className="text-sm text-stone-600">
                Click on any section to view and edit existing content or create new entries.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="mb-2 font-semibold text-stone-900">Saving Changes</h3>
              <p className="text-sm text-stone-600">
                All changes are automatically saved. Use the Save button to confirm updates.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h3 className="mb-2 font-semibold text-stone-900">Need Help?</h3>
              <p className="text-sm text-stone-600">
                Contact the site administrator if you need assistance or have questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
