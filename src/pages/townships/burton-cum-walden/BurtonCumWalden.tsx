import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Landmark, Waves, Calendar, Home, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { InlineEditor } from '../../../components/InlineEditor';
import { useEditMode } from '../../../contexts/EditModeContext';

interface TownshipContent {
  id: string;
  title: string;
  subtitle: string;
  description: any;
  west_burton_title: string;
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
  walden_title: string;
  walden_content: any;
  united_township_title: string;
  united_township_content: any;
}

export function BurtonCumWalden() {
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
          west_burton_title,
          card1_title, card1_content,
          card2_title, card2_content,
          card3_title, card3_content,
          card4_title, card4_content,
          industry_title, industry_content,
          walden_title, walden_content,
          united_township_title, united_township_content
        `)
        .eq('slug', 'burton-cum-walden')
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

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="/images/hero/west-burton-village-green.webp"
            alt="West Burton village green"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            {!loading && (
              <InlineEditor
                content={`<h1>${content?.title || 'Burton-cum-Walden'}</h1>`}
                onSave={(html) => handleSaveTextOnly('title', html)}
                className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl"
                placeholder="Click to edit title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={`<p>${content?.subtitle || 'Two historic settlements united as one township'}</p>`}
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
            { label: 'Burton-cum-Walden', path: '/townships/burton-cum-walden' },
          ]}
        />

        <div className="mb-12">
          {loading ? (
            <p className="text-lg leading-relaxed text-stone-600">Loading...</p>
          ) : (
            <InlineEditor
              content={jsonToHtml(
                content?.description,
                'Burton-cum-Walden is a civil parish combining the village of West Burton with the more remote settlement of Walden. The name \'cum\' means \'with\' in Latin, reflecting the administrative joining of these two distinct communities.'
              )}
              onSave={(html) => handleSaveField('description', html)}
              className="text-lg leading-relaxed text-stone-600"
              placeholder="Click to edit description"
            />
          )}
        </div>

        <div className="mb-12">
          {!loading && (
            <InlineEditor
              content={`<h2>${content?.west_burton_title || 'West Burton'}</h2>`}
              onSave={(html) => handleSaveTextOnly('west_burton_title', html)}
              className="mb-6 font-serif text-3xl font-semibold text-stone-900"
              placeholder="Click to edit section title"
            />
          )}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Landmark className="w-6 h-6 text-sage-700" />
              </div>
              {!loading && (
                <InlineEditor
                  content={`<h3>${content?.card1_title || 'The Village Green'}</h3>`}
                  onSave={(html) => handleSaveTextOnly('card1_title', html)}
                  className="mb-3 font-serif text-xl font-semibold text-stone-900"
                  placeholder="Click to edit card title"
                />
              )}
              {!loading && (
                <InlineEditor
                  content={jsonToHtml(
                    content?.card1_content,
                    "West Burton's expansive village green is one of the finest in the Yorkshire Dales. At its center stands a distinctive market cross dating from the 18th century. The green is surrounded by traditional stone cottages and remains the heart of village life."
                  )}
                  onSave={(html) => handleSaveField('card1_content', html)}
                  className="text-stone-700"
                  placeholder="Click to edit card content"
                />
              )}
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Waves className="w-6 h-6 text-parchment-700" />
              </div>
              {!loading && (
                <InlineEditor
                  content={`<h3>${content?.card2_title || 'Cauldron Falls'}</h3>`}
                  onSave={(html) => handleSaveTextOnly('card2_title', html)}
                  className="mb-3 font-serif text-xl font-semibold text-stone-900"
                  placeholder="Click to edit card title"
                />
              )}
              {!loading && (
                <InlineEditor
                  content={jsonToHtml(
                    content?.card2_content,
                    "Just outside the village, Walden Beck cascades over Cauldron Falls, one of the most picturesque waterfalls in Wensleydale. The falls have been a popular attraction for generations and feature in many historical photographs and paintings of the area."
                  )}
                  onSave={(html) => handleSaveField('card2_content', html)}
                  className="text-stone-700"
                  placeholder="Click to edit card content"
                />
              )}
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Calendar className="w-6 h-6 text-sage-700" />
              </div>
              {!loading && (
                <InlineEditor
                  content={`<h3>${content?.card3_title || 'Annual Feast'}</h3>`}
                  onSave={(html) => handleSaveTextOnly('card3_title', html)}
                  className="mb-3 font-serif text-xl font-semibold text-stone-900"
                  placeholder="Click to edit card title"
                />
              )}
              {!loading && (
                <InlineEditor
                  content={jsonToHtml(
                    content?.card3_content,
                    "West Burton maintains the tradition of its annual feast, celebrated on the first Saturday after St. Bartholomew's Day (24th August). This centuries-old celebration brings together residents and visitors for traditional games, races, and festivities."
                  )}
                  onSave={(html) => handleSaveField('card3_content', html)}
                  className="text-stone-700"
                  placeholder="Click to edit card content"
                />
              )}
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Home className="w-6 h-6 text-parchment-700" />
              </div>
              {!loading && (
                <InlineEditor
                  content={`<h3>${content?.card4_title || 'Traditional Architecture'}</h3>`}
                  onSave={(html) => handleSaveTextOnly('card4_title', html)}
                  className="mb-3 font-serif text-xl font-semibold text-stone-900"
                  placeholder="Click to edit card title"
                />
              )}
              {!loading && (
                <InlineEditor
                  content={jsonToHtml(
                    content?.card4_content,
                    "The village features fine examples of traditional Dales architecture, with many buildings dating from the 17th and 18th centuries. Stone lintels often bear dates and initials of original owners, providing glimpses into the village's past."
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
                    content={`<h3>${content?.industry_title || 'Industry'}</h3>`}
                    onSave={(html) => handleSaveTextOnly('industry_title', html)}
                    className="mb-3 font-serif text-xl font-semibold text-stone-900"
                    placeholder="Click to edit card title"
                  />
                )}
                {!loading && (
                  <InlineEditor
                    content={jsonToHtml(
                      content?.industry_content,
                      "Learn about the industrial activities that shaped Burton-cum-Walden, including lead mining in the fells and traditional trades that supported the community."
                    )}
                    onSave={(html) => handleSaveField('industry_content', html)}
                    className="text-stone-700"
                    placeholder="Click to edit card content"
                  />
                )}
              </div>
            ) : (
              <Link to="/townships/burton-cum-walden/industry" className="transition-shadow card group hover:shadow-lg md:col-span-2">
                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg bg-sage-100 group-hover:bg-sage-200">
                  <Factory className="w-6 h-6 text-sage-700" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  {content?.industry_title || 'Industry'}
                </h3>
                <p className="text-stone-700">
                  {content?.industry_content ?
                    jsonToHtml(content.industry_content).replace(/<\/?p>/g, '') :
                    "Learn about the industrial activities that shaped Burton-cum-Walden, including lead mining in the fells and traditional trades that supported the community."
                  }
                </p>
              </Link>
            )}
          </div>
        </div>

        <div className="mb-12">
          {!loading && (
            <InlineEditor
              content={`<h2>${content?.walden_title || 'Walden'}</h2>`}
              onSave={(html) => handleSaveTextOnly('walden_title', html)}
              className="mb-6 font-serif text-3xl font-semibold text-stone-900"
              placeholder="Click to edit section title"
            />
          )}
          <div className="p-8 card">
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.walden_content,
                  "Walden lies in its own side valley, Walden Dale, which branches off from Bishopdale. This remote settlement sits high on the moorland edge, surrounded by traditional hay meadows and upland pastures.\n\nHistorically, Walden was a collection of scattered farmsteads rather than a nucleated village. The area specialized in hill sheep farming, with families eking out a living from the challenging upland terrain. Evidence of old lead mining workings can still be found in the surrounding fells.\n\nToday, Walden remains one of the most isolated and peaceful corners of the Yorkshire Dales, maintaining traditional farming practices and offering stunning views across the moorland landscape."
                )}
                onSave={(html) => handleSaveField('walden_content', html)}
                className="text-stone-700"
                placeholder="Click to edit content"
              />
            )}
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            {!loading && (
              <InlineEditor
                content={`<h2>${content?.united_township_title || 'A United Township'}</h2>`}
                onSave={(html) => handleSaveTextOnly('united_township_title', html)}
                className="mb-4 font-serif text-2xl font-semibold text-stone-900"
                placeholder="Click to edit section title"
              />
            )}
            {!loading && (
              <InlineEditor
                content={jsonToHtml(
                  content?.united_township_content,
                  "Though geographically separate and quite different in character, West Burton and Walden have long been administratively united. This reflects historical patterns of land ownership and ecclesiastical organization.\n\nTogether, they represent the diversity of Bishopdale's settlements, from West Burton's compact village around its famous green to Walden's scattered farms on the high moorland. Both communities maintain strong connections to their agricultural heritage while adapting to the challenges of modern rural life."
                )}
                onSave={(html) => handleSaveField('united_township_content', html)}
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
