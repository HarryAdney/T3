import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Clock, Image, Map, ArrowRight, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { supabase } from '../lib/supabase';

const heroImages = [
  'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg',
  'https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg',
  'https://images.pexels.com/photos/442583/pexels-photo-442583.jpeg',
  'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg',
];

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [latestPhotos, setLatestPhotos] = useState<any[]>([]);
  const [stats, setStats] = useState({ people: 0, buildings: 0, events: 0, photos: 0 });

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
        photos: photosRes.count || 0,
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
      path: '/photos',
      color: 'sage',
      stat: stats.photos,
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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/30 to-parchment-50" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Thoralby Through Time
              </h1>
              <p className="text-xl md:text-2xl text-parchment-100 mb-8 leading-relaxed">
                Discover the rich heritage of Thoralby and Bishopdale through stories,
                photographs, and maps spanning centuries of Yorkshire Dales history.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/photos" className="btn-primary bg-white text-stone-900 hover:bg-parchment-100">
                  Explore the Archive
                </Link>
                <Link to="/contribute" className="btn-secondary bg-sage-600 text-white hover:bg-sage-700">
                  Share Your Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-6">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Dive into different aspects of Thoralby's history through our curated
            collections of people, places, events, and photographs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={section.path} className="card group h-full flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-${section.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className={`w-6 h-6 text-${section.color}-700`} />
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                  {section.title}
                </h3>
                {section.stat > 0 && (
                  <p className="text-sm text-stone-500 mb-3">
                    {section.stat} {section.stat === 1 ? 'item' : 'items'}
                  </p>
                )}
                <p className="text-stone-600 mb-4 flex-1">{section.description}</p>
                <div className="flex items-center text-sage-700 font-medium group-hover:text-sage-800 transition-colors">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {latestPhotos.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-stone-900 mb-2">
                  Latest Additions
                </h2>
                <p className="text-stone-600">
                  Recently added to our growing archive
                </p>
              </div>
              <Link
                to="/photos"
                className="text-sage-700 hover:text-sage-800 font-medium flex items-center transition-colors"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPhotos.map((photo) => (
                <Link
                  key={photo.id}
                  to={`/photos/${photo.id}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-4 sepia-overlay">
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-1 group-hover:text-sage-700 transition-colors">
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

        <div className="bg-gradient-to-r from-sage-600 to-sage-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Help Us Preserve Our Heritage
          </h2>
          <p className="text-lg text-sage-100 mb-6 max-w-2xl mx-auto">
            Do you have photographs, documents, or stories about Thoralby and Bishopdale?
            We'd love to hear from you and add your contributions to our archive.
          </p>
          <Link
            to="/contribute"
            className="inline-flex items-center px-8 py-4 bg-white text-sage-700 rounded-xl font-semibold hover:bg-parchment-50 transition-colors"
          >
            Contribute Your Story
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
