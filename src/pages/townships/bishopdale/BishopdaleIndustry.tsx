import { PageWrapper } from '../../../components/PageWrapper';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { Pickaxe, Mountain, Hammer, Users } from 'lucide-react';

export function BishopdaleIndustry() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Industrial heritage"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Industry in Bishopdale
            </h1>
            <p className="text-lg md:text-xl">
              The industrial heritage that shaped the valley
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Bishopdale', path: '/townships/bishopdale' },
            { label: 'Industry', path: '/townships/bishopdale/industry' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            While agriculture has always been the primary occupation in Bishopdale, various industries
            supplemented farm income and shaped the valley's economy throughout its history. Lead mining,
            quarrying, and traditional crafts all played important roles in the lives of valley residents.
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
              During the 18th and 19th centuries, lead mining was an important source of income
              for many valley families. Mines dotted the surrounding fells, with miners often
              combining this work with small-scale farming. The industry reached its peak in the
              mid-19th century before declining as deposits were exhausted and foreign competition
              increased.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Mountain className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Quarrying
            </h2>
            <p className="text-stone-700">
              Limestone quarrying provided building materials for local construction and road
              maintenance. Small quarries operated throughout the valley, with stone extracted
              for field walls, buildings, and lime burning. The distinctive limestone of the
              area gave Bishopdale's buildings their characteristic appearance.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Hammer className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Traditional Crafts
            </h2>
            <p className="text-stone-700">
              Blacksmiths, wheelwrights, and other craftsmen provided essential services to
              the agricultural community. These skilled tradespeople maintained farm equipment,
              shod horses, and produced the tools necessary for valley life. Their workshops
              were centers of activity and information exchange.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <Users className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Cottage Industries
            </h2>
            <p className="text-stone-700">
              Hand-knitting was practiced by many families, particularly women and children,
              providing important supplementary income. Stockings and other garments were
              produced for sale at markets. This cottage industry was especially important
              during lean agricultural periods.
            </p>
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Industrial Legacy
            </h2>
            <p className="mb-4 text-stone-700">
              The remains of these industries can still be seen throughout Bishopdale. Abandoned
              mine shafts and spoil heaps mark former lead workings on the fells. Old quarry
              sites have been reclaimed by nature but remain visible in the landscape. Stone
              buildings constructed from locally quarried limestone stand as testament to the
              valley's industrial past.
            </p>
            <p className="text-stone-700">
              These industries shaped not just the physical landscape but also the social
              fabric of valley life. The combination of farming and industrial work created
              a distinctive way of life that persisted for generations, binding families
              to the land and to each other through shared labor and common challenges.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
