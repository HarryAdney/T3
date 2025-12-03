import React from 'react';
import { useSanityContent } from '../hooks/useSanityContent';
import { TIMELINE_QUERY } from '../queries/sanity.queries';
import { Card, CardContent } from '../components/ui/card';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Timeline = () => {
  const { data: entries, loading, error } = useSanityContent(TIMELINE_QUERY);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading timeline...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">Error loading timeline: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Historical Timeline</h1>
          <p className="text-lg text-gray-600">
            Journey through centuries of events that defined our community.
          </p>
        </div>

        {/* Timeline */}
        {!entries || entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Timeline Entries Found</h3>
              <p className="text-gray-600 mb-6">
                Start adding timeline entries to your Sanity Studio to see them here.
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
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

            {/* Timeline entries */}
            <div className="space-y-8">
              {entries.map((entry) => (
                <div key={entry._id} className="relative flex gap-6">
                  {/* Date marker */}
                  <div className="flex-shrink-0 w-16">
                    <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm shadow-lg z-10 relative">
                      {format(new Date(entry.date), 'yyyy')}
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 hover:shadow-xl transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">
                          {format(new Date(entry.date), 'MMMM d, yyyy')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{entry.title}</h3>
                      {entry.description && (
                        <p className="text-gray-700 mb-4">{entry.description}</p>
                      )}
                      
                      {/* Related items */}
                      {entry.relatedPeople && entry.relatedPeople.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Related People:</p>
                          <p className="text-sm text-gray-600">
                            {entry.relatedPeople.map(p => p.name).join(', ')}
                          </p>
                        </div>
                      )}
                      
                      {entry.relatedEvents && entry.relatedEvents.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Related Events:</p>
                          <p className="text-sm text-gray-600">
                            {entry.relatedEvents.map(e => e.title).join(', ')}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
