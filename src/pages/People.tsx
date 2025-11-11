import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { User } from 'lucide-react';

export function People() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/8815934/pexels-photo-8815934.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historical village community"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              People & Families
            </h1>
            <p className="text-lg md:text-xl">
              Discover the stories of families who shaped Thoralby through generations
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'People & Families', path: '/people' }]} />

        <div className="text-center py-12">
          <User className="w-16 h-16 mx-auto mb-4 text-stone-300" />
          <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
            Coming Soon
          </h3>
          <p className="text-stone-600">
            This section is currently being developed
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
