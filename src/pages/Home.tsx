import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Clock, Image, Map, ArrowRight, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { supabase } from '../lib/supabase';
import { sampleImages } from '../config/sampleImages';

interface Photograph {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  thumbnail_url?: string;
  photo_date?: string;
  photo_year?: number;
  location?: string;
  photographer?: string;
  contributor?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

const heroImages: string[] = [
  // Using sample images for demonstration
  ...sampleImages.hero,
  // Replace with your own image URLs for production
  // 'https://your-domain.com/images/hero1.jpg',
  // 'https://your-domain.com/images/hero2.jpg',
  // 'https://your-domain.com/images/hero3.jpg',
  // 'https://your-domain.com/images/hero4.jpg',
];

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [latestPhotos, setLatestPhotos] = useState<Photograph[]>([]);
  const [stats, setStats] = useState({ people: 0, buildings: 0, events: 0, gallery: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const [peopleRes, buildingsRes, eventsRes, photosRes, latestPhotosRes] = await Promise.all([
        supabase.from('people').select('id', { count: 'exact', head: true }),
        supabase.from('buildings').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('photographs').select('id', { count: 'exact', head: true }),
        supabase.from('photographs').select('*').order('created_at', { ascending: false }).limit(3),
      ]);

      setStats({
        people: peopleRes.count || 0,
        buildings: buildingsRes.count || 0,
        events: eventsRes.count || 0,
        gallery: photosRes.count || 0,
      });

      if (latestPhotosRes.data) {
        setLatestPhotos(latestPhotosRes.data);
      }
    }

    fetchData();
  }, []);

  const sections = [
    {
      icon: Users,
      title: 'People & Families',
      description: 'Discover the stories of families who shaped Thoralby through generations.',
      path: '/people',
      color: 'sage',
      stat: stats.people,
    },
    {
      icon: Building2,
      title: 'Buildings & Places',
      description: 'Explore the historic architecture and landmarks of Bishopdale.',
      path: '/buildings',
      color: 'parchment',
      stat: stats.buildings,
    },
    {
      icon: Clock,
      title: 'Historical Timeline',
      description: 'Journey through centuries of events that defined our community.',
      path: '/timeline',
      color: 'stone',
      stat: stats.events,
    },
    {
      icon: Image,
      title: 'Photo Archive',
      description: 'Browse our collection of historical photographs and images.',
      path: '/gallery',
      color: 'sage',
      stat: stats.gallery,
    },
    {
      icon: Map,
      title: 'Maps & Geography',
      description: 'Compare historical and modern maps of Thoralby and surroundings.',
      path: '/maps',
      color: 'parchment',
      stat: 0,
    },
    {
      icon: BookOpen,
      title: 'About This Project',
      description: 'Learn about our mission to preserve local history for future generations.',
      path: '/about',
      color: 'stone',
      stat: 0,
    },
  ];

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
              <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Thoralby Through Time
              </h1>
              <p className="mb-8 text-xl leading-relaxed md:text-2xl text-parchment-100">
                Discover the rich heritage of Thoralby and Bishopdale through stories,
                photographs, and maps spanning centuries of Yorkshire Dales history.
              </p>
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
          {heroImages.map((_, index) => (
            <button
              key={index}
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
          <h2 className="mb-4 font-serif text-4xl font-semibold text-stone-900">
            Explore Our Collections
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-stone-600">
            Dive into different aspects of Thoralby's history through our curated
            collections of people, places, events, and photographs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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

        {latestPhotos.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="mb-2 font-serif text-3xl font-semibold text-stone-900">
                  Latest Additions
                </h2>
                <p className="text-stone-600">
                  Recently added to our growing archive
                </p>
              </div>
              <Link
                to="/gallery"
                className="flex items-center font-medium transition-colors text-sage-700 hover:text-sage-800"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {latestPhotos.map((photo) => (
                <Link
                  key={photo.id}
                  to={`/gallery/${photo.id}`}
                  className="block group"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-4 sepia-overlay">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mb-1 font-serif text-lg font-medium transition-colors text-stone-900 group-hover:text-sage-700">
                    {photo.title}
                  </h3>
                  {photo.photo_year && (
                    <p className="text-sm text-stone-500">{photo.photo_year}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 text-center text-white bg-gradient-to-r from-sage-600 to-sage-700 rounded-2xl md:p-12">
          <h2 className="mb-4 font-serif text-3xl font-semibold md:text-4xl">
            Help Us Preserve Our Heritage
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg text-sage-100">
            Do you have photographs, documents, or stories about Thoralby and Bishopdale?
            We'd love to hear from you and add your contributions to our archive.
          </p>
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
