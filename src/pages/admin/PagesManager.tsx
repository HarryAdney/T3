import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { FileText, Edit, Eye, EyeOff, ChevronLeft } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: Record<string, any>;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .order('title');

      if (fetchError) {
        throw fetchError;
      }

      setPages(data || []);
    } catch (err) {
      console.error('Error loading pages:', err);
      setError(err instanceof Error ? err.message : 'Failed to load pages');
    } finally {
      setLoading(false);
    }
  }

  async function togglePublished(page: Page) {
    try {
      const { error: updateError } = await supabase
        .from('pages')
        .update({ published: !page.published })
        .eq('id', page.id);

      if (updateError) {
        throw updateError;
      }

      await loadPages();
    } catch (err) {
      console.error('Error toggling published status:', err);
      alert('Failed to update page status');
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-4 rounded-full border-stone-200 border-t-sage-600 animate-spin"></div>
            <p className="mt-4 text-stone-600">Loading pages...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center mb-4 text-sage-700 hover:text-sage-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
                Pages Manager
              </h1>
              <p className="text-stone-600">
                Manage static pages and their content
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-6 border-l-4 border-red-500 bg-red-50">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="overflow-hidden bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-stone-500">
                  Page
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-stone-500">
                  Slug
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-stone-500">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-stone-500">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right uppercase text-stone-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-stone-500">
                    No pages found
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id} className="transition-colors hover:bg-stone-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-stone-400" />
                        <div>
                          <div className="font-medium text-stone-900">{page.title}</div>
                          {page.meta_description && (
                            <div className="text-sm text-stone-500">
                              {page.meta_description.substring(0, 60)}...
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="px-2 py-1 text-sm rounded bg-stone-100 text-stone-700">
                        /{page.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePublished(page)}
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                          page.published
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {page.published ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-stone-500">
                      {new Date(page.updated_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        to={`/${page.slug}`}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium transition-colors rounded text-sage-700 hover:bg-sage-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        View & Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 mt-8 border rounded-lg bg-sage-50 border-sage-200">
          <h2 className="mb-2 font-serif text-xl font-semibold text-stone-900">
            About Pages Manager
          </h2>
          <p className="mb-4 text-stone-700">
            Use the Pages Manager to control static content across your website. Each page
            has editable content that can be modified directly on the page using inline editors.
          </p>
          <ul className="space-y-2 text-sm text-stone-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Click "View & Edit" to navigate to a page and use inline editing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Toggle the status to publish or unpublish pages</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>All changes are saved automatically to the database</span>
            </li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
}
