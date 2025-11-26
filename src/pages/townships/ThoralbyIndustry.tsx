import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pickaxe, Hammer, Scissors, Store } from 'lucide-react';

export function ThoralbyIndustry() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Traditional crafts"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Industry in Thoralby
            </h1>
            <p className="text-lg md:text-xl">
              Trades and crafts that supported village life
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Thoralby', path: '/townships/thoralby' },
            { label: 'Industry', path: '/townships/thoralby/industry' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            As the principal village in Bishopdale, Thoralby was home to various tradespeople and
            craftsmen who served the surrounding agricultural community. These industries and trades
            were essential to daily life, providing services and goods that farms could not produce
            themselves.
          </p>
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2">
          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Pickaxe className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Lead Mining
            </h2>
            <p className="text-stone-700">
              Many Thoralby families participated in lead mining during the 18th and 19th centuries.
              Men would work in the mines on the surrounding fells while maintaining small farms.
              This dual occupation was crucial for family survival, as mining provided cash income
              to supplement farm produce.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Hammer className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Blacksmiths and Wheelwrights
            </h2>
            <p className="text-stone-700">
              The village supported blacksmiths who shod horses, repaired farm equipment, and
              produced iron tools and fittings. Wheelwrights crafted and maintained the wooden
              wheels essential for farm carts. These craftsmen occupied a central position in
              village life, their skills indispensable to the farming community.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Scissors className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Textile Work
            </h2>
            <p className="text-stone-700">
              Hand-knitting was practiced by many Thoralby families, particularly women and
              children. Stockings, gloves, and other woolen items were produced for sale at
              weekly markets. This cottage industry provided important supplementary income,
              especially during winter months when farm work was reduced.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Store className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Village Shops and Services
            </h2>
            <p className="text-stone-700">
              Thoralby supported several shops and public houses that served the wider
              community. General stores provided essential goods that couldn't be produced
              locally. Public houses served as social centers where news was exchanged and
              business conducted. These establishments were vital to village cohesion.
            </p>
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Thoralby as a Service Center
            </h2>
            <p className="mb-4 text-stone-700">
              As the largest settlement in Bishopdale, Thoralby functioned as a service center
              for the surrounding area. The concentration of tradespeople, shops, and the church
              drew people from across the dale. Market days and feast celebrations brought the
              scattered farming community together.
            </p>
            <p className="text-stone-700">
              The village's industries and trades created a more diverse economy than found in
              smaller settlements. This variety of occupations fostered a more complex social
              structure and made Thoralby the natural center of dale life. While agriculture
              remained dominant, the presence of skilled craftsmen and traders gave the village
              its distinctive character as the heart of Bishopdale.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
