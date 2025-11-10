import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { MapIcon } from 'lucide-react';
import { Database } from '../lib/database.types';

type Map = Database['public']['Tables']['maps']['Row'];

export function Maps() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaps() {
      const { data, error } = await supabase
        .from('maps')
        .select('*')
        .order('map_year', { ascending: false });

      if (data && !error) {
        setMaps(data);
        if (data.length > 0) {
          setSelectedMap(data[0]);
        }
      }
      setLoading(false);
    }

    fetchMaps();
  }, []);

  const mapTypeColors = {
    historical: 'bg-amber-100 text-amber-800',
    modern: 'bg-blue-100 text-blue-800',
    survey: 'bg-green-100 text-green-800',
    sketch: 'bg-purple-100 text-purple-800',
  };

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Maps & Geography', path: '/maps' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl text-stone-900">
            Maps & Geography
          </h1>
          <p className="max-w-3xl text-lg text-stone-600">
            Explore historical and modern maps of Thoralby and Bishopdale. Compare
            how the landscape and settlements have evolved over time.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block w-8 h-8 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
          </div>
        ) : maps.length === 0 ? (
          <div className="py-12 text-center">
            <MapIcon className="w-12 h-12 mx-auto mb-4 text-stone-400" />
            <p className="text-stone-600">No maps available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {selectedMap && (
                <div className="overflow-hidden bg-white rounded-2xl shadow-soft-lg">
                  <div className="aspect-[4/3] bg-stone-100">
                    <img
                      src={selectedMap.map_url}
                      alt={selectedMap.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="mb-2 font-serif text-2xl font-semibold text-stone-900">
                          {selectedMap.title}
                        </h2>
                        {selectedMap.map_year && (
                          <p className="text-stone-600">{selectedMap.map_year}</p>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          mapTypeColors[
                            selectedMap.map_type as keyof typeof mapTypeColors
                          ]
                        }`}
                      >
                        {selectedMap.map_type}
                      </span>
                    </div>
                    {selectedMap.description && (
                      <p className="leading-relaxed text-stone-700">
                        {selectedMap.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                Available Maps
              </h3>
              <div className="space-y-3">
                {maps.map((map) => (
                  <button
                    key={map.id}
                    onClick={() => setSelectedMap(map)}
                    className={`w-full text-left card transition-all ${
                      selectedMap?.id === map.id
                        ? 'ring-2 ring-sage-500'
                        : 'hover:shadow-soft-lg'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {map.thumbnail_url && (
                        <img
                          src={map.thumbnail_url}
                          alt={map.title}
                          className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-1 font-serif font-medium text-stone-900">
                          {map.title}
                        </h4>
                        {map.map_year && (
                          <p className="mb-2 text-sm text-stone-500">
                            {map.map_year}
                          </p>
                        )}
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            mapTypeColors[map.map_type as keyof typeof mapTypeColors]
                          }`}
                        >
                          {map.map_type}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
