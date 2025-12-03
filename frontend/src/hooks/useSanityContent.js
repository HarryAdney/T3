import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';

export function useSanityContent(query, params = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchContent() {
      try {
        setLoading(true);
        const result = await client.fetch(query, params);
        if (!ignore) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          console.error('Sanity fetch error:', err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      ignore = true;
    };
  }, [query, JSON.stringify(params)]);

  return { data, error, loading };
}
