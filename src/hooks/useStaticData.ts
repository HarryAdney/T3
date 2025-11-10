import { useState, useEffect } from 'react';

interface StaticData {
  people: any[];
  buildings: any[];
  events: any[];
  photographs: any[];
  puckPages: any[];
  generatedAt: string;
}

let cachedStaticData: StaticData | null = null;

export function useStaticData() {
  const [data, setData] = useState<StaticData | null>(cachedStaticData);
  const [loading, setLoading] = useState(!cachedStaticData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (cachedStaticData) {
      return;
    }

    async function loadStaticData() {
      try {
        const response = await fetch('/data/site-data.json');
        if (!response.ok) {
          throw new Error('Failed to load static data');
        }
        const staticData = await response.json();
        cachedStaticData = staticData;
        setData(staticData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadStaticData();
  }, []);

  return { data, loading, error };
}

export async function fetchStaticPageData(slug: string) {
  try {
    const response = await fetch(`/data/page-${slug}.json`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (err) {
    console.error('Error fetching static page data:', err);
    return null;
  }
}
