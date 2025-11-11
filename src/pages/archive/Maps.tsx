import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Map, Calendar, Layers, ZoomIn } from 'lucide-react';

interface MapItem {
  id: string;
  title: string;
  year: string;
  scale: string;
  description: string;
  features: string[];
  imageUrl: string;
}

const maps: MapItem[] = [
  {
    id: '1',
    title: 'Ordnance Survey Map',
    year: '1893',
    scale: '1:10,560 (6 inches to 1 mile)',
    description: 'Detailed OS map showing field boundaries, buildings, roads, and topographical features at the height of agricultural prosperity.',
    features: ['Field boundaries', 'All buildings marked', 'Footpaths and tracks', 'Contour lines', 'Parish boundaries'],
    imageUrl: 'https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    title: 'Tithe Map',
    year: '1838',
    scale: 'Approximately 1:4,000',
    description: 'Large-scale survey conducted for tithe commutation, showing every plot of land with reference numbers linked to the apportionment schedule.',
    features: ['Plot numbers', 'Land ownership', 'Land use', 'Detailed field shapes', 'Building footprints'],
    imageUrl: 'https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    title: 'Enclosure Map',
    year: '1815',
    scale: 'Variable',
    description: 'Map accompanying the Enclosure Award, showing the division of common lands and allocation of new allotments.',
    features: ['New allotments', 'Old enclosures', 'Common land areas', 'Roads and lanes', 'Watercourses'],
    imageUrl: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    title: 'Ordnance Survey Map',
    year: '1955',
    scale: '1:25,000',
    description: 'Mid-20th century OS map showing changes in land use and infrastructure following World War II.',
    features: ['Modern roads', 'Electricity lines', 'Land drainage', 'Post-war development', 'Woodland changes'],
    imageUrl: 'https://images.pexels.com/photos/1275393/pexels-photo-1275393.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const mapCategories = [
  {
    id: 'historical',
    name: 'Historical Maps',
    description: 'Maps from 1800s-1950s showing landscape evolution',
    count: 24,
  },
  {
    id: 'modern',
    name: 'Modern Maps',
    description: 'Contemporary mapping and aerial photography',
    count: 8,
  },
  {
    id: 'thematic',
    name: 'Thematic Maps',
    description: 'Specialized maps showing land use, geology, etc.',
    count: 2,
  },
];

export function Maps() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historical maps"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Maps
            </h1>
            <p className="text-lg md:text-xl">
              Historical and modern maps showing landscape evolution
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Archive', path: '/archive' },
            { label: 'Maps', path: '/archive/maps' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg text-stone-600">
            Our map collection spans over 200 years, from the earliest detailed surveys to modern
            digital mapping. These maps reveal how the landscape, settlement patterns, and land use
            have evolved over time, providing essential context for understanding local history.
          </p>
        </div>

        <div className="grid gap-6 mb-12 md:grid-cols-3">
          {mapCategories.map((category) => (
            <div key={category.id} className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Layers className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">
                {category.name}
              </h3>
              <p className="mb-3 text-sm text-stone-600">
                {category.description}
              </p>
              <p className="text-sm font-medium text-sage-700">
                {category.count} {category.count === 1 ? 'map' : 'maps'}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 font-serif text-3xl font-semibold text-stone-900">
          Featured Historical Maps
        </h2>

        <div className="space-y-8 mb-12">
          {maps.map((map) => (
            <div key={map.id} className="overflow-hidden card">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-lg cursor-pointer group">
                  <img
                    src={map.imageUrl}
                    alt={map.title}
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black/50 opacity-0 group-hover:opacity-100">
                    <ZoomIn className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-sage-600" />
                    <span className="font-semibold text-stone-900">{map.year}</span>
                  </div>
                  <h3 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
                    {map.title}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-stone-500">
                    Scale: {map.scale}
                  </p>
                  <p className="mb-4 text-stone-700">
                    {map.description}
                  </p>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-stone-900">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {map.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-sage-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Map className="w-10 h-10 mb-4 text-sage-600" />
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Comparing Maps
              </h3>
              <p className="mb-4 text-stone-700">
                One of the most fascinating aspects of historical maps is comparing them over time
                to see how the landscape has changed. We can help identify specific locations and
                trace their development through different map editions.
              </p>
            </div>
            <div>
              <Layers className="w-10 h-10 mb-4 text-parchment-600" />
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Understanding Historical Maps
              </h3>
              <p className="mb-4 text-stone-700">
                Historical maps use different symbols, scales, and conventions than modern maps.
                We offer guidance on interpreting these maps and understanding what they reveal
                about past land use and settlement patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
