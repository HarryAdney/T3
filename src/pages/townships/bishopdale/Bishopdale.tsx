import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Mountain, Church, Home, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { InlineEditor } from '../../../components/InlineEditor';

interface TownshipContent {
  id: string;
  subtitle: string;
  description: any;
  geography_title: string;
  geography_content: any;
  history_title: string;
  history_content: any;
  communities_title: string;
  communities_content: any;
  industry_title: string;
  industry_content: any;
  today_title: string;
  today_content: any;
}

export function Bishopdale() {
  const [content, setContent] = useState<TownshipContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('townships')
        .select('id, subtitle, description, geography_title, geography_content, history_title, history_content, communities_title, communities_content, industry_title, industry_content, today_title, today_content')
        .eq('slug', 'bishopdale')
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

  const getSubtitle = () => {
    return content?.subtitle || 'The scenic valley that connects our four townships';
  };

  const getDescription = () => {
    return jsonToHtml(
      content?.description,
      'Bishopdale is one of the lesser-known side dales of Wensleydale in the Yorkshire Dales National Park. The valley takes its name from the Bishops of York who held extensive lands here during medieval times.'
    );
  };

  const getGeographyText = () => {
    return jsonToHtml(
      content?.geography_content,
      'The valley stretches from Aysgarth in the east to Kidstones Pass in the west, with Bishopdale Beck running through its heart. Surrounded by limestone fells and traditional field patterns, the landscape is quintessentially Yorkshire Dales.'
    );
  };

  const getHistoryText = () => {
    return jsonToHtml(
      content?.history_content,
      'The dale has been inhabited since medieval times, with evidence of Norse settlement in place names. During the 18th and 19th centuries, lead mining and agriculture were the primary occupations for valley residents.'
    );
  };

  const getCommunitiesText = () => {
    return jsonToHtml(
      content?.communities_content,
      'Four main settlements form the heart of Bishopdale: Thoralby, Newbiggin, West Burton, and Walden. Each maintains its distinct character while sharing a common heritage of farming and rural life.'
    );
  };

  const getIndustryText = () => {
    return jsonToHtml(
      content?.industry_content,
      'Explore the industrial heritage of Bishopdale, including lead mining, quarrying, and traditional crafts that shaped the valley\'s economy and character.'
    );
  };

  const getTodayContent = () => {
    return jsonToHtml(
      content?.today_content,
      'Today, Bishopdale remains a working agricultural valley, with sheep farming continuing as the dominant land use. The valley\'s quiet beauty attracts walkers and visitors seeking an authentic Dales experience away from the busier tourist routes.'
    );
  };

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="/images/hero/bishopdale-beck-1938.webp"
            alt="Bishopdale Beck 1938"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Bishopdale
            </h1>
            {!loading && (
              <InlineEditor
                content={`<p>${getSubtitle()}</p>`}
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
            { label: 'Bishopdale', path: '/townships/bishopdale' },
          ]}
        />

        <div className="mb-12">
          {loading ? (
            <p className="text-lg leading-relaxed text-stone-600">Loading...</p>
          ) : (
            <InlineEditor
              content={getDescription()}
              onSave={(html) => handleSaveField('description', html)}
              className="text-lg leading-relaxed text-stone-600"
              placeholder="Click to edit description"
            />
          )}
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Mountain className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              {loading ? 'Geography' : (content?.geography_title || 'Geography')}
            </h2>
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              <InlineEditor
                content={getGeographyText()}
                onSave={(html) => handleSaveField('geography_content', html)}
                className="text-stone-700"
                placeholder="Click to edit geography"
              />
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Church className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              {loading ? 'History' : (content?.history_title || 'History')}
            </h2>
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              <InlineEditor
                content={getHistoryText()}
                onSave={(html) => handleSaveField('history_content', html)}
                className="text-stone-700"
                placeholder="Click to edit history"
              />
            )}
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Home className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              {loading ? 'Communities' : (content?.communities_title || 'Communities')}
            </h2>
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              <InlineEditor
                content={getCommunitiesText()}
                onSave={(html) => handleSaveField('communities_content', html)}
                className="text-stone-700"
                placeholder="Click to edit communities"
              />
            )}
          </div>

          <Link to="/townships/bishopdale/industry" className="card group hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200 group-hover:bg-parchment-300 transition-colors">
              <Factory className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              {loading ? 'Industry' : (content?.industry_title || 'Industry')}
            </h2>
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              <p className="text-stone-700" dangerouslySetInnerHTML={{ __html: getIndustryText() }} />
            )}
          </Link>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              {loading ? 'Bishopdale Today' : (content?.today_title || 'Bishopdale Today')}
            </h2>
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              <InlineEditor
                content={getTodayContent()}
                onSave={(html) => handleSaveField('today_content', html)}
                className="text-stone-700"
                placeholder="Click to edit today section"
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
