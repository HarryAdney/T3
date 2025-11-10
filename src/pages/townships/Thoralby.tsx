import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Church, School, Users, TreePine } from 'lucide-react';

export function Thoralby() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Thoralby village"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Thoralby
            </h1>
            <p className="text-lg md:text-xl">
              The principal village of Bishopdale
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'The Four Townships', path: '/four-townships' },
            { label: 'Thoralby', path: '/townships/thoralby' },
          ]}
        />

        <div className="mb-12">
          <p className="text-lg leading-relaxed text-stone-600">
            Thoralby is the largest of Bishopdale's four townships and serves as the valley's main settlement.
            With its church, school, and community facilities, Thoralby has long been the social and administrative
            heart of the dale.
          </p>
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2">
          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Church className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              St. Oswald's Church
            </h2>
            <p className="text-stone-700">
              The parish church dates back to the 12th century, featuring Norman architecture.
              The church has served the community for over 800 years and contains fascinating
              historical records and memorials to local families. Its distinctive tower is a
              landmark visible throughout the valley.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <School className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Village School
            </h2>
            <p className="text-stone-700">
              Thoralby's school has educated generations of local children. Though small,
              it has been central to community life, serving families from across the dale.
              The school building and its history reflect the importance of education in
              this rural community.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
              <Users className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Village Green
            </h2>
            <p className="text-stone-700">
              The historic village green has been a gathering place for centuries. Surrounded
              by traditional stone cottages and farm buildings, it remains the focal point of
              community events and celebrations. The green hosts the annual feast and other
              traditional gatherings.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-parchment-200">
              <TreePine className="w-6 h-6 text-parchment-700" />
            </div>
            <h2 className="mb-3 font-serif text-xl font-semibold text-stone-900">
              Traditional Character
            </h2>
            <p className="text-stone-700">
              Thoralby maintains its traditional Dales character with stone-built houses,
              narrow lanes, and working farms. Many buildings date from the 17th and 18th
              centuries, and the village layout reflects centuries of organic growth rather
              than planned development.
            </p>
          </div>
        </div>

        <div className="prose prose-stone max-w-none">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Thoralby Through the Ages
            </h2>
            <p className="mb-4 text-stone-700">
              The village name derives from Old Norse, reflecting the area's Viking heritage.
              'Thoralby' likely means 'Thor's farmstead', indicating settlement dating back
              to the 9th or 10th century.
            </p>
            <p className="mb-4 text-stone-700">
              Throughout the medieval period, Thoralby grew as an agricultural settlement,
              with farming remaining the primary occupation. The 18th and 19th centuries
              brought lead mining to the area, supplementing farm income for many families.
            </p>
            <p className="text-stone-700">
              Today, Thoralby continues as a working village with an active community.
              While farming remains important, the village has diversified, with residents
              engaged in various occupations while maintaining strong connections to the
              dale's heritage and traditions.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
