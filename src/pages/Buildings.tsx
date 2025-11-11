import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Building2 } from 'lucide-react';

export function Buildings() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historic stone buildings"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Buildings & Places
            </h1>
            <p className="text-lg md:text-xl">
              Explore the historic architecture and landmarks of Bishopdale
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Buildings & Places', path: '/buildings' }]} />

        <div className="text-center py-12">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-stone-300" />
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
