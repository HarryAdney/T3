import { useState, useEffect } from 'react';
import { Puck, Data } from '@measured/puck';
import { config } from '../puck.config';
import { supabase } from '../lib/supabase';
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
  const [data, setData] = useState<Data>(initialData);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadPageData();
  }, []);

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

  return (
    <div className="h-screen">
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
      />
    </div>
  );
}
