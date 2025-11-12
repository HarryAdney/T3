import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pickaxe, Mountain, Hammer, Wheat } from 'lucide-react';

export function BurtonCumWaldenIndustry() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Mining heritage"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Industry in Burton-cum-Walden
            </h1>
            <p className="text-lg md:text-xl">
              From fell mining to village trades
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Burton-cum-Walden', path: '/townships/burton-cum-walden' },
            { label: 'Industry', path: '/townships/burton-cum-walden/industry' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            The industries of Burton-cum-Walden reflected its dual character. West Burton's position
            as a substantial village supported various trades, while the remote Walden valley saw
            intensive lead mining activity on the high fells. Together, these activities shaped
            the economic life of the township.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-stone-900">
            West Burton Industries
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Hammer className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Village Crafts
              </h3>
              <p className="text-stone-700">
                West Burton supported blacksmiths, joiners, and other craftsmen essential to
                the agricultural community. The village's size allowed for greater specialization
                than in smaller settlements. Craftsmen's workshops clustered around the village
                green, forming the economic heart of the community.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Wheat className="w-6 h-6 text-parchment-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Mills and Processing
              </h3>
              <p className="text-stone-700">
                Water power from Walden Beck drove mills that processed grain and powered other
                machinery. These mills served the wider area, with farmers bringing grain from
                across the dale. The reliable water supply made West Burton an important
                processing center.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-stone-900">
            Walden Mining Heritage
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Pickaxe className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Lead Mining
              </h3>
              <p className="text-stone-700">
                Walden's high fells contained significant lead deposits that were extensively
                worked during the 18th and 19th centuries. Mining families lived in isolated
                cottages near the workings, enduring harsh conditions for the sake of cash
                income. The industry peaked in the mid-1800s before declining.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Mountain className="w-6 h-6 text-parchment-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Mining Infrastructure
              </h3>
              <p className="text-stone-700">
                The lead mining industry required extensive infrastructure. Smelting mills
                processed the ore, while specially constructed tracks and paths allowed
                transport of materials. Remains of these structures still mark the landscape,
                providing evidence of this important chapter in Walden's history.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              A Diverse Economy
            </h2>
            <p className="mb-4 text-stone-700">
              The combination of village trades and upland mining created a more diverse
              economy than found in purely agricultural settlements. West Burton functioned
              as a commercial and craft center, while Walden's mining provided cash income
              that flowed through the township's economy.
            </p>
            <p className="text-stone-700">
              This industrial diversity helped sustain the population during difficult agricultural
              periods. When farming faced challenges, mining and craft work provided alternative
              income. The interplay between these different economic activities shaped the
              distinctive character of Burton-cum-Walden and left a lasting mark on its
              landscape and communities.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
