import { useState } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Building2, Search, Filter, MapPin, Calendar } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  type: string;
  location: string;
  period: string;
  description: string;
  imageUrl: string;
  status: 'standing' | 'ruins' | 'demolished';
  historicalSignificance: string;
}

const buildings: Building[] = [
  {
    id: '1',
    name: 'St. Oswald\'s Church',
    type: 'Church',
    location: 'Thoralby',
    period: '12th Century (Norman)',
    description: 'The parish church of Thoralby, featuring Norman architecture dating from the 12th century. The church underwent significant restoration in the 1920s but retains many original features including the distinctive tower.',
    imageUrl: 'https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'standing',
    historicalSignificance: 'One of the oldest buildings in Bishopdale, serving as the spiritual center of the community for over 800 years.',
  },
  {
    id: '2',
    name: 'The Old School House',
    type: 'School',
    location: 'Thoralby',
    period: '1870-1960',
    description: 'Built in 1870 to serve the children of Thoralby and surrounding farms. The school operated for 90 years before closing in 1960. Now converted to a private residence.',
    imageUrl: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'standing',
    historicalSignificance: 'Educated generations of local children, with detailed records preserved showing pupils from most Bishopdale families.',
  },
  {
    id: '3',
    name: 'Thoralby Village Hall',
    type: 'Community Building',
    location: 'Thoralby',
    period: '1890-Present',
    description: 'Originally built as a Methodist chapel, this building has served various community functions over the years. Now operates as the village hall hosting local events and gatherings.',
    imageUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'standing',
    historicalSignificance: 'Central to community life, hosting everything from harvest suppers to wartime meetings.',
  },
  {
    id: '4',
    name: 'West Burton Market Cross',
    type: 'Monument',
    location: 'West Burton',
    period: 'Medieval (15th Century)',
    description: 'Standing at the center of West Burton\'s distinctive village green, this medieval market cross marks the location of historic markets and fairs.',
    imageUrl: 'https://images.pexels.com/photos/5255252/pexels-photo-5255252.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'standing',
    historicalSignificance: 'Symbol of West Burton\'s medieval trading heritage and the commercial life of upper Wensleydale.',
  },
  {
    id: '5',
    name: 'Pratt\'s Forge',
    type: 'Blacksmith',
    location: 'Thoralby',
    period: '1770-1925',
    description: 'The village blacksmith\'s forge operated by the Pratt family for three generations. Essential for shoeing horses, making and repairing farm implements.',
    imageUrl: 'https://images.pexels.com/photos/1906385/pexels-photo-1906385.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'ruins',
    historicalSignificance: 'Vital to the agricultural economy, the forge\'s closure marked the transition from horse power to mechanization.',
  },
  {
    id: '6',
    name: 'Bishopdale Lead Smelting Mill',
    type: 'Industrial',
    location: 'Upper Bishopdale',
    period: '1750-1880',
    description: 'Processing mill for lead ore mined from the surrounding fells. The substantial ruins include the chimney flue running up the hillside.',
    imageUrl: 'https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'ruins',
    historicalSignificance: 'Represents the valley\'s important role in Yorkshire\'s lead mining industry, which employed many local families.',
  },
  {
    id: '7',
    name: 'Newbiggin Chapel',
    type: 'Chapel',
    location: 'Newbiggin',
    period: '1820-1950',
    description: 'Small Methodist chapel serving the hamlet of Newbiggin. Known for its simple stone construction and strong local congregation.',
    imageUrl: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'demolished',
    historicalSignificance: 'Reflects the strength of Methodism in the Yorkshire Dales during the 19th and early 20th centuries.',
  },
  {
    id: '8',
    name: 'Street Head Farm',
    type: 'Farmhouse',
    location: 'Bishopdale',
    period: '17th Century',
    description: 'Traditional Dales longhouse with characteristic features including thick stone walls, mullioned windows, and attached barn. Continuously inhabited since construction.',
    imageUrl: 'https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'standing',
    historicalSignificance: 'Excellent example of vernacular Dales architecture, showing how farming families lived and worked.',
  },
];

const buildingTypes = ['All', 'Church', 'School', 'Community Building', 'Monument', 'Blacksmith', 'Industrial', 'Chapel', 'Farmhouse'];
const statusOptions = ['All', 'Standing', 'Ruins', 'Demolished'];

export function BuildingsPlaces() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredBuildings = buildings.filter((building) => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || building.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || building.status === selectedStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'standing': return 'bg-green-100 text-green-800';
      case 'ruins': return 'bg-amber-100 text-amber-800';
      case 'demolished': return 'bg-stone-200 text-stone-700';
      default: return 'bg-stone-100 text-stone-600';
    }
  };

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historic buildings in Bishopdale"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Buildings & Places
            </h1>
            <p className="text-lg md:text-xl">
              Historic architecture and landmarks of Bishopdale
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Archive', path: '/archive' },
            { label: 'Buildings & Places', path: '/archive/buildings-places' },
          ]}
        />

        <div className="mb-8">
          <p className="text-lg text-stone-600">
            My buildings and places archive documents {buildings.length} historic structures in Bishopdale,
            from medieval churches to industrial sites. Each building tells a story about how people
            lived, worked, and worshipped in this Yorkshire Dales valley.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-stone-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-stone-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="py-3 pl-4 pr-10 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            >
              {buildingTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-3 pl-4 pr-10 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-stone-600">
          Showing {filteredBuildings.length} of {buildings.length} buildings
        </div>

        <div className="space-y-6 mb-12">
          {filteredBuildings.map((building) => (
            <div key={building.id} className="card">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={building.imageUrl}
                      alt={building.name}
                      className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-2 font-serif text-2xl font-semibold text-stone-900">
                        {building.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 text-sm rounded-lg bg-sage-100 text-sage-800">
                          {building.type}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-lg capitalize ${getStatusColor(building.status)}`}>
                          {building.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{building.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{building.period}</span>
                    </div>
                  </div>

                  <p className="mb-4 text-stone-700">
                    {building.description}
                  </p>

                  <div className="pt-4 border-t border-stone-200">
                    <h4 className="mb-2 text-sm font-semibold text-stone-900">
                      Historical Significance:
                    </h4>
                    <p className="text-sm text-stone-600">
                      {building.historicalSignificance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBuildings.length === 0 && (
          <div className="py-12 text-center">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-stone-300" />
            <p className="text-lg text-stone-600">No buildings found matching your criteria.</p>
          </div>
        )}

        <div className="p-8 text-center rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-sage-600" />
          <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
            Know About a Building?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-stone-600">
            Do you have information, photographs, or memories about buildings in Bishopdale?
            I'm especially interested in structures that no longer exist or have been significantly altered.
            Every detail helps build a complete picture of our architectural heritage.
          </p>
          <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700">
            Contact Me
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
