import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Church, School, Users, TreePine, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface TownshipContent {
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

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('townships')
        .select('subtitle, description, card1_title, card1_icon, card1_content, card2_title, card2_icon, card2_content, card3_title, card3_icon, card3_content, card4_title, card4_icon, card4_content, industry_content, history_section_title, history_section_content')
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

  const extractTextFromJson = (jsonContent: any, defaultText: string = ''): string => {
    if (!jsonContent?.content) return defaultText;
    const text = jsonContent.content
      .map((block: any) => block.content?.[0]?.text || '')
      .join(' ');
    return text.replace(/<\/?p>/g, '').trim() || defaultText;
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Church;
  };

  const renderHistoryContent = () => {
    if (!content?.history_section_content?.content) {
      return (
        <>
          <p className="mb-4 text-stone-700">
            The village name derives from Old Norse, reflecting the area's Viking heritage.
            'Thoralby' likely means 'Thor's farmstead', indicating settlement dating back
            to the 9th or 10th century.
          </p>
          <p className="mb-4 text-stone-700">
            Throughout the medieval period, Thoralby grew as an agricultural settlement,
            with farming remaining the primary occupation. The 18th and 19th centuries
            brought lead mining to the area, supplementing farm income for many families.
          </p>
          <p className="text-stone-700">
            Today, Thoralby continues as a working village with an active community.
            While farming remains important, the village has diversified, with residents
            engaged in various occupations while maintaining strong connections to the
            dale's heritage and traditions.
          </p>
        </>
      );
    }
    return content.history_section_content.content.map((block: any, idx: number) => {
      const text = block.content?.[0]?.text || '';
      const cleanText = text.replace(/<\/?p>/g, '').trim();
      return cleanText ? (
        <p key={idx} className={idx < content.history_section_content.content.length - 1 ? "mb-4 text-stone-700" : "text-stone-700"}>
          {cleanText}
        </p>
      ) : null;
    });
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
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Thoralby
            </h1>
            {!loading && (
              <p className="text-lg md:text-xl">
                {content?.subtitle || 'The principal village of Bishopdale'}
              </p>
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
            <p className="text-lg leading-relaxed text-stone-600">
              {extractTextFromJson(
                content?.description,
                'Thoralby is a small village in Bishopdale, one of the side dales of Wensleydale in the Yorkshire Dales National Park. The village has a rich history dating back to medieval times, with St. Oswald\'s Church featuring Norman architecture from the 12th century.'
              )}
            </p>
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
                  <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                    {content.card1_title}
                  </h2>
                  <p className="text-stone-700">
                    {extractTextFromJson(content.card1_content)}
                  </p>
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
                  <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                    {content.card2_title}
                  </h2>
                  <p className="text-stone-700">
                    {extractTextFromJson(content.card2_content)}
                  </p>
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
                  <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                    {content.card3_title}
                  </h2>
                  <p className="text-stone-700">
                    {extractTextFromJson(content.card3_content)}
                  </p>
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
                  <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                    {content.card4_title}
                  </h2>
                  <p className="text-stone-700">
                    {extractTextFromJson(content.card4_content)}
                  </p>
                </div>
              )}

              <Link to="/townships/thoralby/industry" className="transition-shadow card group hover:shadow-lg md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg bg-sage-100 group-hover:bg-sage-200">
                  <Factory className="w-6 h-6 text-sage-700" />
                </div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  Industry
                </h2>
                <p className="text-stone-700">
                  {extractTextFromJson(
                    content?.industry_content,
                    'Discover the industrial heritage of Thoralby, from lead mining to traditional crafts that supplemented farming income throughout the centuries.'
                  )}
                </p>
              </Link>
            </>
          )}
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              {loading ? 'Loading...' : (content?.history_section_title || 'Thoralby Through the Ages')}
            </h2>
            {loading ? (
              <p className="text-stone-700">Loading...</p>
            ) : (
              renderHistoryContent()
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
