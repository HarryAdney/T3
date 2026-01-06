import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  birth_year: number | null;
  death_year: number | null;
  biography: string;
  occupation: string | null;
  location: string | null;
  image_url: string | null;
  updated_at: string;
}

export function PeopleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birth_year: '',
    death_year: '',
    biography: '',
    occupation: '',
    location: '',
    image_url: '',
  });

  useEffect(() => {
    checkAuth();
    loadPeople();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/admin/login');
  };

  const loadPeople = async () => {
    try {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .order('name');

      if (error) throw error;
      setPeople(data || []);
    } catch (error) {
      console.error('Error loading people:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPerson = async (personId: string) => {
    try {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .eq('id', personId)
        .single();

      if (error) throw error;
      setSelectedPerson(data);
      setFormData({
        name: data.name,
        birth_year: data.birth_year?.toString() || '',
        death_year: data.death_year?.toString() || '',
        biography: data.biography || '',
        occupation: data.occupation || '',
        location: data.location || '',
        image_url: data.image_url || '',
      });
    } catch (error) {
      console.error('Error loading person:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const personData = {
        name: formData.name,
        birth_year: formData.birth_year ? parseInt(formData.birth_year) : null,
        death_year: formData.death_year ? parseInt(formData.death_year) : null,
        biography: formData.biography,
        occupation: formData.occupation || null,
        location: formData.location || null,
        image_url: formData.image_url || null,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await supabase.from('people').insert([personData]);
      } else if (selectedPerson) {
        await supabase.from('people').update(personData).eq('id', selectedPerson.id);
      }

      navigate('/admin/people');
    } catch (error) {
      console.error('Error saving person:', error);
      alert('Failed to save person');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (personId: string) => {
    if (!confirm('Are you sure you want to delete this person?')) return;
    try {
      await supabase.from('people').delete().eq('id', personId);
      loadPeople();
    } catch (error) {
      console.error('Error deleting person:', error);
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
            <h1 className="font-serif text-4xl font-bold text-stone-900">People & Families</h1>
            <p className="text-stone-600">Manage people and family records</p>
          </div>
            <button onClick={() => { setSelectedPerson(null); setFormData({ name: '', birth_year: '', death_year: '', biography: '', occupation: '', location: '', image_url: '' }); }} className="inline-flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
            <Plus className="w-4 h-4" />
            <span>Add Person</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="p-4 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 font-serif text-lg font-semibold text-stone-900">All People</h2>
              <div className="space-y-2 overflow-y-auto max-h-96">
                {people.map((person) => (
                  <div key={person.id} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${selectedPerson?.id === person.id ? 'bg-sage-100' : 'hover:bg-stone-50'}`} onClick={() => loadPerson(person.id)}>
                    <div>
                      <p className="font-medium text-stone-900">{person.name}</p>
                      <p className="text-xs text-stone-500">{person.occupation || 'No occupation'}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(person.id); }} className="p-1 text-stone-400 hover:text-red-600">
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
                <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">{isNew ? 'Add Person' : 'Edit Person'}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Birth Year</label>
                      <input type="number" value={formData.birth_year} onChange={(e) => setFormData({ ...formData, birth_year: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Death Year</label>
                      <input type="number" value={formData.death_year} onChange={(e) => setFormData({ ...formData, death_year: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Occupation</label>
                    <input type="text" value={formData.occupation} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Biography</label>
                    <textarea value={formData.biography} onChange={(e) => setFormData({ ...formData, biography: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" rows={6} />
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
                  {saving ? 'Saving...' : 'Save Person'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
