import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MapPin, Home as HomeIcon, Church, Landmark } from 'lucide-react';

export function FourTownships() {
  const townships = [
    {
      name: 'Thoralby',
      icon: Church,
      description: 'The largest of the four townships, home to St. Oswald\'s Church with its Norman architecture from the 12th century. Thoralby has served as the traditional center of the parish.',
      highlights: [
        'St. Oswald\'s Church',
        'Village green',
        'Historic stone cottages',
        'The George Inn'
      ]
    },
    {
      name: 'Newbiggin',
      icon: HomeIcon,
      description: 'A scattered hamlet whose name means "new building," reflecting its origins as a medieval settlement. The community has maintained its agricultural character through the centuries.',
      highlights: [
        'Traditional farmsteads',
        'Medieval field patterns',
        'Rural pathways',
        'Stone barns'
      ]
    },
    {
      name: 'Bishopdale',
      icon: Landmark,
      description: 'The valley that gives its name to the wider area, known for its distinctive landscape and farming heritage. The name derives from its historical ownership by the Archbishop of York.',
      highlights: [
        'Bishopdale Beck',
        'Ancient field boundaries',
        'Scattered settlements',
        'Traditional hay meadows'
      ]
    },
    {
      name: 'West Burton',
      icon: MapPin,
      description: 'A picturesque village with one of the largest village greens in England. The village is renowned for its waterfall and traditional Dales architecture.',
      highlights: [
        'Historic village green',
        'Cauldron Falls',
        'Market cross',
        'Stone bridges'
      ]
    }
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'The Four Townships', path: '/four-townships' }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-6">
            The Four Townships
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed">
            Bishopdale is comprised of four historic townships, each with its own distinct character and heritage.
            Together they form a unique community in the heart of the Yorkshire Dales.
          </p>
        </div>

        <div className="card mb-12">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-4">
            A Historic Parish
          </h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            The ecclesiastical parish of Thoralby encompasses four distinct townships that have shared a common
            history for centuries. This medieval administrative structure reflects the traditional organization
            of rural Yorkshire, where scattered settlements were grouped together for ecclesiastical and civil
            purposes.
          </p>
          <p className="text-stone-700 leading-relaxed">
            While each township maintained its own identity and local customs, they were united through the
            parish church at Thoralby and shared responsibilities for maintaining roads, supporting the poor,
            and other communal obligations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {townships.map((township) => {
            const Icon = township.icon;
            return (
              <div key={township.name} className="card">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-sage-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-semibold text-stone-900 mb-2">
                      {township.name}
                    </h3>
                  </div>
                </div>
                <p className="text-stone-700 leading-relaxed mb-4">
                  {township.description}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-2">Notable Features:</h4>
                  <ul className="space-y-2">
                    {township.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-stone-700 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-sage-50 to-parchment-50 rounded-2xl p-8">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-4">
            Community Through the Ages
          </h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            The four townships have shared centuries of history, from medieval farming practices to the
            social changes of the Industrial Revolution and beyond. Each community contributed to the
            broader life of the dale through agriculture, crafts, and trade.
          </p>
          <p className="text-stone-700 leading-relaxed mb-4">
            The people of these townships have long been connected through family ties, shared work on
            the land, and participation in parish life. Church records, estate documents, and census
            returns reveal the intricate web of relationships that bound these communities together.
          </p>
          <p className="text-stone-700 leading-relaxed">
            Today, while modern administrative boundaries have evolved, the four townships remain linked
            by their shared heritage and the enduring beauty of the Bishopdale landscape.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
