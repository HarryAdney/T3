import { Config } from '@measured/puck';

type Props = {
  Hero: { title: string; description: string; imageSrc?: string };
  TextBlock: { content: string; align?: 'left' | 'center' | 'right' };
  ImageBlock: { src: string; alt: string; caption?: string };
  CardGrid: { title: string; cards: Array<{ title: string; description: string; image?: string }> };
  QuoteBlock: { quote: string; author: string; role?: string };
};

export const config: Config<Props> = {
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
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/30 to-parchment-50" />
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl text-parchment-100 leading-relaxed">
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
          <p className="text-stone-700 leading-relaxed">{content}</p>
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
        src: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg',
        alt: 'Placeholder image',
      },
      render: ({ src, alt, caption }) => (
        <div className="sepia-overlay rounded-2xl overflow-hidden">
          <img src={src} alt={alt} className="w-full h-auto" />
          {caption && (
            <p className="text-sm text-stone-600 mt-2 text-center italic">
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
            <h2 className="text-3xl font-serif font-semibold text-stone-900 mb-8">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards?.map((card, idx) => (
              <div key={idx} className="card">
                {card.image && (
                  <div className="aspect-video overflow-hidden rounded-xl mb-4 sepia-overlay">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
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
        <div className="bg-sage-50 rounded-2xl p-8 border-l-4 border-sage-600">
          <blockquote className="text-xl font-serif text-stone-900 italic mb-4">
            "{quote}"
          </blockquote>
          <div className="text-stone-700">
            <p className="font-semibold">{author}</p>
            {role && <p className="text-sm text-stone-600">{role}</p>}
          </div>
        </div>
      ),
    },
  },
};
