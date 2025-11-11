import { useState } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Image as ImageIcon, Calendar, MapPin, Users, Search, Filter } from 'lucide-react';

interface Photograph {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const photographs: Photograph[] = [
  {
    id: '1',
    title: 'Thoralby Village Green',
    year: '1925',
    location: 'Thoralby',
    description: 'A rare view of the village green showing the original layout with stone cottages.',
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['village', 'thoralby', '1920s'],
  },
  {
    id: '2',
    title: 'Hay Making in Bishopdale',
    year: '1938',
    location: 'Bishopdale',
    description: 'Traditional hay making methods with local farmers working the meadows.',
    imageUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['farming', 'bishopdale', '1930s'],
  },
  {
    id: '3',
    title: 'St. Oswald\'s Church',
    year: '1905',
    location: 'Thoralby',
    description: 'The parish church in its original state before the 1920s restoration.',
    imageUrl: 'https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['church', 'thoralby', '1900s'],
  },
  {
    id: '4',
    title: 'West Burton Market Cross',
    year: '1890',
    location: 'West Burton',
    description: 'Early photograph showing the market cross and village green.',
    imageUrl: 'https://images.pexels.com/photos/5255252/pexels-photo-5255252.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['west burton', 'landmark', '1890s'],
  },
  {
    id: '5',
    title: 'School Children',
    year: '1932',
    location: 'Thoralby',
    description: 'Class photograph from Thoralby School with teacher and 24 pupils.',
    imageUrl: 'https://images.pexels.com/photos/8923139/pexels-photo-8923139.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['school', 'children', 'thoralby', '1930s'],
  },
  {
    id: '6',
    title: 'Bishopdale Beck',
    year: '1945',
    location: 'Bishopdale',
    description: 'The beck running through the valley after heavy spring rains.',
    imageUrl: 'https://images.pexels.com/photos/1906385/pexels-photo-1906385.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['landscape', 'bishopdale', '1940s'],
  },
];

export function Photographs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');

  const decades = ['all', '1890s', '1900s', '1920s', '1930s', '1940s'];

  const filteredPhotographs = photographs.filter((photo) => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDecade = selectedDecade === 'all' || photo.tags.includes(selectedDecade);

    return matchesSearch && matchesDecade;
  });

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/5255252/pexels-photo-5255252.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historical photographs"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Photographs
            </h1>
            <p className="text-lg md:text-xl">
              Historical images from 1880s to present day
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Archive', path: '/archive' },
            { label: 'Photographs', path: '/archive/photographs' },
          ]}
        />

        <div className="mb-8">
          <p className="text-lg text-stone-600">
            Our photographic archive contains over 127 images documenting life in Bishopdale
            from the Victorian era to the present day. These precious photographs capture
            everyday moments and special occasions that tell the story of our community.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-stone-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search photographs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-stone-500" />
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="py-3 pl-4 pr-10 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            >
              <option value="all">All Decades</option>
              {decades.filter(d => d !== 'all').map((decade) => (
                <option key={decade} value={decade}>{decade}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-stone-600">
          Showing {filteredPhotographs.length} of {photographs.length} photographs
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPhotographs.map((photo) => (
            <div key={photo.id} className="overflow-hidden transition-shadow cursor-pointer card hover:shadow-lg">
              <div className="mb-4 overflow-hidden rounded-lg -m-6">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">
                {photo.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3 text-sm text-stone-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{photo.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{photo.location}</span>
                </div>
              </div>
              <p className="mb-3 text-sm text-stone-600">
                {photo.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded bg-sage-100 text-sage-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredPhotographs.length === 0 && (
          <div className="py-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-stone-300" />
            <p className="text-lg text-stone-600">No photographs found matching your criteria.</p>
          </div>
        )}

        <div className="p-8 mt-12 text-center rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <Users className="w-12 h-12 mx-auto mb-4 text-sage-600" />
          <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
            Share Your Photographs
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-stone-600">
            Do you have old photographs of Bishopdale? We would love to add them to our collection.
            Digital copies or scans help preserve these precious memories for future generations.
          </p>
          <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700">
            Contact Us
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
