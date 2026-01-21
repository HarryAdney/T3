import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Tractor, Wheat, Home, Users, Factory } from 'lucide-react';
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
  card1_content: any;
  card2_title: string;
  card2_content: any;
  card3_title: string;
  card3_content: any;
  card4_title: string;
  card4_content: any;
  industry_title: string;
  industry_content: any;
  history_section_title: string;
  history_section_content: any;
  today_title: string;
  today_content: any;
}

export function Newbiggin() {
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
          card1_title, card1_content,
          card2_title, card2_content,
          card3_title, card3_content,
          card4_title, card4_content,
          industry_title, industry_content,
          history_section_title, history_section_content,
          today_title, today_content
        `)
        .eq('slug', 'newbiggin')
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

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Rural Yorkshire Dales landscape"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            {!loading && (
              <InlineEditor
                content={`<h1>${content?.title || 'Newbiggin'}</h1>`}
                onSave={(html) => handleSaveTextOnly('title', html)}
                className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl"
                placeholder="Click to edit title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={`<p>${content?.subtitle || 'A quiet hamlet steeped in farming tradition'}</p>`}
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
            { label: 'Newbiggin', path: '/townships/newbiggin' },
          ]}
        />

        <div className="mb-12">
          {loading ? (
            <p className="text-lg leading-relaxed text-stone-600">Loading...</p>
          ) : (
            <InlineEditor
              content={jsonToHtml(
                content?.description,
                'The name of Newbiggin suggests that it was settled somewhat later than Thoralby, since it means \'new building\'. The village must have been established after the Norman Conquest because it was not mentioned in the Domesday Book, whereas smaller settlements like Croxby and Eshington were. \'Bigging\' is a Middle English word that did not come into use until around 1150. So, Newbiggin will have been settled some time between 1150 and 1298, the date of the oldest surviving documentary reference to it. The village appears to have been established to house the foresters responsible for the maintenance of Bishopdale Chase, which was held by the lords of Middleham and reserved for hunting. Similar foresters\' villages were established in the 12th or 13th century at Bainbridge for the Forest of Wensleydale and at Buckden for Langstrothdale Chase.'
              )}
              onSave={(html) => handleSaveField('description', html)}
              className="text-lg leading-relaxed text-stone-600"
              placeholder="Click to edit description"
            />
          )}
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2">
          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Tractor className="w-6 h-6 text-sage-700" />
            </div>
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.card1_title || 'Agricultural Heritage'}</h2>`}
                onSave={(html) => handleSaveTextOnly('card1_title', html)}
                className="mb-3 font-serif text-xl font-semibold text-stone-900"
                placeholder="Click to edit card title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.card1_content,
                  'Newbiggin has always been primarily agricultural in character. The hamlet consists of working farms that have been in the same families for generations. Traditional farming methods have been passed down through centuries, adapting to changing times while maintaining connection to the land.'
                )}
                onSave={(html) => handleSaveField('card1_content', html)}
                className="text-stone-700"
                placeholder="Click to edit card content"
              />
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Wheat className="w-6 h-6 text-parchment-700" />
            </div>
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.card2_title || 'Hay Meadows'}</h2>`}
                onSave={(html) => handleSaveTextOnly('card2_title', html)}
                className="mb-3 font-serif text-xl font-semibold text-stone-900"
                placeholder="Click to edit card title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.card2_content,
                  'The area around Newbiggin is particularly noted for its traditional hay meadows. These species-rich grasslands, managed according to centuries-old practices, burst into color each summer with native wildflowers. Many of these meadows are now protected as Sites of Special Scientific Interest.'
                )}
                onSave={(html) => handleSaveField('card2_content', html)}
                className="text-stone-700"
                placeholder="Click to edit card content"
              />
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Home className="w-6 h-6 text-sage-700" />
            </div>
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.card3_title || 'Historic Farmsteads'}</h2>`}
                onSave={(html) => handleSaveTextOnly('card3_title', html)}
                className="mb-3 font-serif text-xl font-semibold text-stone-900"
                placeholder="Click to edit card title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.card3_content,
                  'Newbiggin\'s stone farmhouses and barns date primarily from the 17th and 18th centuries. These buildings exemplify traditional Dales vernacular architecture, built from local limestone with massive stone walls designed to withstand harsh winter weather. Many retain their original features and layouts.'
                )}
                onSave={(html) => handleSaveField('card3_content', html)}
                className="text-stone-700"
                placeholder="Click to edit card content"
              />
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Users className="w-6 h-6 text-parchment-700" />
            </div>
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.card4_title || 'Close Community'}</h2>`}
                onSave={(html) => handleSaveTextOnly('card4_title', html)}
                className="mb-3 font-serif text-xl font-semibold text-stone-900"
                placeholder="Click to edit card title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.card4_content,
                  'Despite its small size, Newbiggin has maintained a strong sense of community. Families have worked together through seasons of farming, sharing labor during hay time and sheep gathering. This mutual support has been essential to survival in this challenging environment.'
                )}
                onSave={(html) => handleSaveField('card4_content', html)}
                className="text-stone-700"
                placeholder="Click to edit card content"
              />
            )}
          </div>

          {isEditMode ? (
            <div className="card md:col-span-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Factory className="w-6 h-6 text-sage-700" />
              </div>
              {!loading && (
                <InlineEditor
                  content={`<h2>${content?.industry_title || 'Industry'}</h2>`}
                  onSave={(html) => handleSaveTextOnly('industry_title', html)}
                  className="mb-3 font-serif text-xl font-semibold text-stone-900"
                  placeholder="Click to edit card title"
                />
              )}
              {!loading && (
                <InlineEditor
                  content={jsonToHtml(
                    content?.industry_content,
                    'Explore the industries that supplemented farming life in Newbiggin, including traditional crafts, hand-knitting, and other cottage industries.'
                  )}
                  onSave={(html) => handleSaveField('industry_content', html)}
                  className="text-stone-700"
                  placeholder="Click to edit card content"
                />
              )}
            </div>
          ) : (
            <Link to="/townships/newbiggin/industry" className="transition-shadow card group hover:shadow-lg md:col-span-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg bg-sage-100 group-hover:bg-sage-200">
                <Factory className="w-6 h-6 text-sage-700" />
              </div>
              <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                {content?.industry_title || 'Industry'}
              </h2>
              <p className="text-stone-700">
                {content?.industry_content ?
                  jsonToHtml(content.industry_content).replace(/<\/?p>/g, '') :
                  'Explore the industries that supplemented farming life in Newbiggin, including traditional crafts, hand-knitting, and other cottage industries.'
                }
              </p>
            </Link>
          )}
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 mb-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.history_section_title || 'Life in Newbiggin'}</h2>`}
                onSave={(html) => handleSaveTextOnly('history_section_title', html)}
                className="mb-4 font-serif text-2xl font-semibold text-stone-900"
                placeholder="Click to edit section title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.history_section_content,
                  'Life in Newbiggin has always revolved around the agricultural calendar. Spring lambing, summer haymaking, autumn sheep sales, and winter feeding have structured daily life for centuries. The hamlet\'s isolation meant residents needed to be largely self-sufficient, with each farm producing most of what it needed.\n\nDuring the 18th and 19th centuries, some residents supplemented farm income through hand-knitting, a common cottage industry throughout the Dales. Women and children would knit stockings and other garments for sale at market, providing essential additional income for farming families.\n\nThe hamlet had its own chapel, serving as a place of worship for families who found the journey to Thoralby\'s church difficult, especially in winter. Though the chapel is no longer in regular use, it remains an important part of Newbiggin\'s heritage.'
                )}
                onSave={(html) => handleSaveField('history_section_content', html)}
                className="text-stone-700"
                placeholder="Click to edit content"
              />
            )}
          </div>

          <div className="p-8 card">
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.today_title || 'Newbiggin Today'}</h2>`}
                onSave={(html) => handleSaveTextOnly('today_title', html)}
                className="mb-4 font-serif text-2xl font-semibold text-stone-900"
                placeholder="Click to edit section title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.today_content,
                  'Today, Newbiggin remains a working agricultural community. While modern machinery and methods have changed some aspects of farming, the essential rhythm of life tied to the seasons continues. The hamlet\'s farms remain family-run, with knowledge and skills passed from generation to generation.\n\nThe area\'s natural beauty and tranquility attract walkers who appreciate the unspoiled Dales landscape. Yet Newbiggin has retained its character as a genuine working hamlet rather than becoming a tourist destination, offering an authentic glimpse of traditional Dales farming life.'
                )}
                onSave={(html) => handleSaveField('today_content', html)}
                className="text-stone-700"
                placeholder="Click to edit content"
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
