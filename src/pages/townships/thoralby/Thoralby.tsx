import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Church, School, Users, TreePine, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { InlineEditor } from '../../../components/InlineEditor';
import { useEditMode } from '../../../contexts/EditModeContext';

interface TownshipContent {
  id: string;
  title: string;
  subtitle: string;
  description: any;
  card1_title: string;
  card1_icon: string;
  card1_content: any;
  card2_title: string;
  card2_icon: string;
  card2_content: any;
  card3_title: string;
  card3_icon: string;
  card3_content: any;
  card4_title: string;
  card4_icon: string;
  card4_content: any;
  industry_title: string;
  industry_content: any;
  history_section_title: string;
  history_section_content: any;
}

const iconMap: { [key: string]: any } = {
  Church,
  School,
  Users,
  TreePine,
  Factory,
};

export function Thoralby() {
  const [content, setContent] = useState<TownshipContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { isEditMode } = useEditMode();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('townships')
        .select(`
          id, title, subtitle, description,
          card1_title, card1_icon, card1_content,
          card2_title, card2_icon, card2_content,
          card3_title, card3_icon, card3_content,
          card4_title, card4_icon, card4_content,
          industry_title, industry_content,
          history_section_title, history_section_content
        `)
        .eq('slug', 'thoralby')
        .maybeSingle();

      if (data) {
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const jsonToHtml = (jsonContent: any, defaultText: string = ''): string => {
    if (!jsonContent?.content) return `<p>${defaultText}</p>`;
    const html = jsonContent.content
      .map((block: any) => {
        const text = block.content?.[0]?.text || '';
        return text ? `<p>${text}</p>` : '';
      })
      .join('');
    return html || `<p>${defaultText}</p>`;
  };

  const htmlToJson = (html: string): any => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const paragraphs = tempDiv.querySelectorAll('p');

    return {
      type: 'doc',
      content: Array.from(paragraphs).map(p => ({
        type: 'paragraph',
        content: [{ type: 'text', text: p.textContent || '' }]
      }))
    };
  };

  const handleSaveField = async (field: string, htmlContent: string) => {
    if (!content?.id) return;

    const jsonContent = htmlToJson(htmlContent);
    const { error } = await supabase
      .from('townships')
      .update({ [field]: jsonContent })
      .eq('id', content.id);

    if (error) {
      console.error('Error saving:', error);
      throw error;
    }

    await loadContent();
  };

  const handleSaveTextOnly = async (field: string, htmlContent: string) => {
    if (!content?.id) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || '';

    const { error } = await supabase
      .from('townships')
      .update({ [field]: text })
      .eq('id', content.id);

    if (error) {
      console.error('Error saving:', error);
      throw error;
    }

    await loadContent();
  };

  const handleSaveSubtitle = async (htmlContent: string) => {
    if (!content?.id) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || '';

    const { error } = await supabase
      .from('townships')
      .update({ subtitle: text })
      .eq('id', content.id);

    if (error) {
      console.error('Error saving subtitle:', error);
      throw error;
    }

    await loadContent();
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Church;
  };

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Thoralby village"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            {!loading && (
              <InlineEditor
                content={`<h1>${content?.title || 'Thoralby'}</h1>`}
                onSave={(html) => handleSaveTextOnly('title', html)}
                className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl"
                placeholder="Click to edit title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={`<p>${content?.subtitle || 'The principal village of Bishopdale'}</p>`}
                onSave={handleSaveSubtitle}
                className="text-lg md:text-xl"
                placeholder="Click to edit subtitle"
              />
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Thoralby', path: '/townships/thoralby' },
          ]}
        />

        <div className="mb-12">
          {loading ? (
            <p className="text-lg leading-relaxed text-stone-600">Loading...</p>
          ) : (
            <InlineEditor
              content={jsonToHtml(
                content?.description,
                'Thoralby is a small village in Bishopdale, one of the side dales of Wensleydale in the Yorkshire Dales National Park. The village has a rich history dating back to medieval times, with St. Oswald\'s Church featuring Norman architecture from the 12th century.'
              )}
              onSave={(html) => handleSaveField('description', html)}
              className="text-lg leading-relaxed text-stone-600"
              placeholder="Click to edit description"
            />
          )}
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-stone-600">Loading...</p>
          ) : (
            <>
              {content?.card1_title && (
                <div className="card">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                    {(() => {
                      const Icon = getIcon(content.card1_icon);
                      return <Icon className="w-6 h-6 text-sage-700" />;
                    })()}
                  </div>
                  <InlineEditor
                    content={`<h2>${content.card1_title}</h2>`}
                    onSave={(html) => handleSaveTextOnly('card1_title', html)}
                    className="mb-3 font-serif text-xl font-semibold text-stone-900"
                    placeholder="Click to edit card title"
                  />
                  <InlineEditor
                    content={jsonToHtml(content.card1_content)}
                    onSave={(html) => handleSaveField('card1_content', html)}
                    className="text-stone-700"
                    placeholder="Click to edit"
                  />
                </div>
              )}

              {content?.card2_title && (
                <div className="card">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                    {(() => {
                      const Icon = getIcon(content.card2_icon);
                      return <Icon className="w-6 h-6 text-parchment-700" />;
                    })()}
                  </div>
                  <InlineEditor
                    content={`<h2>${content.card2_title}</h2>`}
                    onSave={(html) => handleSaveTextOnly('card2_title', html)}
                    className="mb-3 font-serif text-xl font-semibold text-stone-900"
                    placeholder="Click to edit card title"
                  />
                  <InlineEditor
                    content={jsonToHtml(content.card2_content)}
                    onSave={(html) => handleSaveField('card2_content', html)}
                    className="text-stone-700"
                    placeholder="Click to edit"
                  />
                </div>
              )}

              {content?.card3_title && (
                <div className="card">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                    {(() => {
                      const Icon = getIcon(content.card3_icon);
                      return <Icon className="w-6 h-6 text-sage-700" />;
                    })()}
                  </div>
                  <InlineEditor
                    content={`<h2>${content.card3_title}</h2>`}
                    onSave={(html) => handleSaveTextOnly('card3_title', html)}
                    className="mb-3 font-serif text-xl font-semibold text-stone-900"
                    placeholder="Click to edit card title"
                  />
                  <InlineEditor
                    content={jsonToHtml(content.card3_content)}
                    onSave={(html) => handleSaveField('card3_content', html)}
                    className="text-stone-700"
                    placeholder="Click to edit"
                  />
                </div>
              )}

              {content?.card4_title && (
                <div className="card">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                    {(() => {
                      const Icon = getIcon(content.card4_icon);
                      return <Icon className="w-6 h-6 text-parchment-700" />;
                    })()}
                  </div>
                  <InlineEditor
                    content={`<h2>${content.card4_title}</h2>`}
                    onSave={(html) => handleSaveTextOnly('card4_title', html)}
                    className="mb-3 font-serif text-xl font-semibold text-stone-900"
                    placeholder="Click to edit card title"
                  />
                  <InlineEditor
                    content={jsonToHtml(content.card4_content)}
                    onSave={(html) => handleSaveField('card4_content', html)}
                    className="text-stone-700"
                    placeholder="Click to edit"
                  />
                </div>
              )}

              {isEditMode ? (
                <div className="card md:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                    <Factory className="w-6 h-6 text-sage-700" />
                  </div>
                  <InlineEditor
                    content={`<h2>${content?.industry_title || 'Industry'}</h2>`}
                    onSave={(html) => handleSaveTextOnly('industry_title', html)}
                    className="mb-3 font-serif text-xl font-semibold text-stone-900"
                    placeholder="Click to edit card title"
                  />
                  <InlineEditor
                    content={jsonToHtml(
                      content?.industry_content,
                      'Discover the industrial heritage of Thoralby, from lead mining to traditional crafts that supplemented farming income throughout the centuries.'
                    )}
                    onSave={(html) => handleSaveField('industry_content', html)}
                    className="text-stone-700"
                    placeholder="Click to edit industry"
                  />
                </div>
              ) : (
                <Link to="/townships/thoralby/industry" className="transition-shadow card group hover:shadow-lg md:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg bg-sage-100 group-hover:bg-sage-200">
                    <Factory className="w-6 h-6 text-sage-700" />
                  </div>
                  <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                    {content?.industry_title || 'Industry'}
                  </h2>
                  <p className="text-stone-700" dangerouslySetInnerHTML={{ __html: jsonToHtml(
                    content?.industry_content,
                    'Discover the industrial heritage of Thoralby, from lead mining to traditional crafts that supplemented farming income throughout the centuries.'
                  ) }} />
                </Link>
              )}
            </>
          )}
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.history_section_title || 'Thoralby Through the Ages'}</h2>`}
                onSave={(html) => handleSaveTextOnly('history_section_title', html)}
                className="mb-4 font-serif text-2xl font-semibold text-stone-900"
                placeholder="Click to edit section title"
              />
            )}
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              <InlineEditor
                content={jsonToHtml(
                  content?.history_section_content,
                  'The village name derives from Old Norse, reflecting the area\'s Viking heritage. \'Thoralby\' likely means \'Thor\'s farmstead\', indicating settlement dating back to the 9th or 10th century.'
                )}
                onSave={(html) => handleSaveField('history_section_content', html)}
                className="text-stone-700"
                placeholder="Click to edit history"
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
