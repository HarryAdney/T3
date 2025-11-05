import { useState } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle } from 'lucide-react';

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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-semibold text-stone-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-stone-600 mb-8">
              Your contribution has been received and will be reviewed by our team.
              We appreciate you helping us preserve Thoralby's history.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Submit Another Contribution
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Contribute', path: '/contribute' }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
            Contribute Your Story
          </h1>
          <p className="text-lg text-stone-600">
            Help us preserve Thoralby's history by sharing your memories, photographs,
            documents, or corrections to our archive.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-serif font-semibold text-stone-900 mb-4">
            What Can You Contribute?
          </h2>
          <ul className="space-y-3 text-stone-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>
                <strong>Personal Stories:</strong> Memories and anecdotes about life
                in Thoralby and Bishopdale
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>
                <strong>Photographs:</strong> Historical images of people, places,
                and events
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>
                <strong>Documents:</strong> Historical records, letters, or other
                written materials
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>
                <strong>Corrections:</strong> Updates or corrections to existing
                information in our archive
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contributor_name"
                  className="block text-sm font-medium text-stone-700 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="contributor_email"
                  className="block text-sm font-medium text-stone-700 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contribution_type"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Contribution Type *
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
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
              >
                <option value="story">Personal Story or Memory</option>
                <option value="photo">Photograph</option>
                <option value="document">Historical Document</option>
                <option value="correction">Correction or Update</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-stone-700 mb-2"
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
                placeholder="Give your contribution a brief title"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Your Contribution *
              </label>
              <textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={8}
                placeholder="Please provide as much detail as possible. Include dates, names, locations, and any other relevant information."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent resize-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-stone-600">
                * Required fields
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Contribution'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 p-6 bg-parchment-100 rounded-2xl">
          <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2">
            Contact Us Directly
          </h3>
          <p className="text-stone-700 mb-2">
            If you'd prefer to discuss your contribution or have questions, please
            feel free to contact us:
          </p>
          <a
            href="mailto:info@thoralbythroughtime.net"
            className="text-sage-700 hover:text-sage-800 font-medium"
          >
            info@thoralbythroughtime.net
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
