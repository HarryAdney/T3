import { useState } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Image as ImageIcon, Search, X } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  location: string;
}

const samplePhotos: Photo[] = [
  {
    id: '1',
    title: 'Thoralby Village Green',
    description: 'The historic village green in the heart of Thoralby',
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=600',
    year: 1925,
    location: 'Thoralby',
  },
  {
    id: '2',
    title: 'Bishopdale Valley',
    description: 'View of the valley from the fell tops',
    imageUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=600',
    year: 1930,
    location: 'Bishopdale',
  },
  {
    id: '3',
    title: 'Historic Church',
    description: 'St Mary the Virgin Church',
    imageUrl: 'https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&cs=tinysrgb&w=600',
    year: 1910,
    location: 'West Burton',
  },
];

export function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhotos = samplePhotos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Photo Archive', path: '/gallery' }]} />

        <div className="mb-8">
          <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">
            Photo Archive
          </h1>
          <p className="text-lg text-stone-600">
            Browse our collection of historical photographs from Thoralby and surrounding areas
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search photos by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 transition-shadow"
            />
          </div>
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-stone-300" />
            <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
              No photos found
            </h3>
            <p className="text-stone-600">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform text-left"
              >
                <div className="aspect-[4/3] overflow-hidden sepia-overlay">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-stone-500 mb-2">
                    {photo.year} • {photo.location}
                  </p>
                  <p className="text-sm text-stone-600 line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-2 -right-2 bg-stone-900 text-white rounded-full p-2 hover:bg-stone-800 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-[16/10] overflow-hidden rounded-t-lg sepia-overlay">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  {selectedPhoto.title}
                </h2>
                <p className="text-stone-500 mb-4">
                  {selectedPhoto.year} • {selectedPhoto.location}
                </p>
                <p className="text-stone-700">{selectedPhoto.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
