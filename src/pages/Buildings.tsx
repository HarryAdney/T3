import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { Building2, MapIcon, List } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function Buildings() {
  const [buildings, setBuildings] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBuildings() {
      const { data, error } = await supabase
        .from('buildings')
        .select('*')
        .order('name', { ascending: true });

      if (data && !error) {
        setBuildings(data);
      }
      setLoading(false);
    }

    fetchBuildings();
  }, []);

  const buildingsWithCoords = buildings.filter((b) => b.latitude && b.longitude);
  const center: [number, number] = buildingsWithCoords.length > 0
    ? [parseFloat(buildingsWithCoords[0].latitude), parseFloat(buildingsWithCoords[0].longitude)]
    : [54.2984, -2.0156];

  const statusColors = {
    standing: 'text-green-700 bg-green-100',
    ruins: 'text-amber-700 bg-amber-100',
    demolished: 'text-red-700 bg-red-100',
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Buildings & Places', path: '/buildings' }]} />

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4 md:mb-0">
              Buildings & Places
            </h1>
            <div className="flex space-x-2 bg-white rounded-xl shadow-soft p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  viewMode === 'list'
                    ? 'bg-sage-100 text-sage-900'
                    : 'text-stone-600 hover:bg-parchment-100'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  viewMode === 'map'
                    ? 'bg-sage-100 text-sage-900'
                    : 'text-stone-600 hover:bg-parchment-100'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span>Map</span>
              </button>
            </div>
          </div>
          <p className="text-lg text-stone-600 max-w-3xl">
            Explore the historic buildings and significant places that define the
            architectural heritage of Thoralby and Bishopdale.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : viewMode === 'map' ? (
          <div className="bg-white rounded-2xl shadow-soft p-4 mb-8">
            <div className="h-[600px] rounded-xl overflow-hidden">
              <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {buildingsWithCoords.map((building) => (
                  <Marker
                    key={building.id}
                    position={[parseFloat(building.latitude), parseFloat(building.longitude)]}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-serif font-semibold text-lg mb-1">
                          {building.name}
                        </h3>
                        {building.construction_year && (
                          <p className="text-sm text-stone-600 mb-2">
                            Built: {building.construction_year}
                          </p>
                        )}
                        <Link
                          to={`/buildings/${building.id}`}
                          className="text-sage-700 hover:text-sage-800 text-sm font-medium"
                        >
                          View details &rarr;
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        ) : buildings.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <p className="text-stone-600">No buildings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buildings.map((building) => (
              <Link
                key={building.id}
                to={`/buildings/${building.id}`}
                className="card group"
              >
                {building.thumbnail_url && (
                  <div className="aspect-video overflow-hidden rounded-xl mb-4 sepia-overlay">
                    <img
                      src={building.thumbnail_url}
                      alt={building.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-sage-700 transition-colors flex-1">
                    {building.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      statusColors[building.current_status as keyof typeof statusColors]
                    }`}
                  >
                    {building.current_status}
                  </span>
                </div>
                {building.address && (
                  <p className="text-sm text-stone-500 mb-2">{building.address}</p>
                )}
                {building.construction_year && (
                  <p className="text-sm text-stone-700 font-medium mb-3">
                    Built: {building.construction_year}
                  </p>
                )}
                {building.description && (
                  <p className="text-stone-600 text-sm line-clamp-3">
                    {building.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
