import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const BishopdaleValley = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div 
          className="relative h-96 bg-cover bg-center rounded-lg overflow-hidden mb-12"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Bishopdale Valley</h1>
              <p className="text-xl">A Hidden Gem in the Yorkshire Dales</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Bishopdale</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bishopdale is a dale in the Yorkshire Dales National Park, running roughly north-south between 
                    Wharfedale and Wensleydale. The dale is named after the Bishop of York who had extensive holdings 
                    in the area during medieval times.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The valley is characterized by its traditional stone-built villages, scattered farmsteads, and 
                    stunning limestone landscapes. Bishopdale Beck flows through the valley, eventually joining the 
                    River Ure at Aysgarth.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Despite its beauty and historical significance, Bishopdale remains one of the lesser-known dales, 
                    making it a peaceful destination for those seeking to explore the authentic Yorkshire Dales experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Geography & Landscape</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The dale extends approximately 11 miles from Kidstones Pass in the south to Aysgarth in the north. 
                    The landscape is dominated by traditional hay meadows, limestone walls, and upland grazing pastures.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Key geographical features include Buckden Pike to the east and the moorland of Fleet Moss to the south. 
                    The valley floor sits at around 250 meters above sea level, with surrounding hills rising to over 600 meters.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Historical Significance</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bishopdale has been inhabited since prehistoric times, with evidence of Bronze Age settlements and 
                    Roman roads. The name derives from the medieval ownership by the Archbishop of York.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    During the medieval period, the dale was primarily used for sheep farming, a tradition that continues 
                    to this day. The characteristic field patterns and stone walls date largely from the 18th and 19th 
                    century enclosures.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Lead mining was also important in the 18th and 19th centuries, with several mines operating in the 
                    upper reaches of the dale. Remnants of this industrial heritage can still be seen in the landscape.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-gray-900">Location</dt>
                    <dd className="text-gray-700">North Yorkshire, England</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Length</dt>
                    <dd className="text-gray-700">Approximately 11 miles</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">River</dt>
                    <dd className="text-gray-700">Bishopdale Beck</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Main Villages</dt>
                    <dd className="text-gray-700">Thoralby, Newbiggin, West Burton</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">National Park</dt>
                    <dd className="text-gray-700">Yorkshire Dales</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Wildlife & Nature</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Bishopdale is home to a diverse range of wildlife including:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Curlews and lapwings</li>
                  <li>Red grouse on moorland</li>
                  <li>Barn owls and kestrels</li>
                  <li>Roe deer</li>
                  <li>Traditional hay meadow flora</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BishopdaleValley;
