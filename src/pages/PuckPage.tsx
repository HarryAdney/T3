import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Render, Data } from '@measured/puck';
import { config } from '../puck.config';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface PuckPageProps {
  slug?: string;
}

export function PuckPage({ slug: slugProp }: PuckPageProps = {}) {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const slug = slugProp || slugParam;
  const [data, setData] = useState<Data | null>(null);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      setLoading(true);
      setData(null);

      const pageSlug = slug || 'home';

      try {
        const { data: pageData, error } = await (supabase as any)
          .from('puck_pages')
          .select('*')
          .eq('slug', pageSlug)
          .maybeSingle();

        if (pageData && !error) {
          // Supabase returns JSONB as objects, not strings
          const parsedData = typeof pageData.content === 'string'
            ? JSON.parse(pageData.content)
            : pageData.content;
          setData(parsedData);
          setPageTitle(pageData.title || '');
        } else {
          console.error('Error loading page:', error);
        }
      } catch (err) {
        console.error('Error loading page:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [slug]);

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

  const getBreadcrumbPath = () => {
    if (slug === 'bishopdale-valley') return '/bishopdale-valley';
    if (slug === 'four-townships') return '/four-townships';
    if (slug === 'thoralby') return '/thoralby';
    if (slug === 'newbiggin') return '/newbiggin';
    if (slug === 'bishopdale') return '/bishopdale';
    if (slug === 'west-burton') return '/west-burton';
    if (slug === 'home') return '/';
    return `/page/${slug}`;
  };

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {pageTitle && <Breadcrumbs items={[{ label: pageTitle, path: getBreadcrumbPath() }]} />}
        <Render config={config} data={data} />
      </div>
    </PageWrapper>
  );
}
