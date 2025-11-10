import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MapPin, Church, Home, TreePine } from 'lucide-react';

interface Township {
  id: string;
  name: string;
  icon: typeof MapPin;
  description: string;
  highlights: string[];
  imageUrl: string;
}

const townships: Township[] = [
  {
    id: 'thoralby',
    name: 'Thoralby',
    icon: Church,
    description: 'The largest village in Bishopdale, with St. Oswald\'s Church featuring Norman architecture from the 12th century.',
    highlights: [
      'St. Oswald\'s Church (12th century)',
      'Historic village green',
      'Traditional stone cottages',
      'Active community hub',
    ],
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'newbiggin',
    name: 'Newbiggin',
    icon: Home,
    description: 'A small hamlet with a rich agricultural heritage, nestled in the heart of Bishopdale.',
    highlights: [
      'Traditional farming community',
      'Historic farmsteads',
      'Scenic valley views',
      'Ancient field patterns',
    ],
    imageUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'west-burton',
    name: 'West Burton',
    icon: TreePine,
    description: 'Known for its distinctive village green with a market cross and nearby waterfalls.',
    highlights: [
      'Large village green with market cross',
      'Cauldron Falls',
      'Traditional Dales architecture',
      'Annual feast celebrations',
    ],
    imageUrl: 'https://images.pexels.com/photos/5255252/pexels-photo-5255252.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'walden',
    name: 'Walden',
    icon: MapPin,
    description: 'Remote settlement in Walden Dale, featuring moorland and upland pastures.',
    highlights: [
      'Secluded valley location',
      'Moorland landscapes',
      'Traditional sheep farming',
      'Historic packhorse routes',
    ],
    imageUrl: 'https://images.pexels.com/photos/1906385/pexels-photo-1906385.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function FourTownships() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Yorkshire Dales villages"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              The Four Townships
            </h1>
            <p className="text-lg md:text-xl">
              Exploring Thoralby, Newbiggin, West Burton, and Walden
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'The Four Townships', path: '/four-townships' }]} />

        <div className="mb-12">
          <p className="text-lg text-stone-600">
            Bishopdale is comprised of four distinct townships, each with its own unique character and history.
            Together, they form a tapestry of rural Yorkshire life that has endured for centuries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {townships.map((township) => {
            const Icon = township.icon;
            return (
              <div key={township.id} className="card">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={township.imageUrl}
                    alt={township.name}
                    className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sage-100">
                    <Icon className="w-5 h-5 text-sage-700" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-stone-900">
                    {township.name}
                  </h2>
                </div>

                <p className="mb-4 text-stone-700">
                  {township.description}
                </p>

                <div className="pt-4 border-t border-stone-200">
                  <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-stone-500">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {township.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-sage-600 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 mt-12 text-center rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-sage-600" />
          <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
            Exploring the Townships
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-stone-600">
            Each township has its own stories to tell. Our archive contains photographs, documents, and memories
            from all four communities. Explore their unique histories and discover the connections that bind them together.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
