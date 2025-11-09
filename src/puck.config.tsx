import { Config } from '@measured/puck';

type Props = {
  Hero: { title: string; description: string; imageSrc?: string };
  TextBlock: { content: string; align?: 'left' | 'center' | 'right' };
  ImageBlock: { src: string; alt: string; caption?: string };
  CardGrid: { title: string; cards: Array<{ title: string; description: string; image?: string }> };
  QuoteBlock: { quote: string; author: string; role?: string };
  FeatureCard: { icon: string; iconBg: string; title: string; content: string };
  InfoSection: { title: string; content: string; bgColor?: string };
};

export const config: Config<Props> = {
  root: {
    render: ({ children }) => (
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </div>
    ),
  },
  components: {
    Hero: {
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        imageSrc: { type: 'text', label: 'Image URL' },
      },
      defaultProps: {
        title: 'Welcome to Thoralby Through Time',
        description: 'Discover the rich heritage of Thoralby and Bishopdale',
      },
      render: ({ title, description, imageSrc }) => (
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 object-cover w-full h-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/30 to-parchment-50" />
          <div className="relative flex items-center h-full">
            <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                  {title}
                </h1>
                <p className="text-xl leading-relaxed md:text-2xl text-parchment-100">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    TextBlock: {
      fields: {
        content: { type: 'textarea' },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        content: 'Add your text content here...',
        align: 'left',
      },
      render: ({ content, align }) => (
        <div className={`prose prose-stone max-w-none text-${align || 'left'}`}>
          <p className="leading-relaxed text-stone-700">{content}</p>
        </div>
      ),
    },
    ImageBlock: {
      fields: {
        src: { type: 'text', label: 'Image URL' },
        alt: { type: 'text', label: 'Alt Text' },
        caption: { type: 'text', label: 'Caption (optional)' },
      },
      defaultProps: {
        src: '',
        alt: 'Add your image description here',
      },
      render: ({ src, alt, caption }) => (
        <div className="overflow-hidden sepia-overlay rounded-2xl">
          <img src={src} alt={alt} className="w-full h-auto" />
          {caption && (
            <p className="mt-2 text-sm italic text-center text-stone-600">
              {caption}
            </p>
          )}
        </div>
      ),
    },
    CardGrid: {
      fields: {
        title: { type: 'text' },
        cards: {
          type: 'array',
          arrayFields: {
            title: { type: 'text' },
            description: { type: 'textarea' },
            image: { type: 'text', label: 'Image URL (optional)' },
          },
        },
      },
      defaultProps: {
        title: 'Featured Content',
        cards: [
          {
            title: 'Card Title',
            description: 'Card description goes here',
          },
        ],
      },
      render: ({ title, cards }) => (
        <div>
          {title && (
            <h2 className="mb-8 font-serif text-3xl font-semibold text-stone-900">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards?.map((card, idx) => (
              <div key={idx} className="card">
                {card.image && (
                  <div className="mb-4 overflow-hidden aspect-video rounded-xl sepia-overlay">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <h3 className="mb-2 font-serif text-xl font-semibold text-stone-900">
                  {card.title}
                </h3>
                <p className="text-stone-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    QuoteBlock: {
      fields: {
        quote: { type: 'textarea' },
        author: { type: 'text' },
        role: { type: 'text', label: 'Role/Title (optional)' },
      },
      defaultProps: {
        quote: 'Enter your quote here...',
        author: 'Author Name',
      },
      render: ({ quote, author, role }) => (
        <div className="p-8 border-l-4 bg-sage-50 rounded-2xl border-sage-600">
          <blockquote className="mb-4 font-serif text-xl italic text-stone-900">
            "{quote}"
          </blockquote>
          <div className="text-stone-700">
            <p className="font-semibold">{author}</p>
            {role && <p className="text-sm text-stone-600">{role}</p>}
          </div>
        </div>
      ),
    },
    FeatureCard: {
      fields: {
        icon: {
          type: 'select',
          options: [
            { label: 'Target', value: 'Target' },
            { label: 'Archive', value: 'Archive' },
            { label: 'Users', value: 'Users' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Book', value: 'Book' },
            { label: 'Map', value: 'Map' },
          ],
        },
        iconBg: {
          type: 'select',
          options: [
            { label: 'Sage', value: 'sage' },
            { label: 'Parchment', value: 'parchment' },
            { label: 'Stone', value: 'stone' },
          ],
        },
        title: { type: 'text' },
        content: { type: 'textarea' },
      },
      defaultProps: {
        icon: 'Target',
        iconBg: 'sage',
        title: 'Feature Title',
        content: 'Feature description goes here...',
      },
      render: ({ icon, iconBg, title, content }) => {
        const iconMap: Record<string, React.ReactElement> = {
          Target: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          Archive: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          ),
          Users: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          Heart: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          ),
          Book: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
          Map: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          ),
        };

        const bgClasses = {
          sage: 'bg-sage-100 text-sage-700',
          parchment: 'bg-parchment-200 text-parchment-700',
          stone: 'bg-stone-100 text-stone-700',
        };

        return (
          <div className="mb-8 card">
            <div className="flex items-start mb-4 space-x-4">
              <div className={`w-12 h-12 ${bgClasses[iconBg as keyof typeof bgClasses] || bgClasses.sage} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {iconMap[icon] || iconMap.Target}
              </div>
              <div className="flex-1">
                <h2 className="mb-2 font-serif text-2xl font-semibold text-stone-900">
                  {title}
                </h2>
                <div className="leading-relaxed whitespace-pre-line text-stone-700">
                  {content}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    InfoSection: {
      fields: {
        title: { type: 'text' },
        content: { type: 'textarea' },
        bgColor: {
          type: 'select',
          options: [
            { label: 'Gradient (Sage to Parchment)', value: 'gradient' },
            { label: 'Sage', value: 'sage' },
            { label: 'Parchment', value: 'parchment' },
            { label: 'White', value: 'white' },
          ],
        },
      },
      defaultProps: {
        title: 'Section Title',
        content: 'Section content goes here...',
        bgColor: 'gradient',
      },
      render: ({ title, content, bgColor }) => {
        const bgClasses = {
          gradient: 'bg-gradient-to-r from-sage-50 to-parchment-50',
          sage: 'bg-sage-50',
          parchment: 'bg-parchment-50',
          white: 'bg-white',
        };

        return (
          <div className={`${bgClasses[bgColor as keyof typeof bgClasses] || bgClasses.gradient} rounded-2xl p-8`}>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-stone-900">
              {title}
            </h2>
            <div className="leading-relaxed whitespace-pre-line text-stone-700">
              {content}
            </div>
          </div>
        );
      },
    },
  },
};
