import { useState } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, Heart } from 'lucide-react';

export function Contribute() {
  const [formData, setFormData] = useState({
    contributor_name: '',
    contributor_email: '',
    contribution_type: 'story' as 'story' | 'photo' | 'document' | 'correction',
    title: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await (supabase as any)
        .from('contributions')
        .insert([{
          contributor_name: formData.contributor_name,
          contributor_email: formData.contributor_email,
          contribution_type: formData.contribution_type,
          title: formData.title,
          content: formData.content,
        }]);

      if (submitError) throw submitError;

      setIsSubmitted(true);
      setFormData({
        contributor_name: '',
        contributor_email: '',
        contribution_type: 'story',
        title: '',
        content: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit contribution');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageWrapper>
        <div className="max-w-2xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="mb-4 font-serif text-3xl font-semibold text-stone-900">
              Thank You!
            </h1>
            <p className="mb-8 text-lg text-stone-600">
              Your contribution has been received and will be reviewed by our team.
              We appreciate you helping us preserve Thoralby's history.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Submit Another Story
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Share Your Story', path: '/contribute' }]} />

        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 mr-3 text-sage-600" />
            <h1 className="font-serif text-4xl font-semibold md:text-5xl text-stone-900">
              Share Your Story
            </h1>
          </div>
          <p className="max-w-3xl text-lg text-stone-600">
            Your memories and stories are precious pieces of Thoralby's history.
            Help us preserve and share these important connections by contributing
            your personal accounts, photographs, and documents.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-3">
          <div className="card">
            <h3 className="mb-3 font-serif text-lg font-semibold text-stone-900">
              Personal Stories
            </h3>
            <p className="text-sm text-stone-600">
              Share your memories and anecdotes about life in Thoralby and Bishopdale.
              Every story adds to our understanding of the community.
            </p>
          </div>
          <div className="card">
            <h3 className="mb-3 font-serif text-lg font-semibold text-stone-900">
              Historical Photos
            </h3>
            <p className="text-sm text-stone-600">
              Contribute photographs of people, places, and events from the past.
              Images help bring history to life for future generations.
            </p>
          </div>
          <div className="card">
            <h3 className="mb-3 font-serif text-lg font-semibold text-stone-900">
              Documents & Records
            </h3>
            <p className="text-sm text-stone-600">
              Share historical records, letters, or other written materials that
              document the history of our community.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contributor_name"
                  className="block mb-2 text-sm font-medium text-stone-700"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="contributor_name"
                  required
                  value={formData.contributor_name}
                  onChange={(e) =>
                    setFormData({ ...formData, contributor_name: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="contributor_email"
                  className="block mb-2 text-sm font-medium text-stone-700"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="contributor_email"
                  required
                  value={formData.contributor_email}
                  onChange={(e) =>
                    setFormData({ ...formData, contributor_email: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contribution_type"
                className="block mb-2 text-sm font-medium text-stone-700"
              >
                What are you sharing? *
              </label>
              <select
                id="contribution_type"
                required
                value={formData.contribution_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contribution_type: e.target.value as any,
                  })
                }
                className="w-full px-4 py-3 bg-white border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              >
                <option value="story">A personal story or memory</option>
                <option value="photo">A historical photograph</option>
                <option value="document">A historical document</option>
                <option value="correction">A correction or update</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-stone-700"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Give your story or contribution a brief title"
                className="w-full px-4 py-3 border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-stone-700"
              >
                Your Story or Description *
              </label>
              <textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={8}
                placeholder="Please tell us your story or provide details about your contribution. Include dates, names, locations, and any other relevant information that will help us understand and preserve this piece of history."
                className="w-full px-4 py-3 border resize-none rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-stone-600">
                * Required fields - All submissions are reviewed before publication
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sharing Your Story...' : 'Share Your Story'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        <div className="p-6 mt-8 bg-parchment-100 rounded-2xl">
          <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">
            Questions or Need Help?
          </h3>
          <p className="mb-2 text-stone-700">
            If you'd like to discuss your contribution, have questions about the process,
            or need help with digital files, please contact us directly:
          </p>
          <a
            href="mailto:info@thoralbythroughtime.net"
            className="font-medium text-sage-700 hover:text-sage-800"
          >
            info@thoralbythroughtime.net
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}