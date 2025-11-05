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
      }
    } catch (err) {
      console.error('Error loading page:', err);
    }
  };

  const handleSave = async (newData: Data) => {
    setSaveMessage('');

    try {
      const { error } = await (supabase as any)
        .from('puck_pages')
        .upsert({
          slug: 'home',
          title: newData.root.props?.title || 'Custom Page',
          content: JSON.stringify(newData),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setSaveMessage('Page saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err: any) {
      console.error('Error saving page:', err);
      setSaveMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="h-screen">
      {saveMessage && (
        <div className="fixed top-4 right-4 z-50 bg-sage-600 text-white px-6 py-3 rounded-lg shadow-lg">
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
