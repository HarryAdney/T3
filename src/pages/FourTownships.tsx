import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function FourTownships() {
  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Yorkshire Dales villages"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              The Four Townships
            </h1>
            <p className="text-lg md:text-xl">
              Thoralby, Bishopdale, Burton-cum-Walden, and Newbiggin
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'The Four Townships', path: '/four-townships' }]} />

        <div className="mb-12">
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Thoralby Township
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              The present-day township comprises 2,857 acres. The houses outside the main village are to the east, Spickles Farm and Riddings and to the west Gayle Ing, Barker, Cote Bottom, Blind Syke, Swinacote, Howsyke, Crooksby and Littleburn.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Bishopdale Township
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              The present-day township comprises 4,728 acres. There has been no village in the township since Croxby became depopulated in the Middle Ages, since when the township boundaries have changed, placing the remains of Croxby in Thoralby township. The scattered farms and houses that make up Bishopdale are Dale Head, Howgill, Kidstones, Longridge, Newhouse, The Rookery (Coach House), Scar Top, Smelter, Myres Garth, Ribba Hall, Underscarr, The Old School House, Newhouse Gill and Dalefoot.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Burton-cum-Walden Township
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              The present-day township comprises 7,659 acres. It occupies the lower ends of the valleys of Bishopdale and Walden and includes the village of West Burton, including the Black Bull, Flanders Hall, How Raine, Sorrelsykes, Morpeth Gate, Edgley, Adams Bottoms, Brown Lea, and Eshington. The valley of Walden includes Riddings, Cote, White Row, High and Low Dove Scarr, Chapel Green, Nell Bank, Bridge End, Ashes, Grange Farm, Uncles Farm, Kentucky House, Walden Head, Rowton Gill, Hill Top, Haw, Hargill, Cowston Gill, Cross and Forelands. Nellholme, Hestholme and Hestholme East, formerly a detached part of Thoralby township, are now part of Burton-cum-Walden township.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              Newbiggin Township
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              The present-day township comprises 1,696 acres. The houses outside the main village are The Street Head Inn, Cross Lanes Farm, The Bunkhouse (formerly Cross Lanes School), East Lane House, West Lane House, and Misty Field.
            </p>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-stone-600">
              All four townships are in the Wapentake of Hang West, formerly in the North Riding of Yorkshire and are now in the county of North Yorkshire. See diagram below.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
