import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Heart, Users, Archive, Target } from 'lucide-react';

export function BishopdaleValley() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="/images/hero/bishopdale-valley.webp"
            alt="Bishopdale Valley landscape"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Bishopdale Valley
            </h1>
            <p className="text-lg md:text-xl">
              A project dedicated to preserving and sharing the rich history of Bishopdale
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Bishopdale Valley', path: '/bishopdale-valley' }]} />

        <div className="prose prose-stone max-w-none">
          <div className="card mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-sage-700" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-2">
                  My Mission
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  To collect, preserve, and share the stories, photographs, and records
                  that tell the tale of Thoralby and Bishopdale. I believe that local
                  history matters, and that by understanding where we've come from, we
                  can better appreciate where we are and where we're going.
                </p>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-parchment-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Archive className="w-6 h-6 text-parchment-700" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-2">
                  The Archive
                </h2>
                <p className="text-stone-700 leading-relaxed mb-4">
                  My growing archive includes historical photographs, documents, maps,
                  and personal stories dating back centuries. Each item has been
                  carefully catalogued and preserved for future generations.
                </p>
                <p className="text-stone-700 leading-relaxed">
                  The collection covers all aspects of life in Thoralby and Bishopdale:
                  from farming and industry to education, religion, and community events.
                  I'm particularly interested in ordinary, everyday life as well as
                  extraordinary moments that shaped our community.
                </p>
              </div>
            </div>
          </div>

          <div className="card mb-8">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-sage-700" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-2">
                  Community Involvement
                </h2>
                <p className="text-stone-700 leading-relaxed mb-4">
                  This project belongs to the community. Many of the photographs,
                  stories, and documents in my archive have been generously contributed
                  by local residents and their families.
                </p>
                <p className="text-stone-700 leading-relaxed">
                  If you have memories, photographs, or documents related to Thoralby
                  and Bishopdale that you'd like to share, I'd love to hear from you.
                  Every contribution, no matter how small, helps me build a more
                  complete picture of our shared history.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sage-50 to-parchment-50 rounded-2xl p-8">
            <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-4">
              About Thoralby
            </h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Thoralby is a small village in Bishopdale, one of the side dales of
              Wensleydale in the Yorkshire Dales National Park. The village has a
              rich history dating back to medieval times, with St. Oswald's Church
              featuring Norman architecture from the 12th century.
            </p>
            <p className="text-stone-700 leading-relaxed mb-4">
              Throughout its history, Thoralby has been primarily an agricultural
              community, with farming and sheep rearing forming the backbone of local
              life. The village has also been home to various craftspeople, including
              stonemasons, blacksmiths, and shopkeepers who served the surrounding area.
            </p>
            <p className="text-stone-700 leading-relaxed">
              Today, Thoralby maintains its rural character while welcoming visitors
              who come to enjoy the stunning Yorkshire Dales landscape and explore
              its rich heritage.
            </p>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-stone-600">
              <Heart className="w-5 h-5 text-sage-600 fill-current" />
              <span>Made with love for my community</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
