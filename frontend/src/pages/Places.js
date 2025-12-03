import React from 'react';
import { useSanityContent } from '../hooks/useSanityContent';
import { PLACES_QUERY } from '../queries/sanity.queries';
import { urlFor } from '../lib/sanity';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin } from 'lucide-react';

const Places = () => {
  const { data: places, loading, error } = useSanityContent(PLACES_QUERY);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading places...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">Error loading places: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Buildings & Places</h1>
          <p className="text-lg text-gray-600">
            Explore the historic architecture and landmarks of Bishopdale.
          </p>
        </div>

        {/* Places Grid */}
        {!places || places.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-12 max-w-2xl mx-auto">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Places Found</h3>
              <p className="text-gray-600 mb-6">
                Start adding places to your Sanity Studio to see them here.
              </p>
              <a 
                href="https://www.sanity.io/manage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Go to Sanity Studio
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {places.map((place) => (
              <Card key={place._id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  {place.placeImage && place.placeImage.asset ? (
                    <img
                      src={urlFor(place.placeImage).width(600).height(400).fit('crop').url()}
                      alt={place.name}
                      className="w-full h-64 object-cover rounded-t-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
                      <MapPin className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
                  <CardTitle className="text-xl">{place.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {place.description && (
                    <p className="text-gray-700 mb-4">{place.description}</p>
                  )}
                  {place.historicalSignificance && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
                      <p className="text-sm font-semibold text-amber-900 mb-1">Historical Significance</p>
                      <p className="text-sm text-amber-800">{place.historicalSignificance}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;
