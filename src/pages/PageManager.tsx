import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';
import { PageWrapper } from '../components/PageWrapper';
import { Plus, Edit, Trash2, FileText, Shield, Lock } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface StaticPage {
  slug: string;
  title: string;
  path: string;
}

export function PageManager() {
  const { user, profile, loading: authLoading, isEditor } = useAuth();
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [error, setError] = useState('');

  const staticPages: StaticPage[] = [
    { slug: 'home', title: 'Home', path: '/' },
    { slug: 'bishopdale-valley', title: 'Bishopdale Valley', path: '/bishopdale-valley' },
    { slug: 'four-townships', title: 'The Four Townships', path: '/four-townships' },
    { slug: 'timeline', title: 'Timeline', path: '/timeline' },
    { slug: 'maps', title: 'Maps', path: '/maps' },
    { slug: 'gallery', title: 'Gallery', path: '/gallery' },
    { slug: 'contact', title: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    if (user && isEditor) {
      loadPages();
    }
  }, [user, isEditor]);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from('puck_pages')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (err) {
      console.error('Error loading pages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPageTitle.trim() || !newPageSlug.trim()) {
      setError('Please provide both title and slug');
      return;
    }

    const slug = newPageSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    try {
      const initialContent = {
        content: [],
        root: { props: { title: newPageTitle } },
      };

      const { error } = await supabase
        .from('puck_pages')
        .insert({
          slug,
          title: newPageTitle,
          content: JSON.stringify(initialContent),
        });

      if (error) throw error;

      setShowCreateModal(false);
      setNewPageTitle('');
      setNewPageSlug('');
      loadPages();
      navigate(`/editor/${slug}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create page');
    }
  };

  const handleDeletePage = async (id: string, slug: string) => {
    if (!confirm(`Are you sure you want to delete the page "${slug}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('puck_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadPages();
    } catch (err) {
      console.error('Error deleting page:', err);
      alert('Failed to delete page');
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  if (authLoading || loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="inline-block w-12 h-12 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!isEditor) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="mb-3 font-serif text-2xl font-bold text-stone-900">
              Access Denied
            </h1>
            <p className="text-stone-600">
              You need editor or admin permissions to manage pages.
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
                Page Manager
              </h1>
              <p className="text-stone-600">
                Create and manage custom pages for your site
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5" />
              New Page
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
            Static Pages
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {staticPages.map((page) => (
              <div
                key={page.slug}
                className="overflow-hidden transition-shadow bg-white border shadow-sm rounded-xl border-stone-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl font-semibold text-stone-900">
                      {page.title}
                    </h3>
                    <Lock className="w-4 h-4 text-stone-400" />
                  </div>
                  <p className="mb-4 text-sm text-stone-600">
                    {page.path}
                  </p>
                  <button
                    onClick={() => navigate(page.path)}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-stone-700 border-stone-300 bg-stone-50 hover:bg-stone-100"
                  >
                    View Page
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">
            Custom Pages
          </h2>
        </div>

        {pages.length === 0 ? (
          <div className="py-16 text-center bg-white border-2 border-dashed rounded-2xl border-stone-300">
            <FileText className="w-12 h-12 mx-auto mb-4 text-stone-400" />
            <h3 className="mb-2 font-serif text-xl font-semibold text-stone-900">
              No custom pages yet
            </h3>
            <p className="mb-6 text-stone-600">
              Create your first custom page to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg bg-sage-600 hover:bg-sage-700"
            >
              <Plus className="w-5 h-5" />
              Create Page
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <div
                key={page.id}
                className="overflow-hidden transition-shadow bg-white border shadow-sm rounded-xl border-stone-200 hover:shadow-md"
              >
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-xl font-semibold text-stone-900">
                    {page.title}
                  </h3>
                  <p className="mb-4 text-sm text-stone-600">
                    /page/{page.slug}
                  </p>
                  <p className="mb-4 text-xs text-stone-500">
                    Updated {new Date(page.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/editor/${page.slug}`)}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-sage-700 border-sage-300 bg-sage-50 hover:bg-sage-100"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePage(page.id, page.slug)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-700 transition-colors bg-red-50 border border-red-300 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-stone-900">
              Create New Page
            </h2>
            <form onSubmit={handleCreatePage}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-stone-700">
                  Page Title
                </label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    if (!newPageSlug) {
                      setNewPageSlug(generateSlug(e.target.value));
                    }
                  }}
                  className="w-full px-4 py-2 transition-colors border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500"
                  placeholder="e.g., About Thoralby"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-stone-700">
                  URL Slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-600">/</span>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    className="flex-1 px-4 py-2 transition-colors border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500"
                    placeholder="about-thoralby"
                    pattern="[a-z0-9-]+"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-stone-500">
                  Use only lowercase letters, numbers, and hyphens
                </p>
              </div>
              {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewPageTitle('');
                    setNewPageSlug('');
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 font-medium transition-colors border rounded-lg text-stone-700 border-stone-300 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
