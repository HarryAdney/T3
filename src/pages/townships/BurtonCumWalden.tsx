import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Landmark, Waves, Calendar, Home, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BurtonCumWalden() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="/images/hero/west-burton-village-green.webp"
            alt="West Burton village green"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Burton-cum-Walden
            </h1>
            <p className="text-lg md:text-xl">
              Two historic settlements united as one township
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Burton-cum-Walden', path: '/townships/burton-cum-walden' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            Burton-cum-Walden is a civil parish combining the village of West Burton with the more
            remote settlement of Walden. The name 'cum' means 'with' in Latin, reflecting the
            administrative joining of these two distinct communities.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-stone-900">
            West Burton
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Landmark className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                The Village Green
              </h3>
              <p className="text-stone-700">
                West Burton's expansive village green is one of the finest in the Yorkshire Dales.
                At its center stands a distinctive market cross dating from the 18th century.
                The green is surrounded by traditional stone cottages and remains the heart of
                village life.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Waves className="w-6 h-6 text-parchment-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Cauldron Falls
              </h3>
              <p className="text-stone-700">
                Just outside the village, Walden Beck cascades over Cauldron Falls, one of the
                most picturesque waterfalls in Wensleydale. The falls have been a popular
                attraction for generations and feature in many historical photographs and
                paintings of the area.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <Calendar className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Annual Feast
              </h3>
              <p className="text-stone-700">
                West Burton maintains the tradition of its annual feast, celebrated on the
                first Saturday after St. Bartholomew's Day (24th August). This centuries-old
                celebration brings together residents and visitors for traditional games,
                races, and festivities.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
                <Home className="w-6 h-6 text-parchment-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Traditional Architecture
              </h3>
              <p className="text-stone-700">
                The village features fine examples of traditional Dales architecture, with
                many buildings dating from the 17th and 18th centuries. Stone lintels often
                bear dates and initials of original owners, providing glimpses into the
                village's past.
              </p>
            </div>

            <Link to="/townships/burton-cum-walden/industry" className="card group hover:shadow-lg transition-shadow md:col-span-2">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100 group-hover:bg-sage-200 transition-colors">
                <Factory className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Industry
              </h3>
              <p className="text-stone-700">
                Learn about the industrial activities that shaped Burton-cum-Walden, including
                lead mining in the fells and traditional trades that supported the community.
              </p>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-stone-900">
            Walden
          </h2>
          <div className="p-8 card">
            <p className="mb-4 text-stone-700">
              Walden lies in its own side valley, Walden Dale, which branches off from Bishopdale.
              This remote settlement sits high on the moorland edge, surrounded by traditional
              hay meadows and upland pastures.
            </p>
            <p className="mb-4 text-stone-700">
              Historically, Walden was a collection of scattered farmsteads rather than a nucleated
              village. The area specialized in hill sheep farming, with families eking out a living
              from the challenging upland terrain. Evidence of old lead mining workings can still
              be found in the surrounding fells.
            </p>
            <p className="text-stone-700">
              Today, Walden remains one of the most isolated and peaceful corners of the Yorkshire
              Dales, maintaining traditional farming practices and offering stunning views across
              the moorland landscape.
            </p>
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              A United Township
            </h2>
            <p className="mb-4 text-stone-700">
              Though geographically separate and quite different in character, West Burton and
              Walden have long been administratively united. This reflects historical patterns
              of land ownership and ecclesiastical organization.
            </p>
            <p className="text-stone-700">
              Together, they represent the diversity of Bishopdale's settlements, from West
              Burton's compact village around its famous green to Walden's scattered farms
              on the high moorland. Both communities maintain strong connections to their
              agricultural heritage while adapting to the challenges of modern rural life.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
