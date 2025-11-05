import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Render, Data } from '@measured/puck';
import { config } from '../puck.config';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/PageWrapper';

export function PuckPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPageData();
  }, [slug]);

  const loadPageData = async () => {
    try {
      const { data: pageData, error } = await (supabase as any)
        .from('puck_pages')
        .select('*')
        .eq('slug', slug || 'home')
        .maybeSingle();

      if (pageData && !error) {
        setData(JSON.parse(pageData.content));
      }
    } catch (err) {
      console.error('Error loading page:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="inline-block w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </PageWrapper>
    );
  }

  if (!data) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-semibold text-stone-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-stone-600">
              This page hasn't been created yet.
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Render config={config} data={data} />
      </div>
    </PageWrapper>
  );
}
