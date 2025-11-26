import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';

interface Township {
  id: string;
  name: string;
  slug: string;
  published: boolean;
  updated_at: string;
}

export function TownshipsList() {
  const [townships, setTownships] = useState<Township[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadTownships();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    }
  };

  const loadTownships = async () => {
    try {
      const { data, error } = await supabase
        .from('townships')
        .select('*')
        .order('name');

      if (error) throw error;
      setTownships(data || []);
    } catch (error) {
      console.error('Error loading townships:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-stone-600">Loading...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center mb-4 space-x-2 text-sage-700 hover:text-sage-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="font-serif text-4xl font-bold text-stone-900">
              Townships
            </h1>
          </div>
          <Link
            to="/admin/townships/new"
            className="inline-flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-sage-600 rounded-lg hover:bg-sage-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Township</span>
          </Link>
        </div>

        <div className="space-y-4">
          {townships.map((township) => (
            <div
              key={township.id}
              className="flex items-center justify-between p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
            >
              <div>
                <h3 className="mb-1 font-serif text-xl font-semibold text-stone-900">
                  {township.name}
                </h3>
                <p className="text-sm text-stone-600">
                  /{township.slug}
                  {!township.published && (
                    <span className="ml-2 text-amber-600">(Draft)</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Last updated: {new Date(township.updated_at).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/admin/townships/${township.id}`}
                className="inline-flex items-center px-4 py-2 space-x-2 text-stone-700 transition-colors bg-stone-100 rounded-lg hover:bg-stone-200"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
