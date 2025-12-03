import React from 'react';
import { useSanityContent } from '../hooks/useSanityContent';
import { PHOTOS_QUERY } from '../queries/sanity.queries';
import { urlFor } from '../lib/sanity';
import { Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';

const Archive = () => {
  const { data: photos, loading, error } = useSanityContent(PHOTOS_QUERY);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading photo archive...</p>
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
            <p className="text-red-800">Error loading photos: {error.message}</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Archive</h1>
          <p className="text-lg text-gray-600">
            Browse our collection of historical photographs and images documenting life in Thoralby and Bishopdale.
          </p>
        </div>

        {/* Photos Grid */}
        {!photos || photos.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-12 max-w-2xl mx-auto">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Photos Found</h3>
              <p className="text-gray-600 mb-6">
                Start adding photos to your Sanity Studio to see them here.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div 
                key={photo._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {photo.image && photo.image.asset ? (
                  <img
                    src={urlFor(photo.image).width(600).height(400).fit('crop').url()}
                    alt={photo.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-20 w-20 text-gray-400" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                  )}
                  {photo.datePhotographed && (
                    <p className="text-xs text-gray-500">
                      {format(new Date(photo.datePhotographed), 'MMMM d, yyyy')}
                    </p>
                  )}
                  {photo.location && (
                    <p className="text-xs text-gray-500 mt-1">
                      Location: {photo.location.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
