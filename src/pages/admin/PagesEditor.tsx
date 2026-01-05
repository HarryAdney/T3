import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { RichTextEditor } from '../../components/RichTextEditor';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: any;
  meta_description: string;
  published: boolean;
  updated_at: string;
}

export function PagesEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    published: true,
  });

  useEffect(() => {
    checkAuth();
    loadPages();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/admin/login');
  };

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('title');

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPage = async (pageId: string) => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single();

      if (error) throw error;
      setSelectedPage(data);
      setFormData({
        title: data.title,
        slug: data.slug,
        content: convertJsonToHtml(data.content),
        meta_description: data.meta_description || '',
        published: data.published,
      });
    } catch (error) {
      console.error('Error loading page:', error);
    }
  };

  const convertJsonToHtml = (jsonContent: any): string => {
    if (!jsonContent?.content) return '';
    let html = '';
    for (const block of jsonContent.content) {
      if (block.type === 'paragraph') {
        html += `<p>${block.content?.[0]?.text || ''}</p>`;
      } else if (block.type === 'heading') {
        const level = block.attrs?.level || 2;
        html += `<h${level}>${block.content?.[0]?.text || ''}</h${level}>`;
      }
    }
    return html;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const pageData = {
        title: formData.title,
        slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
        content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: formData.content }] }] },
        meta_description: formData.meta_description,
        published: formData.published,
        updated_at: new Date().toISOString(),
      };

      if (isNew) {
        await supabase.from('pages').insert([pageData]);
      } else if (selectedPage) {
        await supabase.from('pages').update(pageData).eq('id', selectedPage.id);
      }

      navigate('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await supabase.from('pages').delete().eq('id', pageId);
      loadPages();
    } catch (error) {
      console.error('Error deleting page:', error);
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
            <h1 className="font-serif text-4xl font-bold text-stone-900">Pages</h1>
            <p className="text-stone-600">Manage static pages</p>
          </div>
          <button onClick={() => { setSelectedPage(null); setFormData({ title: '', slug: '', content: '', meta_description: '', published: true }); }} className="inline-flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
            <Plus className="w-4 h-4" />
            <span>New Page</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="p-4 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 font-serif text-lg font-semibold text-stone-900">All Pages</h2>
              <div className="space-y-2">
                {pages.map((page) => (
                  <div key={page.id} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${selectedPage?.id === page.id ? 'bg-sage-100' : 'hover:bg-stone-50'}`} onClick={() => loadPage(page.id)}>
                    <div>
                      <p className="font-medium text-stone-900">{page.title}</p>
                      <p className="text-xs text-stone-500">/{page.slug}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(page.id); }} className="p-1 text-stone-400 hover:text-red-600">
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
                <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">{isNew ? 'New Page' : 'Edit Page'}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title *</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">URL Slug *</label>
                    <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" placeholder="page-url-slug" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Meta Description</label>
                    <textarea value={formData.meta_description} onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })} className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500" rows={2} placeholder="SEO description" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="w-4 h-4 rounded text-sage-600 focus:ring-sage-500" />
                    <label className="ml-2 text-sm font-medium text-stone-700">Published</label>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white shadow-sm rounded-xl">
                <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">Content</h2>
                <RichTextEditor value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} placeholder="Enter page content..." />
              </div>

              <div className="flex items-center space-x-4">
                <button type="submit" disabled={saving} className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-sage-600 hover:bg-sage-700 disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
