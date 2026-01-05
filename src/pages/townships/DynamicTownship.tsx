import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Mountain, Church, Home, Factory, Users, TreePine, School, Landmark, Waves, Calendar, Tractor, Wheat, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface TownshipContent {
  id: string;
  name: string;
  slug: string;
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
  history_section_title: string;
  history_section_content: any;
  published: boolean;
}

const iconMap: { [key: string]: any } = {
  Mountain,
  Church,
  Home,
  Factory,
  Users,
  TreePine,
  School,
  Landmark,
  Waves,
  Calendar,
  Tractor,
  Wheat,
  Building2,
};

export function DynamicTownship() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<TownshipContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      loadContent();
    }
  }, [slug]);

  const loadContent = async () => {
    try {
      const { data } = await supabase
        .from('townships')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (data) {
        setContent(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setNotFound(true);
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

  const renderJsonContent = (jsonContent: any) => {
    if (!jsonContent?.content) return null;
    
    return jsonContent.content.map((block: any, idx: number) => {
      const text = block.content?.[0]?.text || '';
      const cleanText = text.replace(/<\/?p>/g, '').trim();
      
      if (!cleanText) return null;
      
      if (block.type === 'heading') {
        const level = block.attrs?.level || 2;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={idx} className="mb-4 font-serif text-xl font-semibold text-stone-900">
            {cleanText}
          </HeadingTag>
        );
      }
      
      return (
        <p key={idx} className={idx < jsonContent.content.length - 1 ? "mb-4 text-stone-700" : "text-stone-700"}>
          {cleanText}
        </p>
      );
    });
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Home;
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

  if (notFound || !content) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">Township Not Found</h1>
            <p className="text-stone-600">The township you're looking for doesn't exist or isn't published yet.</p>
            <Link to="/four-townships" className="inline-block px-6 py-3 mt-4 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
              Back to Four Townships
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const hasCustomCards = content.card1_title || content.card2_title || content.card3_title || content.card4_title;

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src={`/images/hero/${content.slug}-hero.webp`}
            alt={`${content.name} hero`}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback to a default hero image if township-specific image doesn't exist
              (e.target as HTMLImageElement).src = '/images/hero/bishopdale-beck-1938.webp';
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              {content.name}
            </h1>
            {content.subtitle && (
              <p className="text-lg md:text-xl">
                {content.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: content.name, path: `/townships/${content.slug}` },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            {extractTextFromJson(content.description, `Welcome to ${content.name}, one of the historic townships in Bishopdale.`)}
          </p>
        </div>

        {hasCustomCards ? (
          // Custom card layout (like Thoralby)
          <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {content.card1_title && (
              <div className="card">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                  {(() => {
                    const IconComponent = getIcon(content.card1_icon);
                    return <IconComponent className="w-6 h-6 text-sage-700" />;
                  })()}
                </div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  {content.card1_title}
                </h2>
                <div className="text-stone-700">
                  {renderJsonContent(content.card1_content)}
                </div>
              </div>
            )}

            {content.card2_title && (
              <div className="card">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                  {(() => {
                    const IconComponent = getIcon(content.card2_icon);
                    return <IconComponent className="w-6 h-6 text-parchment-700" />;
                  })()}
                </div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  {content.card2_title}
                </h2>
                <div className="text-stone-700">
                  {renderJsonContent(content.card2_content)}
                </div>
              </div>
            )}

            {content.card3_title && (
              <div className="card">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                  {(() => {
                    const IconComponent = getIcon(content.card3_icon);
                    return <IconComponent className="w-6 h-6 text-sage-700" />;
                  })()}
                </div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  {content.card3_title}
                </h2>
                <div className="text-stone-700">
                  {renderJsonContent(content.card3_content)}
                </div>
              </div>
            )}

            {content.card4_title && (
              <Link to={`/townships/${content.slug}/industry`} className="card group hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200 group-hover:bg-parchment-300 transition-colors">
                  {(() => {
                    const IconComponent = getIcon(content.card4_icon);
                    return <IconComponent className="w-6 h-6 text-parchment-700" />;
                  })()}
                </div>
                <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                  {content.card4_title}
                </h2>
                <div className="text-stone-700">
                  {renderJsonContent(content.card4_content)}
                </div>
              </Link>
            )}
          </div>
        ) : (
          // Standard card layout (like Bishopdale)
          <div className="grid gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Mountain className="w-6 h-6 text-sage-700" />
              </div>
              <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                {content.geography_title || 'Geography'}
              </h2>
              <p className="text-stone-700">
                {extractTextFromJson(content.geography_content, 'Geographic information about this township.')}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Church className="w-6 h-6 text-parchment-700" />
              </div>
              <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                {content.history_title || 'History'}
              </h2>
              <p className="text-stone-700">
                {extractTextFromJson(content.history_content, 'Historical information about this township.')}
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Home className="w-6 h-6 text-sage-700" />
              </div>
              <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                {content.communities_title || 'Communities'}
              </h2>
              <p className="text-stone-700">
                {extractTextFromJson(content.communities_content, 'Community information about this township.')}
              </p>
            </div>

            <Link to={`/townships/${content.slug}/industry`} className="card group hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200 group-hover:bg-parchment-300 transition-colors">
                <Factory className="w-6 h-6 text-parchment-700" />
              </div>
              <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                {content.industry_title || 'Industry'}
              </h2>
              <p className="text-stone-700">
                {extractTextFromJson(content.industry_content, 'Industrial heritage of this township.')}
              </p>
            </Link>
          </div>
        )}

        {/* Bottom section */}
        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              {content.today_title || `${content.name} Today`}
            </h2>
            <div>
              {renderJsonContent(content.today_content) || (
                <p className="text-stone-700">
                  Today, {content.name} continues to be an important part of the Bishopdale community, 
                  maintaining its historic character while adapting to modern times.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Custom history section for Thoralby-style layouts */}
        {content.history_section_title && (
          <div className="mt-12 prose prose-stone max-w-none">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-parchment-50 to-sage-50">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
                {content.history_section_title}
              </h2>
              <div>
                {renderJsonContent(content.history_section_content)}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}