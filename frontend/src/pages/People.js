import React from 'react';
import { useSanityContent } from '../hooks/useSanityContent';
import { PEOPLE_QUERY } from '../queries/sanity.queries';
import { urlFor } from '../lib/sanity';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { User } from 'lucide-react';
import { format } from 'date-fns';

const People = () => {
  const { data: people, loading, error } = useSanityContent(PEOPLE_QUERY);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading people...</p>
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
            <p className="text-red-800">Error loading people: {error.message}</p>
            <p className="text-sm text-red-600 mt-2">Please make sure Sanity is properly configured.</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">People & Families</h1>
          <p className="text-lg text-gray-600">
            Discover the stories of families who shaped Thoralby through generations.
          </p>
        </div>

        {/* People Grid */}
        {!people || people.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-12 max-w-2xl mx-auto">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No People Found</h3>
              <p className="text-gray-600 mb-6">
                Start adding people to your Sanity Studio to see them here.
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
            {people.map((person) => (
              <Card key={person._id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  {person.portrait && person.portrait.asset ? (
                    <img
                      src={urlFor(person.portrait).width(400).height(400).fit('crop').url()}
                      alt={person.name}
                      className="w-full h-64 object-cover rounded-t-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
                      <User className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
                  <CardTitle className="text-xl">{person.name}</CardTitle>
                  {(person.birthDate || person.deathDate) && (
                    <p className="text-sm text-gray-600">
                      {person.birthDate && format(new Date(person.birthDate), 'yyyy')}
                      {person.birthDate && person.deathDate && ' - '}
                      {person.deathDate && format(new Date(person.deathDate), 'yyyy')}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {person.biography && (
                    <p className="text-gray-700 line-clamp-3">{person.biography}</p>
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

export default People;
