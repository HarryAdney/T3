import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { User, Search } from 'lucide-react';

export function People() {
  const [people, setPeople] = useState<any[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .order('last_name', { ascending: true });

      if (data && !error) {
        setPeople(data);
        setFilteredPeople(data);
      }
      setLoading(false);
    }

    fetchPeople();
  }, []);

  useEffect(() => {
    let filtered = people;

    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.occupation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDecade !== 'all') {
      const decade = parseInt(selectedDecade);
      filtered = filtered.filter(
        (person) =>
          person.birth_year &&
          person.birth_year >= decade &&
          person.birth_year < decade + 10
      );
    }

    setFilteredPeople(filtered);
  }, [searchTerm, selectedDecade, people]);

  const decades = Array.from(
    new Set(
      people
        .filter((p) => p.birth_year)
        .map((p) => Math.floor(p.birth_year / 10) * 10)
    )
  ).sort((a, b) => a - b);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'People & Families', path: '/people' }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
            People & Families
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl">
            Explore the lives and stories of the people who made Thoralby and
            Bishopdale their home. From farmers and tradespeople to teachers and
            community leaders, each person contributed to our shared heritage.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="search"
                placeholder="Search by name or occupation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
            >
              <option value="all">All Decades</option>
              {decades.map((decade) => (
                <option key={decade} value={decade}>
                  {decade}s
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPeople.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <p className="text-stone-600">No people found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeople.map((person) => (
              <Link
                key={person.id}
                to={`/people/${person.id}`}
                className="card group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-200 transition-colors">
                    {person.profile_image_url ? (
                      <img
                        src={person.profile_image_url}
                        alt={`${person.first_name} ${person.last_name}`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-sage-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl font-semibold text-stone-900 mb-1 group-hover:text-sage-700 transition-colors">
                      {person.first_name} {person.last_name}
                    </h3>
                    {person.birth_year && (
                      <p className="text-sm text-stone-500 mb-2">
                        {person.birth_year}
                        {person.death_year && ` - ${person.death_year}`}
                      </p>
                    )}
                    {person.occupation && (
                      <p className="text-sm text-stone-700 font-medium">
                        {person.occupation}
                      </p>
                    )}
                  </div>
                </div>
                {person.biography && (
                  <p className="mt-4 text-stone-600 text-sm line-clamp-3">
                    {person.biography}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {filteredPeople.length > 0 && (
          <div className="mt-8 text-center text-stone-600">
            Showing {filteredPeople.length} of {people.length} people
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
