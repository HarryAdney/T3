import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';
import { RichTextEditor } from '../../components/RichTextEditor';

interface TownshipData {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  geography_title: string;
  geography_content: string;
  history_title: string;
  history_content: string;
  communities_title: string;
  communities_content: string;
  industry_title: string;
  industry_content: string;
  today_title: string;
  today_content: string;
  card1_title: string;
  card1_icon: string;
  card1_content: string;
  card2_title: string;
  card2_icon: string;
  card2_content: string;
  card3_title: string;
  card3_icon: string;
  card3_content: string;
  card4_title: string;
  card4_icon: string;
  card4_content: string;
  history_section_title: string;
  history_section_content: string;
  published: boolean;
}

export function TownshipEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TownshipData>({
    name: '',
    slug: '',
    subtitle: '',
    description: '',
    geography_title: '',
    geography_content: '',
    history_title: '',
    history_content: '',
    communities_title: '',
    communities_content: '',
    industry_title: '',
    industry_content: '',
    today_title: '',
    today_content: '',
    card1_title: '',
    card1_icon: '',
    card1_content: '',
    card2_title: '',
    card2_icon: '',
    card2_content: '',
    card3_title: '',
    card3_icon: '',
    card3_content: '',
    card4_title: '',
    card4_icon: '',
    card4_content: '',
    history_section_title: '',
    history_section_content: '',
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

  const convertJsonToHtml = (jsonContent: any): string => {
    if (!jsonContent?.content) return '';

    let html = '';
    for (const block of jsonContent.content) {
      if (block.type === 'paragraph') {
        const text = block.content?.[0]?.text || '';
        html += `<p>${text}</p>`;
      } else if (block.type === 'heading') {
        const level = block.attrs?.level || 2;
        const text = block.content?.[0]?.text || '';
        html += `<h${level}>${text}</h${level}>`;
      }
    }
    return html;
  };

  const loadTownship = async (townshipId: string) => {
    try {
      const { data, error } = await supabase
        .from('townships')
        .select('*')
        .eq('id', townshipId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          slug: data.slug,
          subtitle: data.subtitle || '',
          description: convertJsonToHtml(data.description),
          geography_title: data.geography_title || '',
          geography_content: convertJsonToHtml(data.geography_content),
          history_title: data.history_title || '',
          history_content: convertJsonToHtml(data.history_content),
          communities_title: data.communities_title || '',
          communities_content: convertJsonToHtml(data.communities_content),
          industry_title: data.industry_title || '',
          industry_content: convertJsonToHtml(data.industry_content),
          today_title: data.today_title || '',
          today_content: convertJsonToHtml(data.today_content),
          card1_title: data.card1_title || '',
          card1_icon: data.card1_icon || '',
          card1_content: convertJsonToHtml(data.card1_content),
          card2_title: data.card2_title || '',
          card2_icon: data.card2_icon || '',
          card2_content: convertJsonToHtml(data.card2_content),
          card3_title: data.card3_title || '',
          card3_icon: data.card3_icon || '',
          card3_content: convertJsonToHtml(data.card3_content),
          card4_title: data.card4_title || '',
          card4_icon: data.card4_icon || '',
          card4_content: convertJsonToHtml(data.card4_content),
          history_section_title: data.history_section_title || '',
          history_section_content: convertJsonToHtml(data.history_section_content),
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

  const convertHtmlToJson = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const content: any[] = [];

    doc.body.childNodes.forEach((node) => {
      if (node.nodeName === 'P') {
        content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: node.textContent || '' }]
        });
      } else if (node.nodeName.match(/^H[1-6]$/)) {
        const level = parseInt(node.nodeName[1]);
        content.push({
          type: 'heading',
          attrs: { level },
          content: [{ type: 'text', text: node.textContent || '' }]
        });
      }
    });

    return {
      type: 'doc',
      content: content.length > 0 ? content : [{
        type: 'paragraph',
        content: [{ type: 'text', text: html }]
      }]
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const townshipData = {
        name: formData.name,
        slug: formData.slug,
        subtitle: formData.subtitle,
        description: convertHtmlToJson(formData.description),
        geography_title: formData.geography_title || null,
        geography_content: convertHtmlToJson(formData.geography_content),
        history_title: formData.history_title || null,
        history_content: convertHtmlToJson(formData.history_content),
        communities_title: formData.communities_title || null,
        communities_content: convertHtmlToJson(formData.communities_content),
        industry_title: formData.industry_title || null,
        industry_content: convertHtmlToJson(formData.industry_content),
        today_title: formData.today_title || null,
        today_content: convertHtmlToJson(formData.today_content),
        card1_title: formData.card1_title || null,
        card1_icon: formData.card1_icon || null,
        card1_content: formData.card1_content ? convertHtmlToJson(formData.card1_content) : null,
        card2_title: formData.card2_title || null,
        card2_icon: formData.card2_icon || null,
        card2_content: formData.card2_content ? convertHtmlToJson(formData.card2_content) : null,
        card3_title: formData.card3_title || null,
        card3_icon: formData.card3_icon || null,
        card3_content: formData.card3_content ? convertHtmlToJson(formData.card3_content) : null,
        card4_title: formData.card4_title || null,
        card4_icon: formData.card4_icon || null,
        card4_content: formData.card4_content ? convertHtmlToJson(formData.card4_content) : null,
        history_section_title: formData.history_section_title || null,
        history_section_content: formData.history_section_content ? convertHtmlToJson(formData.history_section_content) : null,
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

              <div>
                <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-stone-700">
                  Subtitle
                </label>
                <input
                  id="subtitle"
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  placeholder="Hero section subtitle"
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
            <p className="mb-4 text-sm text-stone-600">
              Main introductory paragraph shown at the top of the page
            </p>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              placeholder="Enter township description..."
            />
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Geography Card
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-stone-700">Card Title</label>
              <input
                type="text"
                value={formData.geography_title}
                onChange={(e) => setFormData({ ...formData, geography_title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                placeholder="e.g., Geography"
              />
            </div>
            <RichTextEditor
              value={formData.geography_content}
              onChange={(value) => setFormData({ ...formData, geography_content: value })}
              placeholder="Enter geography information..."
            />
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              History Card
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-stone-700">Card Title</label>
              <input
                type="text"
                value={formData.history_title}
                onChange={(e) => setFormData({ ...formData, history_title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                placeholder="e.g., History"
              />
            </div>
            <RichTextEditor
              value={formData.history_content}
              onChange={(value) => setFormData({ ...formData, history_content: value })}
              placeholder="Enter history information..."
            />
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Communities Card
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-stone-700">Card Title</label>
              <input
                type="text"
                value={formData.communities_title}
                onChange={(e) => setFormData({ ...formData, communities_title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                placeholder="e.g., Communities"
              />
            </div>
            <RichTextEditor
              value={formData.communities_content}
              onChange={(value) => setFormData({ ...formData, communities_content: value })}
              placeholder="Enter communities information..."
            />
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Industry Card
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-stone-700">Card Title</label>
              <input
                type="text"
                value={formData.industry_title}
                onChange={(e) => setFormData({ ...formData, industry_title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                placeholder="e.g., Industry"
              />
            </div>
            <RichTextEditor
              value={formData.industry_content}
              onChange={(value) => setFormData({ ...formData, industry_content: value })}
              placeholder="Enter industry and heritage information..."
            />
          </div>

          <div className="p-6 bg-white shadow-sm rounded-xl">
            <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
              Township Today Section
            </h2>
            <p className="mb-4 text-sm text-stone-600">
              Content for the "Bishopdale Today" (or similar) section at the bottom
            </p>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-stone-700">Section Title</label>
              <input
                type="text"
                value={formData.today_title}
                onChange={(e) => setFormData({ ...formData, today_title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                placeholder="e.g., Bishopdale Today"
              />
            </div>
            <RichTextEditor
              value={formData.today_content}
              onChange={(value) => setFormData({ ...formData, today_content: value })}
              placeholder="Enter current township information..."
            />
          </div>

          <div className="p-6 border-t-2 border-sage-200 bg-sage-50 rounded-xl">
            <h2 className="mb-2 font-serif text-xl font-semibold text-stone-900">
              Alternative Card System (for Thoralby-style layouts)
            </h2>
            <p className="mb-6 text-sm text-stone-600">
              Use these fields for townships with custom card layouts. Leave blank to use the standard Geography/History/Communities cards above.
            </p>

            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-white border-stone-200">
                <h3 className="mb-4 font-semibold text-stone-900">Card 1</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title</label>
                    <input
                      type="text"
                      value={formData.card1_title}
                      onChange={(e) => setFormData({ ...formData, card1_title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g., St. Oswald's Church"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Icon (e.g., Church, School, Users, TreePine, Factory)</label>
                    <input
                      type="text"
                      value={formData.card1_icon}
                      onChange={(e) => setFormData({ ...formData, card1_icon: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                      placeholder="Church"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Content</label>
                    <RichTextEditor
                      value={formData.card1_content}
                      onChange={(value) => setFormData({ ...formData, card1_content: value })}
                      placeholder="Card content..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-white border-stone-200">
                <h3 className="mb-4 font-semibold text-stone-900">Card 2</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title</label>
                    <input
                      type="text"
                      value={formData.card2_title}
                      onChange={(e) => setFormData({ ...formData, card2_title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Icon</label>
                    <input
                      type="text"
                      value={formData.card2_icon}
                      onChange={(e) => setFormData({ ...formData, card2_icon: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Content</label>
                    <RichTextEditor
                      value={formData.card2_content}
                      onChange={(value) => setFormData({ ...formData, card2_content: value })}
                      placeholder="Card content..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-white border-stone-200">
                <h3 className="mb-4 font-semibold text-stone-900">Card 3</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title</label>
                    <input
                      type="text"
                      value={formData.card3_title}
                      onChange={(e) => setFormData({ ...formData, card3_title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Icon</label>
                    <input
                      type="text"
                      value={formData.card3_icon}
                      onChange={(e) => setFormData({ ...formData, card3_icon: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Content</label>
                    <RichTextEditor
                      value={formData.card3_content}
                      onChange={(value) => setFormData({ ...formData, card3_content: value })}
                      placeholder="Card content..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-white border-stone-200">
                <h3 className="mb-4 font-semibold text-stone-900">Card 4</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Title</label>
                    <input
                      type="text"
                      value={formData.card4_title}
                      onChange={(e) => setFormData({ ...formData, card4_title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Icon</label>
                    <input
                      type="text"
                      value={formData.card4_icon}
                      onChange={(e) => setFormData({ ...formData, card4_icon: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Content</label>
                    <RichTextEditor
                      value={formData.card4_content}
                      onChange={(value) => setFormData({ ...formData, card4_content: value })}
                      placeholder="Card content..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-white border-stone-200">
                <h3 className="mb-4 font-semibold text-stone-900">Bottom History Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Section Title</label>
                    <input
                      type="text"
                      value={formData.history_section_title}
                      onChange={(e) => setFormData({ ...formData, history_section_title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g., Thoralby Through the Ages"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-stone-700">Content</label>
                    <RichTextEditor
                      value={formData.history_section_content}
                      onChange={(value) => setFormData({ ...formData, history_section_content: value })}
                      placeholder="Enter historical content..."
                    />
                  </div>
                </div>
              </div>
            </div>
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
