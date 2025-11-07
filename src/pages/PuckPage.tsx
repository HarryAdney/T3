import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Render, Data } from '@measured/puck';
import { config } from '../puck.config';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/PageWrapper';

interface PuckPageProps {
  slug?: string;
}

export function PuckPage({ slug: slugProp }: PuckPageProps = {}) {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = slugProp || slugParam;
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
      } else {
        // Fallback to localStorage if database query fails
        const localData = localStorage.getItem('puck_page_home');
        if (localData) {
          setData(JSON.parse(localData));
        }
      }
    } catch (err) {
      console.error('Error loading page:', err);

      // Fallback to localStorage on any error
      try {
        const localData = localStorage.getItem('puck_page_home');
        if (localData) {
          setData(JSON.parse(localData));
        }
      } catch (localErr) {
        console.error('Error loading from localStorage:', localErr);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="inline-block w-8 h-8 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
        </div>
      </PageWrapper>
    );
  }

  if (!data) {
    return (
      <PageWrapper>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 font-serif text-3xl font-semibold text-stone-900">
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
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Render config={config} data={data} />
      </div>
    </PageWrapper>
  );
}
