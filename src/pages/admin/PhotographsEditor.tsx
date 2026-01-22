import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface Photograph {
  id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string | null;
  photo_date: string | null;
  photo_year: number | null;
  location: string | null;
  photographer: string | null;
  contributor: string | null;
  tags: string[];
  updated_at: string;
}

export function PhotographsEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [photos, setPhotos] = useState<Photograph[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    photo_date: '',
    photo_year: '',
    location: '',
    photographer: '',
    contributor: '',
    tags: '',
  });

  useEffect(() => {
    checkAuth();
    loadPhotos();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/admin/login');
  };

  const loadPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photographs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPhoto = async (photoId: string) => {
    try {
      const { data, error } = await supabase
        .from('photographs')
        .select('*')
        .eq('id', photoId)
        .single();

      if (error) throw error;
      setSelectedPhoto(data);
      setFormData({
        title: data.title,
        description: data.description || '',
        image_url: data.image_url,
        photo_date: data.photo_date || '',
        photo_year: data.photo_year?.toString() || '',
        location: data.location || '',
        photographer: data.photographer || '',
        contributor: data.contributor || '',
        tags: data.tags?.join(', ') || '',
      });
    } catch (error) {
      console.error('Error loading photo:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const photoData = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        thumbnail_url: null,
        photo_date: formData.photo_date || null,
        photo_year: formData.photo_year ? parseInt(formData.photo_year) : null,
        location: formData.location || null,
        photographer: formData.photographer || null,
        contributor: formData.contributor || null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await supabase.from('photographs').insert([photoData]);
      } else if (selectedPhoto) {
        await supabase.from('photographs').update(photoData).eq('id', selectedPhoto.id);
      }

      navigate('/admin/photographs');
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Failed to save photo');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      await supabase.from('photographs').delete().eq('id', photoId);
      loadPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
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
            <h1 className="font-serif text-4xl font-bold text-stone-900">Photographs</h1>
            <p className="text-stone-600">Manage photo archive</p>
          </div>
          <button onClick={() => { setSelectedPhoto(null); setFormData({ title: '', description: '', image_url: '', photo_date: '', photo_year: '', location: '', photographer: '', contributor: '', tags: '' }); }} className="inline-flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
            <Plus className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="p-4 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 font-serif text-lg font-semibold text-stone-900">All Photos ({photos.length})</h2>
              <div className="space-y-2 overflow-y-auto max-h-96">
                {photos.map((photo) => (
                  <div key={photo.id} className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedPhoto?.id === photo.id ? 'bg-sage-100' : 'hover:bg-stone-50'}`} onClick={() => loadPhoto(photo.id)}>
                    <img src={photo.thumbnail_url || photo.image_url} alt={photo.title} className="object-cover w-12 h-12 rounded" />
                    <div className="flex-1 min-w-0 ml-3">
                      <p className="text-sm font-medium truncate text-stone-900">{photo.title}</p>
                      <p className="text-xs text-stone-500">{photo.photo_year || 'Unknown year'}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(photo.id); }} className="p-1 text-stone-400 hover:text-red-600">
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
                <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">{isNew ? 'Add Photo' : 'Edit Photo'}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title *</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Image URL *</label>
                    <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" placeholder="https://..." />
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="object-cover w-full h-48 mt-2 rounded-lg" />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Year</label>
                      <input type="number" value={formData.photo_year} onChange={(e) => setFormData({ ...formData, photo_year: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Location</label>
                      <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Photographer</label>
                      <input type="text" value={formData.photographer} onChange={(e) => setFormData({ ...formData, photographer: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-stone-700">Contributor</label>
                      <input type="text" value={formData.contributor} onChange={(e) => setFormData({ ...formData, contributor: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" rows={4} />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Tags (comma separated)</label>
                    <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" placeholder="church, farming, village" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button type="submit" disabled={saving} className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-sage-600 hover:bg-sage-700 disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
