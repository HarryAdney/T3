import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { Image as ImageIcon, Search, X } from 'lucide-react';
import { Database } from '../lib/database.types';

type Photograph = Database['public']['Tables']['photographs']['Row'];

export function Gallery() {
  const [photos, setPhotos] = useState<Photograph[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photograph[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
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
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Gallery', path: '/gallery' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl text-stone-900">
            Gallery
          </h1>
          <p className="max-w-3xl text-lg text-stone-600">
            Browse our growing collection of historical photographs capturing life,
            landscapes, and events in Thoralby and Bishopdale throughout the years.
          </p>
        </div>

        <div className="p-6 mb-8 bg-white rounded-2xl shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-stone-400" />
              <input
                type="search"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-3 bg-white border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
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
          <div className="py-12 text-center">
            <div className="inline-block w-8 h-8 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="py-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-stone-400" />
            <p className="text-stone-600">No photos found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="block text-left group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3 sepia-overlay shadow-soft">
                  <img
                    src={photo.thumbnail_url || photo.image_url}
                    alt={photo.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-1 font-serif text-base font-medium transition-colors text-stone-900 group-hover:text-sage-700">
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
                        className="px-2 py-1 text-xs rounded bg-parchment-100 text-stone-700"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute p-2 transition-colors rounded-full top-4 right-4 bg-white/10 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="w-full max-w-5xl overflow-hidden bg-white rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] overflow-hidden">
              <img
                src={selectedPhoto.image_url}
                alt={selectedPhoto.title}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="mb-2 font-serif text-2xl font-semibold text-stone-900">
                {selectedPhoto.title}
              </h2>
              {selectedPhoto.photo_year && (
                <p className="mb-4 text-stone-600">{selectedPhoto.photo_year}</p>
              )}
              {selectedPhoto.description && (
                <p className="mb-4 leading-relaxed text-stone-700">
                  {selectedPhoto.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedPhoto.location && (
                  <div>
                    <span className="text-stone-500">Location:</span>
                    <span className="ml-2 text-stone-900">{selectedPhoto.location}</span>
                  </div>
                )}
                {selectedPhoto.photographer && (
                  <div>
                    <span className="text-stone-500">Photographer:</span>
                    <span className="ml-2 text-stone-900">
                      {selectedPhoto.photographer}
                    </span>
                  </div>
                )}
                {selectedPhoto.contributor && (
                  <div>
                    <span className="text-stone-500">Contributed by:</span>
                    <span className="ml-2 text-stone-900">
                      {selectedPhoto.contributor}
                    </span>
                  </div>
                )}
              </div>
              {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedPhoto.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-lg bg-parchment-100 text-stone-700"
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
