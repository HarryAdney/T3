import { useEffect, useState } from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Mountain, Church, Home, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface TownshipContent {
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
        .select('subtitle, description, geography_title, geography_content, history_title, history_content, communities_title, communities_content, industry_title, industry_content, today_title, today_content')
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

  const extractTextFromJson = (jsonContent: any, defaultText: string = ''): string => {
    if (!jsonContent?.content) return defaultText;
    const text = jsonContent.content
      .map((block: any) => block.content?.[0]?.text || '')
      .join(' ');
    return text.replace(/<\/?p>/g, '').trim() || defaultText;
  };

  const getSubtitle = () => {
    return content?.subtitle || 'The scenic valley that connects our four townships';
  };

  const getDescription = () => {
    return extractTextFromJson(
      content?.description,
      'Bishopdale is one of the lesser-known side dales of Wensleydale in the Yorkshire Dales National Park. The valley takes its name from the Bishops of York who held extensive lands here during medieval times.'
    );
  };

  const getGeographyText = () => {
    return extractTextFromJson(
      content?.geography_content,
      'The valley stretches from Aysgarth in the east to Kidstones Pass in the west, with Bishopdale Beck running through its heart. Surrounded by limestone fells and traditional field patterns, the landscape is quintessentially Yorkshire Dales.'
    );
  };

  const getHistoryText = () => {
    return extractTextFromJson(
      content?.history_content,
      'The dale has been inhabited since medieval times, with evidence of Norse settlement in place names. During the 18th and 19th centuries, lead mining and agriculture were the primary occupations for valley residents.'
    );
  };

  const getCommunitiesText = () => {
    return extractTextFromJson(
      content?.communities_content,
      'Four main settlements form the heart of Bishopdale: Thoralby, Newbiggin, West Burton, and Walden. Each maintains its distinct character while sharing a common heritage of farming and rural life.'
    );
  };

  const getIndustryText = () => {
    return extractTextFromJson(
      content?.industry_content,
      'Explore the industrial heritage of Bishopdale, including lead mining, quarrying, and traditional crafts that shaped the valley\'s economy and character.'
    );
  };

  const getTodayContent = () => {
    if (!content?.today_content?.content) {
      return (
        <>
          <p className="mb-4 text-stone-700">
            Today, Bishopdale remains a working agricultural valley, with sheep farming
            continuing as the dominant land use. The valley's quiet beauty attracts walkers
            and visitors seeking an authentic Dales experience away from the busier tourist routes.
          </p>
          <p className="text-stone-700">
            The valley is home to a close-knit community that maintains strong connections
            to the land and its history. Traditional stone walls, barns, and field patterns
            remain largely intact, offering a window into centuries of rural life.
          </p>
        </>
      );
    }
    return content.today_content.content.map((block: any, idx: number) => {
      const text = block.content?.[0]?.text || '';
      const cleanText = text.replace(/<\/?p>/g, '').trim();
      return cleanText ? (
        <p key={idx} className={idx < content.today_content.content.length - 1 ? "mb-4 text-stone-700" : "text-stone-700"}>
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
              <p className="text-lg md:text-xl">
                {getSubtitle()}
              </p>
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
            <p className="text-lg leading-relaxed text-stone-600">
              {getDescription()}
            </p>
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
              <p className="text-stone-700">
                {getGeographyText()}
              </p>
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
              <p className="text-stone-700">
                {getHistoryText()}
              </p>
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
              <p className="text-stone-700">
                {getCommunitiesText()}
              </p>
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
              <p className="text-stone-700">
                {getIndustryText()}
              </p>
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
              getTodayContent()
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
