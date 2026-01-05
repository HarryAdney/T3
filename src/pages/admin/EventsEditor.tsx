import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  event_year: number;
  decade: number | null;
  category: string;
  image_url: string | null;
  updated_at: string;
}

export function EventsEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_year: new Date().getFullYear(),
    decade: 0,
    category: '',
    image_url: '',
    published: true,
  });

  useEffect(() => {
    checkAuth();
    loadEvents();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/admin/login');
  };

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_year', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEvent = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      setSelectedEvent(data);
      setFormData({
        title: data.title,
        description: data.description,
        event_date: data.event_date || '',
        event_year: data.event_year,
        decade: data.decade || 0,
        category: data.category,
        image_url: data.image_url || '',
        published: true,
      });
    } catch (error) {
      console.error('Error loading event:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        event_date: formData.event_date || null,
        event_year: formData.event_year,
        decade: Math.floor(formData.event_year / 10) * 10,
        category: formData.category,
        image_url: formData.image_url || null,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await supabase.from('events').insert([eventData]);
      } else if (selectedEvent) {
        await supabase.from('events').update(eventData).eq('id', selectedEvent.id);
      }

      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await supabase.from('events').delete().eq('id', eventId);
      loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-stone-600">Loading...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => navigate('/admin')} className="inline-flex items-center mb-4 space-x-2 text-sage-700 hover:text-sage-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="font-serif text-4xl font-bold text-stone-900">Timeline Events</h1>
            <p className="text-stone-600">Manage historical events</p>
          </div>
          <button onClick={() => { setSelectedEvent(null); setFormData({ title: '', description: '', event_date: '', event_year: new Date().getFullYear(), decade: 0, category: '', image_url: '', published: true }); }} className="inline-flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="p-4 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 font-serif text-lg font-semibold text-stone-900">All Events</h2>
              <div className="space-y-2 overflow-y-auto max-h-96">
                {events.map((event) => (
                  <div key={event.id} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${selectedEvent?.id === event.id ? 'bg-sage-100' : 'hover:bg-stone-50'}`} onClick={() => loadEvent(event.id)}>
                    <div>
                      <p className="font-medium text-stone-900">{event.title}</p>
                      <p className="text-xs text-stone-500">{event.event_year} • {event.category}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(event.id); }} className="p-1 text-stone-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 bg-white shadow-sm rounded-xl">
                <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">{isNew ? 'New Event' : 'Edit Event'}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title *</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Year *</label>
                      <input type="number" value={formData.event_year} onChange={(e) => setFormData({ ...formData, event_year: parseInt(e.target.value) })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500">
                        <option value="">Select category</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Building">Building</option>
                        <option value="Community">Community</option>
                        <option value="Education">Education</option>
                        <option value="Industry">Industry</option>
                        <option value="Religion">Religion</option>
                        <option value="Transport">Transport</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" rows={4} />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Image URL</label>
                    <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button type="submit" disabled={saving} className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-sage-600 hover:bg-sage-700 disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
