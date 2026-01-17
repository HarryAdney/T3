import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: Record<string, any>;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface UsePageContentResult {
  page: PageContent | null;
  loading: boolean;
  error: string | null;
  updateContent: (content: Record<string, any>) => Promise<void>;
}

export function usePageContent(slug: string): UsePageContentResult {
  const [page, setPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPage();
  }, [slug]);

  async function loadPage() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (!data) {
        setError('Page not found');
        setPage(null);
      } else {
        setPage(data);
      }
    } catch (err) {
      console.error('Error loading page:', err);
      setError(err instanceof Error ? err.message : 'Failed to load page');
    } finally {
      setLoading(false);
    }
  }

  async function updateContent(content: Record<string, any>) {
    if (!page) return;

    try {
      const { error: updateError } = await supabase
        .from('pages')
        .update({
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', page.id);

      if (updateError) {
        throw updateError;
      }

      setPage({ ...page, content, updated_at: new Date().toISOString() });
    } catch (err) {
      console.error('Error updating page:', err);
      throw err;
    }
  }

  return { page, loading, error, updateContent };
}
