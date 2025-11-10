import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useStaticData } from '../hooks/useStaticData';
import { format } from 'date-fns';
import { Calendar, Filter } from 'lucide-react';

export function Timeline() {
  const { data: staticData, loading } = useStaticData();
  const events = staticData?.events || [];
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (events.length > 0) {
      setFilteredEvents(events);
    }
  }, [events]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((e) => e.category === selectedCategory));
    }
  }, [selectedCategory, events]);

  const categories = Array.from(new Set(events.map((e) => e.category)));

  const categoryColors: Record<string, string> = {
    social: 'bg-blue-100 text-blue-800',
    political: 'bg-red-100 text-red-800',
    economic: 'bg-green-100 text-green-800',
    cultural: 'bg-purple-100 text-purple-800',
    natural: 'bg-amber-100 text-amber-800',
    general: 'bg-stone-100 text-stone-800',
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Historical Timeline', path: '/timeline' }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
            Historical Timeline
          </h1>
          <p className="text-lg text-stone-600">
            Journey through the significant events that shaped Thoralby and Bishopdale
            over the centuries.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-4 mb-8 flex items-center space-x-4">
          <Filter className="w-5 h-5 text-stone-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <p className="text-stone-600">No events found.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage-200" />

            <div className="space-y-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative pl-20">
                  <div className="absolute left-0 w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center text-white font-serif font-semibold shadow-soft">
                    {event.decade}s
                  </div>

                  <div className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-stone-500">
                          {event.event_date
                            ? format(new Date(event.event_date), 'MMMM d, yyyy')
                            : event.event_year}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          categoryColors[event.category] || categoryColors.general
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>

                    {event.image_url && (
                      <div className="aspect-video overflow-hidden rounded-xl mb-4 sepia-overlay">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="text-stone-700 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredEvents.length > 0 && (
          <div className="mt-8 text-center text-stone-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
