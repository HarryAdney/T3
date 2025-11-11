import { useState } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FileText, Calendar, Search, Filter, BookOpen } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  year: string;
  description: string;
  highlights: string[];
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Parish Register 1850-1900',
    type: 'Parish Records',
    year: '1850-1900',
    description: 'Baptism, marriage, and burial records from St. Oswald\'s Church covering 50 years of parish history.',
    highlights: ['500+ baptism records', '200+ marriage records', '450+ burial records'],
  },
  {
    id: '2',
    title: 'Census Returns 1841',
    type: 'Census',
    year: '1841',
    description: 'Complete census enumeration for Thoralby township showing occupations and household composition.',
    highlights: ['45 households', 'Population: 187', 'Primary occupation: Agriculture'],
  },
  {
    id: '3',
    title: 'Tithe Map and Apportionment',
    type: 'Land Records',
    year: '1838',
    description: 'Detailed survey of land ownership and usage in Bishopdale with accompanying schedule.',
    highlights: ['200+ land parcels', 'Owner names and occupiers', 'Land use classifications'],
  },
  {
    id: '4',
    title: 'School Log Book',
    type: 'Education',
    year: '1875-1920',
    description: 'Daily records from Thoralby School including attendance, curriculum, and notable events.',
    highlights: ['Student attendance patterns', 'Teaching methods', 'School holidays and closures'],
  },
  {
    id: '5',
    title: 'Enclosure Award',
    type: 'Land Records',
    year: '1815',
    description: 'Legal document detailing the enclosure of common lands and allocation to individual owners.',
    highlights: ['Common land divisions', 'New field boundaries', 'Rights of way established'],
  },
  {
    id: '6',
    title: 'Manor Court Rolls',
    type: 'Legal Records',
    year: '1680-1720',
    description: 'Records of the manorial court including land transfers, disputes, and local regulations.',
    highlights: ['Property transactions', 'Legal disputes', 'Local bylaws'],
  },
  {
    id: '7',
    title: 'Parish Accounts',
    type: 'Financial Records',
    year: '1780-1850',
    description: 'Financial records showing parish expenditures on poor relief, church maintenance, and highways.',
    highlights: ['Poor relief payments', 'Church repairs', 'Road maintenance costs'],
  },
  {
    id: '8',
    title: 'Trade Directory Entry',
    type: 'Commercial Records',
    year: '1890',
    description: 'Listing of businesses and tradespeople operating in Thoralby and surrounding area.',
    highlights: ['8 farmers listed', '2 shopkeepers', '1 blacksmith', '1 stonemason'],
  },
];

const documentTypes = ['All Types', 'Parish Records', 'Census', 'Land Records', 'Education', 'Legal Records', 'Financial Records', 'Commercial Records'];

export function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All Types' || doc.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src="https://images.pexels.com/photos/4552130/pexels-photo-4552130.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Historical documents"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Documents
            </h1>
            <p className="text-lg md:text-xl">
              Parish registers, census records, and official documents
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Archive', path: '/archive' },
            { label: 'Documents', path: '/archive/documents' },
          ]}
        />

        <div className="mb-8">
          <p className="text-lg text-stone-600">
            Our document archive contains 89 historical records spanning centuries of Bishopdale history.
            From parish registers to census returns, these documents provide invaluable insights into
            the lives of our ancestors and the administration of the community.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-stone-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
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
              {documentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-stone-600">
          Showing {filteredDocuments.length} of {documents.length} documents
        </div>

        <div className="space-y-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="cursor-pointer card hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-parchment-100">
                  <FileText className="w-6 h-6 text-parchment-700" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl font-semibold text-stone-900">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar className="w-4 h-4" />
                      <span>{doc.year}</span>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-sage-100 text-sage-700">
                    {doc.type}
                  </span>
                  <p className="mb-4 text-stone-700">
                    {doc.description}
                  </p>
                  <div className="pt-4 border-t border-stone-200">
                    <h4 className="mb-2 text-sm font-semibold text-stone-900">Key Information:</h4>
                    <ul className="space-y-1">
                      {doc.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-sage-600 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-stone-300" />
            <p className="text-lg text-stone-600">No documents found matching your criteria.</p>
          </div>
        )}

        <div className="p-8 mt-12 rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <BookOpen className="w-10 h-10 mb-4 text-sage-600" />
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Research Assistance
              </h3>
              <p className="mb-4 text-stone-700">
                Need help finding information in our documents? Our volunteers can assist with research
                queries and help you trace your family history in Bishopdale.
              </p>
              <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700">
                Request Research Help
              </button>
            </div>
            <div>
              <FileText className="w-10 h-10 mb-4 text-parchment-600" />
              <h3 className="mb-3 font-serif text-xl font-semibold text-stone-900">
                Document Access
              </h3>
              <p className="mb-4 text-stone-700">
                Many of our documents are available for viewing by appointment. Contact us to arrange
                a visit to examine original records or request digital copies.
              </p>
              <button className="px-6 py-3 font-medium transition-colors border-2 rounded-lg text-stone-700 border-stone-300 hover:bg-stone-50">
                Arrange Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
