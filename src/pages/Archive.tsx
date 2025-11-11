import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FileText, Image as ImageIcon, Map, Users, Calendar, Search } from 'lucide-react';

interface ArchiveCategory {
  id: string;
  name: string;
  icon: typeof FileText;
  count: number;
  description: string;
  path: string;
}

const categories: ArchiveCategory[] = [
  {
    id: 'photos',
    name: 'Photographs',
    icon: ImageIcon,
    count: 127,
    description: 'Historical photographs from 1880s to present day',
    path: '/archive/photographs',
  },
  {
    id: 'documents',
    name: 'Documents',
    icon: FileText,
    count: 89,
    description: 'Parish registers, census records, and official documents',
    path: '/archive/documents',
  },
  {
    id: 'maps',
    name: 'Maps',
    icon: Map,
    count: 34,
    description: 'Historical and modern maps showing landscape evolution',
    path: '/archive/maps',
  },
  {
    id: 'people',
    name: 'People & Families',
    icon: Users,
    count: 156,
    description: 'Family histories and biographical information',
    path: '/archive/people-families',
  },
];

interface RecentItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl?: string;
}

const recentItems: RecentItem[] = [
  {
    id: '1',
    title: 'Thoralby Village Green 1925',
    category: 'Photographs',
    date: '2024-01-15',
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Parish Register 1850-1900',
    category: 'Documents',
    date: '2024-01-10',
  },
  {
    id: '3',
    title: 'Ordnance Survey Map 1893',
    category: 'Maps',
    date: '2024-01-05',
    imageUrl: 'https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    title: 'The Metcalfe Family History',
    category: 'People & Families',
    date: '2023-12-20',
  },
];

export function Archive() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/4552130/pexels-photo-4552130.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Archive shelves with historical documents"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Archive
            </h1>
            <p className="text-lg md:text-xl">
              Explore our collection of photographs, documents, maps, and stories
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Archive', path: '/archive' }]} />

        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute w-5 h-5 text-stone-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search the archive..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-stone-900">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={category.path} className="transition-shadow card hover:shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                    <Icon className="w-6 h-6 text-sage-700" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">
                    {category.name}
                  </h3>
                  <p className="mb-3 text-sm text-stone-600">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-sage-700">
                    <span>{category.count} items</span>
                    <span className="text-stone-400">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-stone-900">
            Recently Added
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recentItems.map((item) => (
              <div key={item.id} className="overflow-hidden transition-shadow cursor-pointer card hover:shadow-lg">
                {item.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-lg -m-6 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-40 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                {!item.imageUrl && (
                  <div className="flex items-center justify-center w-full h-40 mb-4 -m-6 bg-parchment-100">
                    <FileText className="w-12 h-12 text-parchment-400" />
                  </div>
                )}
                <h3 className="mb-2 font-serif text-base font-semibold text-stone-900">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="px-2 py-1 rounded bg-sage-100 text-sage-700">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 text-center rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <FileText className="w-12 h-12 mx-auto mb-4 text-sage-600" />
          <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
            Contribute to the Archive
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-stone-600">
            Do you have photographs, documents, or stories to share? We welcome contributions from anyone
            with connections to Bishopdale. Every item helps preserve our shared heritage.
          </p>
          <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700">
            Get in Touch
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
