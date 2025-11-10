import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FileText, Download, Calendar } from 'lucide-react';

interface Record {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  fileUrl?: string;
}

const sampleRecords: Record[] = [
  {
    id: '1',
    title: 'Parish Register 1850-1900',
    description: 'Baptisms, marriages, and burials recorded in Thoralby parish',
    year: 1850,
    category: 'Parish Records',
    fileUrl: '#',
  },
  {
    id: '2',
    title: 'Census Records 1891',
    description: 'Detailed census information for Thoralby and surrounding areas',
    year: 1891,
    category: 'Census',
    fileUrl: '#',
  },
  {
    id: '3',
    title: 'Land Registry Documents',
    description: 'Historical property ownership and land use records',
    year: 1875,
    category: 'Land Records',
  },
];

const categories = ['All', 'Parish Records', 'Census', 'Land Records', 'Court Records', 'School Records'];

export function OfficialRecords() {
  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Official Records', path: '/official-records' }]} />

        <div className="mb-12">
          <h1 className="mb-4 font-serif text-4xl font-bold text-stone-900">
            Official Records
          </h1>
          <p className="text-lg text-stone-600">
            Access historical parish registers, census data, and other official documents
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium transition-colors rounded-lg bg-parchment-100 text-stone-700 hover:bg-sage-100 hover:text-sage-900"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleRecords.map((record) => (
            <div key={record.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-sage-100">
                  <FileText className="w-6 h-6 text-sage-700" />
                </div>
                {record.fileUrl && (
                  <button className="p-2 transition-colors rounded-lg hover:bg-parchment-100">
                    <Download className="w-5 h-5 text-stone-600" />
                  </button>
                )}
              </div>

              <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">
                {record.title}
              </h3>

              <div className="flex items-center gap-2 mb-3 text-sm text-stone-500">
                <Calendar className="w-4 h-4" />
                <span>{record.year}</span>
                <span>•</span>
                <span>{record.category}</span>
              </div>

              <p className="text-sm text-stone-600">
                {record.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 mt-12 text-center rounded-2xl bg-gradient-to-r from-sage-50 to-parchment-50">
          <FileText className="w-12 h-12 mx-auto mb-4 text-sage-600" />
          <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">
            Looking for Specific Records?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-stone-600">
            We're continuously digitizing historical documents. If you're searching for specific records or have questions about accessing archives, please get in touch.
          </p>
          <button className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700">
            Contact Us
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
