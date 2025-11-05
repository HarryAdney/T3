import { useState, useEffect } from 'react';
import { Puck, Data } from '@measured/puck';
import { config } from '../puck.config';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';
import { LogOut, User, Shield } from 'lucide-react';
import '@measured/puck/puck.css';

const initialData: Data = {
  content: [
    {
      type: 'Hero',
      props: {
        id: 'hero-1',
        title: 'Welcome to Thoralby Through Time',
        description: 'Discover the rich heritage of Thoralby and Bishopdale through stories, photographs, and maps spanning centuries of Yorkshire Dales history.',
        imageSrc: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg',
      },
    },
  ],
  root: { props: { title: 'Custom Page' } },
};

export function Editor() {
  const { user, profile, loading: authLoading, signOut, isEditor } = useAuth();
  const [data, setData] = useState<Data>(initialData);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (user && isEditor) {
      loadPageData();
    }
  }, [user, isEditor]);

  const loadPageData = async () => {
    try {
      const { data: pageData, error } = await (supabase as any)
        .from('puck_pages')
        .select('*')
        .eq('slug', 'home')
        .maybeSingle();

      if (pageData && !error) {
        setData(JSON.parse(pageData.content));
      } else {
        // Fallback to localStorage
        const localData = localStorage.getItem('puck_page_home');
        if (localData) {
          setData(JSON.parse(localData));
        }
      }
    } catch (err) {
      console.error('Error loading page:', err);

      // Fallback to localStorage
      try {
        const localData = localStorage.getItem('puck_page_home');
        if (localData) {
          setData(JSON.parse(localData));
        }
      } catch (localErr) {
        console.error('Error loading from localStorage:', localErr);
      }
    }
  };

  const handleSave = async (newData: Data) => {
    setSaveMessage('');

    try {
      // Try database save first
      const { error } = await (supabase as any)
        .from('puck_pages')
        .upsert({
          slug: 'home',
          title: newData.root.props?.title || 'Custom Page',
          content: JSON.stringify(newData),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        // If database save fails due to RLS, fallback to localStorage
        console.warn('Database save failed, using localStorage fallback:', error);
        localStorage.setItem('puck_page_home', JSON.stringify(newData));
        setSaveMessage('Page saved locally! (Database permissions need to be updated)');
      } else {
        setSaveMessage('Page saved successfully!');
      }

      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err: any) {
      console.error('Error saving page:', err);

      // Fallback to localStorage
      try {
        localStorage.setItem('puck_page_home', JSON.stringify(newData));
        setSaveMessage('Page saved locally! (Database connection failed)');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (localErr) {
        setSaveMessage(`Error: ${err.message}`);
      }
    }
  };

  if (authLoading) {
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
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
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

  return (
    <div className="relative h-screen">
      <div className="absolute z-50 flex items-center gap-4 px-6 py-3 bg-white border-b shadow-sm top-0 right-0 border-stone-200">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-stone-500" />
          <span className="text-sm font-medium text-stone-700">
            {profile?.email}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded bg-sage-100 text-sage-700">
            {profile?.role}
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
      {saveMessage && (
        <div className="fixed z-50 px-6 py-3 text-white rounded-lg shadow-lg top-20 right-4 bg-sage-600">
          {saveMessage}
        </div>
      )}
      <Puck
        config={config}
        data={data}
        onPublish={handleSave}
        onChange={setData}
      />
    </div>
  );
}
