import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { User, Search } from 'lucide-react';
import { Database } from '../lib/database.types';

type Person = Database['public']['Tables']['people']['Row'];

export function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
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
        .filter((p) => p.birth_year !== null)
        .map((p) => Math.floor((p.birth_year as number) / 10) * 10)
    )
  ).sort((a, b) => a - b);

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'People & Families', path: '/people' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl text-stone-900">
            People & Families
          </h1>
          <p className="max-w-3xl text-lg text-stone-600">
            Explore the lives and stories of the people who made Thoralby and
            Bishopdale their home. From farmers and tradespeople to teachers and
            community leaders, each person contributed to our shared heritage.
          </p>
        </div>

        <div className="p-6 mb-8 bg-white rounded-2xl shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-stone-400" />
              <input
                type="search"
                placeholder="Search by name or occupation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="px-4 py-3 bg-white border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
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
          <div className="py-12 text-center">
            <div className="inline-block w-8 h-8 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
          </div>
        ) : filteredPeople.length === 0 ? (
          <div className="py-12 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-stone-400" />
            <p className="text-stone-600">No people found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPeople.map((person) => (
              <Link
                key={person.id}
                to={`/people/${person.id}`}
                className="card group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors rounded-full bg-sage-100 group-hover:bg-sage-200">
                    {person.profile_image_url ? (
                      <img
                        src={person.profile_image_url}
                        alt={`${person.first_name} ${person.last_name}`}
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-sage-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 font-serif text-xl font-semibold transition-colors text-stone-900 group-hover:text-sage-700">
                      {person.first_name} {person.last_name}
                    </h3>
                    {person.birth_year && (
                      <p className="mb-2 text-sm text-stone-500">
                        {person.birth_year}
                        {person.death_year && ` - ${person.death_year}`}
                      </p>
                    )}
                    {person.occupation && (
                      <p className="text-sm font-medium text-stone-700">
                        {person.occupation}
                      </p>
                    )}
                  </div>
                </div>
                {person.biography && (
                  <p className="mt-4 text-sm text-stone-600 line-clamp-3">
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
