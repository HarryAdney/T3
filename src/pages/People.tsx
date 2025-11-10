import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { User } from 'lucide-react';

export function People() {
  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'People & Families', path: '/people' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">
            People & Families
          </h1>
          <p className="text-lg text-stone-600">
            Discover the stories of families who shaped Thoralby through generations
          </p>
        </div>

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
