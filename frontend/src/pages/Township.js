import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';

const townshipData = {
  thoralby: {
    name: 'Thoralby',
    description: 'The main village and historical center of Bishopdale',
    population: 'Approximately 150 residents',
    history: 'Thoralby is the largest settlement in Bishopdale and serves as the dale\'s historical center. The village dates back to at least the Domesday Book of 1086. Its name derives from Old Norse, likely meaning "Thor\'s farmstead" or "Thoraldr\'s by", reflecting the area\'s Viking heritage.',
    features: [
      'St. Oswald\'s Church',
      'Traditional stone cottages',
      'Village green',
      'Historic farmsteads',
      'Ancient field systems'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590004987778-bece5c9adab6?w=1200&q=80'
  },
  newbiggin: {
    name: 'Newbiggin',
    description: 'A smaller settlement with its own distinct heritage',
    population: 'Approximately 60 residents',
    history: 'Newbiggin, meaning "new building" in Old English, suggests it was established as a newer settlement compared to nearby Thoralby. Despite its name, the village has medieval origins and was mentioned in 13th-century documents. The hamlet developed around agricultural activities and has maintained its rural character through the centuries.',
    features: [
      'Traditional hay meadows',
      'Stone-built farms',
      'Ancient trackways',
      'Limestone walls',
      'Rural character'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1200&q=80'
  },
  'west-burton': {
    name: 'West Burton',
    description: 'Known for its picturesque village green',
    population: 'Approximately 200 residents',
    history: 'West Burton is perhaps the most photographed village in Bishopdale, famous for its large triangular village green with a market cross at its center. The village has medieval origins and was granted a market charter in the 13th century. The green reflects the village\'s historical role as a local trading center.',
    features: [
      'Large village green',
      'Market cross (1820)',
      'Cauldron Falls',
      'St. Margaret\'s Church',
      'Traditional pubs and shops'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=1200&q=80'
  },
  bishopdale: {
    name: 'Bishopdale Township',
    description: 'The scattered farms and settlements throughout the valley',
    population: 'Approximately 100 residents',
    history: 'The Bishopdale township encompasses the scattered farmsteads and small settlements throughout the upper dale. This area was historically characterized by upland farming, with families living in isolated farms practicing sheep farming and hay making. Many of these farms have been occupied by the same families for generations.',
    features: [
      'Hill farms',
      'Traditional barns',
      'Ancient routes',
      'Upland grazing',
      'Lead mining heritage'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531764644639-04b47ef2d32c?w=1200&q=80'
  }
};

const Township = () => {
  const { name } = useParams();
  const township = townshipData[name];

  if (!township) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Township Not Found</h1>
            <p className="text-gray-600">The township you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div 
          className="relative h-96 bg-cover bg-center rounded-lg overflow-hidden mb-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${township.imageUrl}")`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{township.name}</h1>
              <p className="text-xl">{township.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">History</h2>
                <p className="text-gray-700 leading-relaxed">{township.history}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Notable Features</h2>
                <ul className="space-y-2">
                  {township.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Township Information</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-900">Name</dt>
                    <dd className="text-gray-700">{township.name}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Population</dt>
                    <dd className="text-gray-700">{township.population}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Location</dt>
                    <dd className="text-gray-700">Bishopdale, Yorkshire Dales</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Township;
