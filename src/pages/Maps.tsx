import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Map } from 'lucide-react';

export function Maps() {
  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Maps & Geography', path: '/maps' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">
            Maps & Geography
          </h1>
          <p className="text-lg text-stone-600">
            Compare historical and modern maps to see how the landscape has evolved
          </p>
        </div>

        <div className="text-center py-12">
          <Map className="w-16 h-16 mx-auto mb-4 text-stone-300" />
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
