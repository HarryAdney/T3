import { useState } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Users, Search, User, Heart, BookOpen } from 'lucide-react';

interface FamilyProfile {
  id: string;
  surname: string;
  period: string;
  location: string;
  occupation: string;
  description: string;
  notableMembers: string[];
  connections: string[];
}

const families: FamilyProfile[] = [
  {
    id: '1',
    surname: 'Metcalfe',
    period: '1650s-Present',
    location: 'Thoralby',
    occupation: 'Farmers',
    description: 'One of the oldest families in Bishopdale, the Metcalfes have been farming in Thoralby for over 350 years. Multiple branches of the family have remained in the area, maintaining strong connections to the land.',
    notableMembers: [
      'John Metcalfe (1702-1780) - Prominent farmer and churchwarden',
      'Mary Metcalfe (1845-1920) - Local schoolteacher',
      'Thomas Metcalfe (1890-1975) - Last traditional hand scyther',
    ],
    connections: ['Related to the Alderson family', 'Intermarried with Harkers of West Burton'],
  },
  {
    id: '2',
    surname: 'Alderson',
    period: '1700s-1950s',
    location: 'Newbiggin',
    occupation: 'Farmers and Lead Miners',
    description: 'The Alderson family combined upland farming with lead mining work during the 18th and 19th centuries. Known for their hardworking nature and strong Methodist faith.',
    notableMembers: [
      'William Alderson (1780-1855) - Lead miner and lay preacher',
      'Elizabeth Alderson (1820-1895) - Noted for her hand-knitting skills',
      'Robert Alderson (1865-1940) - Last of the family to work in lead mines',
    ],
    connections: ['Related to Metcalfes', 'Connected to Fawcett family of Hawes'],
  },
  {
    id: '3',
    surname: 'Harker',
    period: '1600s-Present',
    location: 'West Burton',
    occupation: 'Farmers and Craftsmen',
    description: 'An extensive family with branches throughout Wensleydale. The West Burton Harkers were particularly associated with the village green and several family members served as parish officials.',
    notableMembers: [
      'Thomas Harker (1750-1825) - Stonemason who worked on local buildings',
      'Ann Harker (1800-1878) - Ran village shop for 50 years',
      'James Harker (1880-1960) - Chronicled local customs and traditions',
    ],
    connections: ['Intermarried with Metcalfes', 'Related to Pratt family'],
  },
  {
    id: '4',
    surname: 'Pratt',
    period: '1750s-1920s',
    location: 'Thoralby',
    occupation: 'Blacksmiths',
    description: 'For three generations, the Pratts ran the blacksmith\'s forge in Thoralby, essential for shoeing horses, making and repairing farm implements, and general ironwork.',
    notableMembers: [
      'George Pratt (1770-1845) - Founded the forge',
      'John Pratt (1805-1880) - Renowned for quality of his work',
      'William Pratt (1850-1925) - Last blacksmith before forge closure',
    ],
    connections: ['Married into Harker family', 'Apprenticed several local boys'],
  },
  {
    id: '5',
    surname: 'Lodge',
    period: '1800s-Present',
    location: 'Bishopdale',
    occupation: 'Farmers',
    description: 'Farming family known for their sheep breeding expertise. The Lodges maintained detailed records of their flock and were early adopters of agricultural improvements.',
    notableMembers: [
      'Matthew Lodge (1820-1895) - Pioneered Swaledale sheep breeding',
      'Sarah Lodge (1860-1940) - Active in local women\'s institute',
      'Henry Lodge (1895-1980) - Wrote about traditional farming methods',
    ],
    connections: ['Connected to Yorkshire Agricultural Society', 'Related to Closes of Askrigg'],
  },
];

const researchTopics = [
  {
    title: 'Family Research',
    description: 'Trace your family history using our parish registers, census records, and personal collections.',
    icon: Users,
  },
  {
    title: 'Individual Biographies',
    description: 'Detailed profiles of notable individuals who shaped life in Bishopdale.',
    icon: User,
  },
  {
    title: 'Family Stories',
    description: 'Personal memories and anecdotes passed down through generations.',
    icon: Heart,
  },
  {
    title: 'Genealogy Resources',
    description: 'Access our guides and resources for researching your Bishopdale ancestry.',
    icon: BookOpen,
  },
];

export function PeopleFamilies() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFamilies = families.filter((family) =>
    family.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/8923139/pexels-photo-8923139.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historical family photograph"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              People & Families
            </h1>
            <p className="text-lg md:text-xl">
              Family histories and biographical information
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Archive', path: '/archive' },
            { label: 'People & Families', path: '/archive/people-families' },
          ]}
        />

        <div className="mb-8">
          <p className="text-lg text-stone-600">
            Our people and families archive contains information on 156 families and individuals
            who lived in Bishopdale over the centuries. Through parish registers, census records,
            personal memories, and photographs, we piece together the stories of the people who
            made this community what it is today.
          </p>
        </div>

        <div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {researchTopics.map((topic) => (
            <div key={topic.title} className="card">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-sage-100">
                <topic.icon className="w-6 h-6 text-sage-700" />
              </div>
              <h3 className="mb-2 font-serif text-base font-semibold text-stone-900">
                {topic.title}
              </h3>
              <p className="text-sm text-stone-600">
                {topic.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-stone-900">
            Featured Families
          </h2>
          <div className="relative">
            <Search className="absolute w-5 h-5 text-stone-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search by surname or occupation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 transition-shadow border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-stone-600">
          Showing {filteredFamilies.length} of {families.length} families
        </div>

        <div className="space-y-6 mb-12">
          {filteredFamilies.map((family) => (
            <div key={family.id} className="card">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-parchment-100">
                  <Users className="w-6 h-6 text-parchment-700" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-serif text-2xl font-semibold text-stone-900">
                    The {family.surname} Family
                  </h3>
                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-stone-600">
                    <span className="font-medium">{family.period}</span>
                    <span>•</span>
                    <span>{family.location}</span>
                    <span>•</span>
                    <span className="italic">{family.occupation}</span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-stone-700">
                {family.description}
              </p>

              <div className="grid gap-4 pt-4 border-t md:grid-cols-2 border-stone-200">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-stone-900">
                    Notable Family Members:
                  </h4>
                  <ul className="space-y-2">
                    {family.notableMembers.map((member, index) => (
                      <li key={index} className="text-sm text-stone-600">
                        <span className="font-medium text-stone-800">
                          {member.split(' - ')[0]}
                        </span>
                        {member.includes(' - ') && (
                          <span className="block ml-4 text-xs text-stone-500">
                            {member.split(' - ')[1]}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {family.connections.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-stone-900">
                      Family Connections:
                    </h4>
                    <ul className="space-y-1">
                      {family.connections.map((connection, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-sage-600 flex-shrink-0" />
                          <span>{connection}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredFamilies.length === 0 && (
          <div className="py-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-stone-300" />
            <p className="text-lg text-stone-600">No families found matching your search.</p>
          </div>
        )}

        <div className="p-8 text-center rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <Users className="w-12 h-12 mx-auto mb-4 text-sage-600" />
          <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
            Research Your Family History
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-stone-600">
            Are you descended from a Bishopdale family? We can help you trace your ancestry using
            our parish registers, census records, and other historical documents. Many visitors
            have discovered fascinating connections to the area through our research assistance.
          </p>
          <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700">
            Start Your Research
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
