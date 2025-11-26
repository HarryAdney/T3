import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';

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
              A tributary valley on the south side of Wensleydale
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Bishopdale Valley', path: '/bishopdale-valley' }]} />

        <div className="mb-12">
          <p className="mb-4 text-lg leading-relaxed text-stone-600">
            Bishopdale, a tributary valley on the south side of Wensleydale, is about eight miles long and is orientated in a south-west to north-east direction from the head of the valley to its mouth. It was glaciated during the Ice Ages and once held a glacial lake called Bishopdale Carr, which dried up in the seventeenth century. Its 'U' shaped profile is typical of valleys that have undergone prolonged glaciation. The valley is drained by Bishopdale Beck, which flows into the River Ure about a mile east of Aysgarth.
          </p>
          <p className="text-lg leading-relaxed text-stone-600">
            The name 'Bishopdale' has nothing to do with bishops or the church in general. It was named after Biscopp, a local lord from the Anglian period of occupation.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
