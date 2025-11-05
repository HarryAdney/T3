import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { Image as ImageIcon, Search, X } from 'lucide-react';

export function Photos() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from('photographs')
        .select('*')
        .order('photo_year', { ascending: false });

      if (data && !error) {
        setPhotos(data);
        setFilteredPhotos(data);
      }
      setLoading(false);
    }

    fetchPhotos();
  }, []);

  useEffect(() => {
    let filtered = photos;

    if (searchTerm) {
      filtered = filtered.filter(
        (photo) =>
          photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          photo.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter((photo) => photo.tags?.includes(selectedTag));
    }

    setFilteredPhotos(filtered);
  }, [searchTerm, selectedTag, photos]);

  const allTags = Array.from(
    new Set(photos.flatMap((photo) => photo.tags || []))
  ).sort();

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Photo Archive', path: '/photos' }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
            Photo Archive
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl">
            Browse our growing collection of historical photographs capturing life,
            landscapes, and events in Thoralby and Bishopdale throughout the years.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="search"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
            >
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <p className="text-stone-600">No photos found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group block text-left"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3 sepia-overlay shadow-soft">
                  <img
                    src={photo.thumbnail_url || photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-base font-medium text-stone-900 mb-1 group-hover:text-sage-700 transition-colors">
                  {photo.title}
                </h3>
                {photo.photo_year && (
                  <p className="text-sm text-stone-500">{photo.photo_year}</p>
                )}
                {photo.tags && photo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {photo.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-parchment-100 text-stone-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {filteredPhotos.length > 0 && (
          <div className="mt-8 text-center text-stone-600">
            Showing {filteredPhotos.length} of {photos.length} photographs
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] overflow-hidden">
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                {selectedPhoto.title}
              </h2>
              {selectedPhoto.photo_year && (
                <p className="text-stone-600 mb-4">{selectedPhoto.photo_year}</p>
              )}
              {selectedPhoto.description && (
                <p className="text-stone-700 mb-4 leading-relaxed">
                  {selectedPhoto.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedPhoto.location && (
                  <div>
                    <span className="text-stone-500">Location:</span>
                    <span className="text-stone-900 ml-2">{selectedPhoto.location}</span>
                  </div>
                )}
                {selectedPhoto.photographer && (
                  <div>
                    <span className="text-stone-500">Photographer:</span>
                    <span className="text-stone-900 ml-2">
                      {selectedPhoto.photographer}
                    </span>
                  </div>
                )}
                {selectedPhoto.contributor && (
                  <div>
                    <span className="text-stone-500">Contributed by:</span>
                    <span className="text-stone-900 ml-2">
                      {selectedPhoto.contributor}
                    </span>
                  </div>
                )}
              </div>
              {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedPhoto.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-parchment-100 text-stone-700 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
