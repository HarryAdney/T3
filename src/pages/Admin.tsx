import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/PageWrapper';
import { Shield, Users, RefreshCw, Mail, User, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'viewer' | 'editor' | 'admin';
  created_at: string;
  updated_at: string;
}

export function Admin() {
  const { user, profile, loading: authLoading, isAdmin, signOut } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user && isAdmin) {
      loadUsers();
    }
  }, [user, isAdmin]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data as UserProfile[]);
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'viewer' | 'editor' | 'admin') => {
    try {
      setUpdating(userId);
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      showMessage('success', 'User role updated successfully');
      await loadUsers();
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="inline-block w-12 h-12 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!isAdmin) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="mb-3 font-serif text-2xl font-bold text-stone-900">
              Admin Access Required
            </h1>
            <p className="mb-6 text-stone-600">
              You don't have permission to access the admin panel. This area is restricted to administrators only.
            </p>
            <div className="p-4 mb-6 rounded-lg bg-stone-50">
              <p className="text-sm text-stone-700">
                <span className="font-medium">Current role:</span>{' '}
                <span className="px-2 py-1 text-xs font-medium rounded bg-stone-200 text-stone-800">
                  {profile?.role || 'viewer'}
                </span>
              </p>
            </div>
            <button
              onClick={signOut}
              className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2 font-serif text-4xl font-bold text-stone-900">
                User Management
              </h1>
              <p className="text-stone-600">
                Manage user roles and permissions
              </p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-sage-500"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg bg-sage-50 border-sage-200">
            <Shield className="w-5 h-5 text-sage-700" />
            <div>
              <p className="text-sm font-medium text-sage-900">
                Signed in as {profile?.email}
              </p>
              <p className="text-xs text-sage-700">
                Role: {profile?.role}
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`flex items-start gap-3 p-4 mb-6 border rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600" />
            )}
            <p
              className={`text-sm ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        <div className="bg-white border rounded-lg shadow-sm border-stone-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-stone-500" />
              <h2 className="text-lg font-semibold text-stone-900">
                All Users ({users.length})
              </h2>
            </div>
            <button
              onClick={loadUsers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-sage-500 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block w-8 h-8 border-4 rounded-full border-sage-600 border-t-transparent animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p className="text-stone-600">No users found</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {users.map((userProfile) => (
                <div key={userProfile.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-sage-100">
                        <User className="w-5 h-5 text-sage-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-stone-900">
                            {userProfile.full_name || 'No name'}
                          </p>
                          {userProfile.id === user.id && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <p className="text-sm text-stone-600">{userProfile.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={userProfile.role}
                        onChange={(e) =>
                          updateUserRole(
                            userProfile.id,
                            e.target.value as 'viewer' | 'editor' | 'admin'
                          )
                        }
                        disabled={updating === userProfile.id || userProfile.id === user.id}
                        className={`px-3 py-2 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                          userProfile.role === 'admin'
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : userProfile.role === 'editor'
                            ? 'bg-sage-50 border-sage-200 text-sage-700'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                      {updating === userProfile.id && (
                        <div className="w-5 h-5 border-2 rounded-full border-sage-600 border-t-transparent animate-spin" />
                      )}
                    </div>
                  </div>
                  {userProfile.id === user.id && (
                    <p className="mt-2 text-xs text-stone-500">
                      You cannot change your own role
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 mt-6 border rounded-lg bg-blue-50 border-blue-200">
          <h3 className="mb-2 font-semibold text-blue-900">Role Descriptions</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>Viewer:</strong> Can view published content only. No editing permissions.
            </p>
            <p>
              <strong>Editor:</strong> Can edit and publish content using the Puck editor.
            </p>
            <p>
              <strong>Admin:</strong> Full access including user management and all editor permissions.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
