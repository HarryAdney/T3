import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Tractor, Wheat, Home, Users, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { InlineEditor } from '../../../components/InlineEditor';

interface TownshipContent {
  id: string;
  subtitle: string;
  description: any;
}

export function Newbiggin() {
  const [content, setContent] = useState<TownshipContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('townships')
        .select('id, subtitle, description')
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
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Newbiggin
            </h1>
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
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Agricultural Heritage
            </h2>
            <p className="text-stone-700">
              Newbiggin has always been primarily agricultural in character. The hamlet consists
              of working farms that have been in the same families for generations. Traditional
              farming methods have been passed down through centuries, adapting to changing times
              while maintaining connection to the land.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Wheat className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Hay Meadows
            </h2>
            <p className="text-stone-700">
              The area around Newbiggin is particularly noted for its traditional hay meadows.
              These species-rich grasslands, managed according to centuries-old practices,
              burst into color each summer with native wildflowers. Many of these meadows
              are now protected as Sites of Special Scientific Interest.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Home className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Historic Farmsteads
            </h2>
            <p className="text-stone-700">
              Newbiggin's stone farmhouses and barns date primarily from the 17th and 18th
              centuries. These buildings exemplify traditional Dales vernacular architecture,
              built from local limestone with massive stone walls designed to withstand harsh
              winter weather. Many retain their original features and layouts.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Users className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Close Community
            </h2>
            <p className="text-stone-700">
              Despite its small size, Newbiggin has maintained a strong sense of community.
              Families have worked together through seasons of farming, sharing labor during
              hay time and sheep gathering. This mutual support has been essential to survival
              in this challenging environment.
            </p>
          </div>

          <Link to="/townships/newbiggin/industry" className="transition-shadow card group hover:shadow-lg md:col-span-2">
            <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg bg-sage-100 group-hover:bg-sage-200">
              <Factory className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Industry
            </h2>
            <p className="text-stone-700">
              Explore the industries that supplemented farming life in Newbiggin, including
              traditional crafts, hand-knitting, and other cottage industries.
            </p>
          </Link>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 mb-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Life in Newbiggin
            </h2>
            <p className="mb-4 text-stone-700">
              Life in Newbiggin has always revolved around the agricultural calendar. Spring
              lambing, summer haymaking, autumn sheep sales, and winter feeding have structured
              daily life for centuries. The hamlet's isolation meant residents needed to be
              largely self-sufficient, with each farm producing most of what it needed.
            </p>
            <p className="mb-4 text-stone-700">
              During the 18th and 19th centuries, some residents supplemented farm income through
              hand-knitting, a common cottage industry throughout the Dales. Women and children
              would knit stockings and other garments for sale at market, providing essential
              additional income for farming families.
            </p>
            <p className="text-stone-700">
              The hamlet had its own chapel, serving as a place of worship for families who
              found the journey to Thoralby's church difficult, especially in winter. Though
              the chapel is no longer in regular use, it remains an important part of Newbiggin's
              heritage.
            </p>
          </div>

          <div className="p-8 card">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Newbiggin Today
            </h2>
            <p className="mb-4 text-stone-700">
              Today, Newbiggin remains a working agricultural community. While modern machinery
              and methods have changed some aspects of farming, the essential rhythm of life
              tied to the seasons continues. The hamlet's farms remain family-run, with
              knowledge and skills passed from generation to generation.
            </p>
            <p className="text-stone-700">
              The area's natural beauty and tranquility attract walkers who appreciate the
              unspoiled Dales landscape. Yet Newbiggin has retained its character as a genuine
              working hamlet rather than becoming a tourist destination, offering an authentic
              glimpse of traditional Dales farming life.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
