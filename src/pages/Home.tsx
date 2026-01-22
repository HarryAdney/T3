import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Clock, Image, Map, ArrowRight, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { usePageContent } from '../hooks/usePageContent';
import { InlineEditor } from '../components/InlineEditor';

const iconMap: Record<string, any> = {
  Users,
  Building2,
  Clock,
  Image,
  Map,
  BookOpen,
};

export function Home() {
  const { page, loading, error, updateContent } = usePageContent('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = page?.content?.heroImages || [];
  const stats = page?.content?.stats || { people: 0, buildings: 0, events: 0, gallery: 0 };

  useEffect(() => {
    if (heroImages.length > 0) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 6500);
      return () => clearInterval(timer);
    }
  }, [heroImages.length]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-4 rounded-full border-stone-200 border-t-sage-600 animate-spin"></div>
            <p className="mt-4 text-stone-600">Loading...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error || !page) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600">Error loading page: {error || 'Page not found'}</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const aboutSection = {
    icon: BookOpen,
    title: page.content.aboutSection?.title || 'About This Project',
    description: page.content.aboutSection?.description || '',
    path: '/about',
    color: 'stone',
    stat: 0,
  };

  const sections = (page.content.sections || []).map((section: any) => ({
    ...section,
    icon: iconMap[section.icon] || Users,
    stat: stats[section.title.toLowerCase().split(' ')[0]] || 0,
    color: section.color || 'sage',
  }));

  return (
    <PageWrapper>
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Thoralby landscape"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/30 to-parchment-50" />
          </motion.div>
        </AnimatePresence>

        <div className="relative flex items-center h-full">
          <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl"
            >
              <InlineEditor
                content={page.content.heroTitle || 'Thoralby Through Time'}
                onSave={async (value) => {
                  await updateContent({ ...page.content, heroTitle: value });
                }}
                className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
              />
              <InlineEditor
                content={page.content.heroSubtitle || 'Discover the rich heritage of Thoralby and Bishopdale through stories, photographs, and maps spanning centuries of Yorkshire Dales history.'}
                onSave={async (value) => {
                  await updateContent({ ...page.content, heroSubtitle: value });
                }}
                className="mb-8 text-xl leading-relaxed md:text-2xl text-parchment-100"
              />
              <div className="flex flex-wrap gap-4">
                <Link to="/gallery" className="bg-white btn-primary text-stone-900 hover:bg-parchment-100">
                  Explore the Archive
                </Link>
                <Link to="/contribute" className="text-white btn-secondary bg-sage-600 hover:bg-sage-700">
                  Share Your Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 space-x-2">
          {heroImages.map((_: string, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <InlineEditor
            content={page.content.collectionsTitle || 'Explore Our Collections'}
            onSave={async (value) => {
              await updateContent({ ...page.content, collectionsTitle: value });
            }}
            className="mb-4 font-serif text-4xl font-semibold text-stone-900"
          />
          <InlineEditor
            content={page.content.collectionsDescription || 'Dive into different aspects of Thoralby\'s history through our curated collections of people, places, events, and photographs.'}
            onSave={async (value) => {
              await updateContent({ ...page.content, collectionsDescription: value });
            }}
            className="max-w-2xl mx-auto text-lg text-stone-600"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="mb-6"
        >
          <Link to={aboutSection.path} className="flex flex-col card group lg:col-span-3">
            <div className={`w-12 h-12 rounded-xl bg-${aboutSection.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <aboutSection.icon className={`w-6 h-6 text-${aboutSection.color}-700`} />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              {aboutSection.title}
            </h3>
            <p className="mb-4 text-stone-700 whitespace-pre-line leading-relaxed">{aboutSection.description}</p>
            
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section: any, index: number) => (
            <motion.div
              key={section.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <Link to={section.path} className="flex flex-col h-full card group">
                <div className={`w-12 h-12 rounded-xl bg-${section.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className={`w-6 h-6 text-${section.color}-700`} />
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-stone-900">
                  {section.title}
                </h3>
                {section.stat > 0 && (
                  <p className="mb-3 text-sm text-stone-500">
                    {section.stat} {section.stat === 1 ? 'item' : 'items'}
                  </p>
                )}
                <p className="flex-1 mb-4 text-stone-600">{section.description}</p>
                <div className="flex items-center font-medium transition-colors text-sage-700 group-hover:text-sage-800">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


        <div className="p-8 text-center text-white bg-gradient-to-r from-sage-600 to-sage-700 rounded-2xl md:p-12">
          <InlineEditor
            content={page.content.ctaSection?.title || 'Help Us Preserve Our Heritage'}
            onSave={async (value) => {
              await updateContent({
                ...page.content,
                ctaSection: { ...page.content.ctaSection, title: value }
              });
            }}
            className="mb-4 font-serif text-3xl font-semibold md:text-4xl"
          />
          <InlineEditor
            content={page.content.ctaSection?.description || 'Do you have photographs, documents, or stories about Thoralby and Bishopdale? We\'d love to hear from you and add your contributions to our archive.'}
            onSave={async (value) => {
              await updateContent({
                ...page.content,
                ctaSection: { ...page.content.ctaSection, description: value }
              });
            }}
            className="max-w-2xl mx-auto mb-6 text-lg text-sage-100"
          />
          <Link
            to="/contribute"
            className="inline-flex items-center px-8 py-4 font-semibold transition-colors bg-white text-sage-700 rounded-xl hover:bg-parchment-50"
          >
            Contribute Your Story
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
