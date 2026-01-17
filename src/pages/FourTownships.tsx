import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageContent } from '../hooks/usePageContent';
import { InlineEditor } from '../components/InlineEditor';
import { useEditMode } from '../contexts/EditModeContext';

export function FourTownships() {
  const { page, loading, error, updateContent } = usePageContent('four-townships');
  const { isEditMode } = useEditMode();

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
            src={page.content.heroImage || '/images/hero/hero-four-townships.webp'}
            alt="Old OS map of the four townships of Bishopdale"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-stone-900/70 to-stone-900/20">
          <div className="text-center text-white">
            <InlineEditor
              value={page.content.heroTitle || 'The Four Townships'}
              onSave={async (value) => {
                await updateContent({ ...page.content, heroTitle: value });
              }}
              className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl"
            />
            <InlineEditor
              value={page.content.heroSubtitle || ''}
              onSave={async (value) => {
                await updateContent({ ...page.content, heroSubtitle: value });
              }}
              className="text-lg md:text-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'The Four Townships', path: '/four-townships' }]} />

        <div className="mb-12">
          {(page.content.townships || []).map((township: any, index: number) => (
            <div key={index} className="mb-8">
              <InlineEditor
                value={township.name || ''}
                onSave={async (value) => {
                  const updatedTownships = [...page.content.townships];
                  updatedTownships[index] = { ...township, name: value };
                  await updateContent({ ...page.content, townships: updatedTownships });
                }}
                className="mb-4 font-serif text-2xl font-semibold text-stone-900"
              />
              <InlineEditor
                value={township.content || ''}
                onSave={async (value) => {
                  const updatedTownships = [...page.content.townships];
                  updatedTownships[index] = { ...township, content: value };
                  await updateContent({ ...page.content, townships: updatedTownships });
                }}
                multiline
                className="text-lg leading-relaxed text-stone-600"
              />
            </div>
          ))}

          <div>
            <InlineEditor
              value={page.content.footer || ''}
              onSave={async (value) => {
                await updateContent({ ...page.content, footer: value });
              }}
              multiline
              className="text-lg leading-relaxed text-stone-600"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
