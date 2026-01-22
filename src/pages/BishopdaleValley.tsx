import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageContent } from '../hooks/usePageContent';
import { InlineEditor } from '../components/InlineEditor';

export function BishopdaleValley() {
  const { page, loading, error, updateContent } = usePageContent('bishopdale-valley');

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-4 rounded-full border-stone-200 border-t-sage-600 animate-spin"></div>
            <p className="mt-4 text-stone-600">Loading...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error || !page) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600">Error loading page: {error || 'Page not found'}</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="relative h-64 mb-8 overflow-hidden md:h-80 lg:h-96">
        <div className="absolute inset-0 sepia-overlay">
          <img
            src={page.content.heroImage || '/images/hero/bishopdale-valley.webp'}
            alt="Bishopdale Valley landscape"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <InlineEditor
              content={page.content.heroTitle || 'Bishopdale Valley'}
              onSave={async (value) => {
                await updateContent({ ...page.content, heroTitle: value });
              }}
              className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl"
            />
            <InlineEditor
              content={page.content.heroSubtitle || ''}
              onSave={async (value) => {
                await updateContent({ ...page.content, heroSubtitle: value });
              }}
              className="text-lg md:text-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Bishopdale Valley', path: '/bishopdale-valley' }]} />

        <div className="mb-12">
          {(page.content.sections || []).map((section: any, index: number) => {
            if (section.type === 'heading') {
              return (
                <InlineEditor
                  key={index}
                  content={section.content || ''}
                  onSave={async (value) => {
                    const updatedSections = [...page.content.sections];
                    updatedSections[index] = { ...section, content: value };
                    await updateContent({ ...page.content, sections: updatedSections });
                  }}
                  className="mb-4 font-serif text-xl font-bold md:text-xl lg:text-2xl"
                />
              );
            }

            if (section.type === 'image') {
              return (
                <figure key={index} className="my-6">
                  <picture>
                    <img
                      src={section.src || ''}
                      alt={section.alt || ''}
                      className="w-full rounded-lg"
                    />
                  </picture>
                  {section.caption && (
                    <figcaption className="mt-2 text-sm text-center text-stone-600">
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return (
              <InlineEditor
                key={index}
                content={section.content || ''}
                onSave={async (value) => {
                  const updatedSections = [...page.content.sections];
                  updatedSections[index] = { ...section, content: value };
                  await updateContent({ ...page.content, sections: updatedSections });
                }}
                className="mb-4 text-lg leading-relaxed text-stone-600"
              />
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
