import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Puck, Data } from '@measured/puck';
import { config } from '../puck.config';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';
import { Shield } from 'lucide-react';
import '@measured/puck/puck.css';

const initialData: Data = {
  content: [],
  root: { props: { title: 'New Page' } },
};

export function Editor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut, isEditor } = useAuth();
  const [data, setData] = useState<Data>(initialData);
  const [pageTitle, setPageTitle] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPageData = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      const { data: pageData, error } = await (supabase
        .from('puck_pages') as ReturnType<typeof supabase.from>)
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      console.log('Loading page data for slug:', slug);
      console.log('Page data:', pageData);
      console.log('Error:', error);

      if (error) {
        console.error('Database error:', error);
        setSaveMessage(`Error loading page: ${error.message}`);
      } else if (pageData) {
        console.log('Content type:', typeof pageData.content);
        console.log('Content:', pageData.content);

        // Supabase returns JSONB as objects, not strings
        const parsedData = typeof pageData.content === 'string'
          ? JSON.parse(pageData.content)
          : pageData.content;

        console.log('Parsed data:', parsedData);
        setData(parsedData as Data);
        setPageTitle(pageData.title);
      } else {
        console.log('No page data found for slug:', slug);
        setSaveMessage('Page not found in database');
      }
    } catch (err) {
      console.error('Error loading page:', err);
      setSaveMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (user && isEditor && slug) {
      loadPageData();
    } else if (user && isEditor && !slug) {
      setLoading(false);
    }
  }, [user, isEditor, slug, loadPageData]);

  const handleSave = async (newData: Data) => {
    setSaveMessage('');

    if (!slug) {
      setSaveMessage('Error: No page selected');
      return;
    }

    try {
      const { error } = await (supabase
        .from('puck_pages') as ReturnType<typeof supabase.from>)
        .upsert({
          slug,
          title: newData.root.props?.title || pageTitle || 'Untitled Page',
          content: newData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'slug'
        });

      if (error) throw error;
      setSaveMessage('Page saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error('Error saving page:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setSaveMessage(`Error: ${errorMessage}`);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="inline-block w-12 h-12 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!isEditor) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-stone-50 to-sage-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="mb-3 font-serif text-2xl font-bold text-stone-900">
            Access Denied
          </h1>
          <p className="mb-6 text-stone-600">
            You don't have permission to edit site content. Please contact an administrator to request editor access.
          </p>
          <div className="p-4 mb-6 rounded-lg bg-stone-50">
            <p className="text-sm text-stone-700">
              <span className="font-medium">Current role:</span>{' '}
              <span className="px-2 py-1 text-xs font-medium rounded bg-stone-200 text-stone-800">
                {profile?.role || 'viewer'}
              </span>
            </p>
          </div>
          <button
            onClick={signOut}
            className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-stone-50 to-sage-50">
        <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
          <h1 className="mb-3 font-serif text-2xl font-bold text-stone-900">
            No Page Selected
          </h1>
          <p className="mb-6 text-stone-600">
            Please select a page to edit from the page manager.
          </p>
          <button
            onClick={() => navigate('/pages')}
            className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700"
          >
            Go to Page Manager
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {saveMessage && (
        <div className="fixed z-50 px-6 py-3 text-white rounded-lg shadow-lg top-4 right-4 bg-sage-600">
          {saveMessage}
        </div>
      )}
      <Puck
        config={config}
        data={data}
        onPublish={handleSave}
        onChange={setData}
        headerPath="/pages"
      />
    </div>
  );
}
