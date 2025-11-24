import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';
import { RichTextEditor } from '../../components/RichTextEditor';

interface TownshipData {
  name: string;
  slug: string;
  description: string;
  industry_content: string;
  published: boolean;
}

export function TownshipEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TownshipData>({
    name: '',
    slug: '',
    description: '',
    industry_content: '',
    published: true,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    if (!isNew && id) {
      loadTownship(id);
    }
  }, [id]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    }
  };

  const loadTownship = async (townshipId: string) => {
    try {
      const { data, error } = await supabase
        .from('townships')
        .select('*')
        .eq('id', townshipId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          slug: data.slug,
          description: data.description?.content?.[0]?.content?.[0]?.text || '',
          industry_content: data.industry_content?.content?.[0]?.content?.[0]?.text || '',
          published: data.published,
        });
      }
    } catch (error) {
      console.error('Error loading township:', error);
      setError('Failed to load township');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const townshipData = {
        name: formData.name,
        slug: formData.slug,
        description: {
          type: 'doc',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: formData.description }]
          }]
        },
        industry_content: {
          type: 'doc',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: formData.industry_content }]
          }]
        },
        published: formData.published,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        const { error } = await supabase
          .from('townships')
          .insert([townshipData]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('townships')
          .update(townshipData)
          .eq('id', id);

        if (error) throw error;
      }

      navigate('/admin/townships');
    } catch (error) {
      console.error('Error saving township:', error);
      setError(error instanceof Error ? error.message : 'Failed to save township');
    } finally {
      setSaving(false);
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
      <div className="px-4 py-12 mx-auto max-w-5xl sm:px-6 lg:px-8">
        <Link
          to="/admin/townships"
          className="inline-flex items-center mb-6 space-x-2 text-sage-700 hover:text-sage-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Townships</span>
        </Link>

        <h1 className="mb-8 font-serif text-4xl font-bold text-stone-900">
          {isNew ? 'New Township' : `Edit ${formData.name}`}
        </h1>

        {error && (
          <div className="p-4 mb-6 text-sm border rounded-lg bg-red-50 border-red-200 text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-stone-700">
                  Township Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block mb-2 text-sm font-medium text-stone-700">
                  URL Slug *
                </label>
                <input
                  id="slug"
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  required
                  className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  placeholder="township-name"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded text-sage-600 focus:ring-sage-500"
                />
                <label htmlFor="published" className="ml-2 text-sm font-medium text-stone-700">
                  Published
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Description
            </h2>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              placeholder="Enter township description..."
            />
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Industry Content
            </h2>
            <RichTextEditor
              value={formData.industry_content}
              onChange={(value) => setFormData({ ...formData, industry_content: value })}
              placeholder="Enter industry and heritage information..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-colors bg-sage-600 rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Township'}</span>
            </button>
            <Link
              to="/admin/townships"
              className="px-6 py-3 font-semibold transition-colors text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
