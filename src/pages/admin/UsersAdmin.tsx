import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageWrapper } from '../../components/PageWrapper';
import { ArrowLeft, Shield, Edit, Trash2, Plus, Users as UsersIcon } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}

export function UsersAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'admin'>('editor');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    checkAuth();
    loadUsers();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
      return;
    }
    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      navigate('/admin');
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      loadUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This will also delete their auth account.')) return;

    try {
      // Delete from auth.users (requires admin privileges)
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Make sure you have admin privileges.');
    }
  };

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(inviteEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
        data: {
          role: inviteRole,
        },
      });

      if (error) throw error;

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: inviteEmail,
            role: inviteRole,
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      alert(`Invite sent to ${inviteEmail}! They will receive an email to set their password.`);
      setShowInviteModal(false);
      setInviteEmail('');
      loadUsers();
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Failed to send invite. Make sure you have admin privileges and the email is valid.');
    } finally {
      setSending(false);
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
            <button onClick={() => navigate('/admin')} className="inline-flex items-center mb-4 space-x-2 text-sage-700 hover:text-sage-800">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="font-serif text-4xl font-bold text-stone-900">User Management</h1>
            <p className="text-stone-600">Manage user accounts and roles</p>
          </div>
          <button onClick={() => setShowInviteModal(true)} className="inline-flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-sage-600 hover:bg-sage-700">
            <Plus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
        </div>

        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <div className="p-6 border-b border-stone-200">
            <h2 className="font-serif text-xl font-semibold text-stone-900">All Users ({users.length})</h2>
          </div>
          <div className="divide-y divide-stone-200">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sage-100">
                    <UsersIcon className="w-6 h-6 text-sage-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">{user.email}</p>
                    <p className="text-sm text-stone-500">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value as 'admin' | 'editor' | 'viewer')}
                    className="px-3 py-2 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 text-stone-400 hover:text-red-600"
                    title="Delete user"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 mt-8 bg-sage-50 rounded-xl">
          <h3 className="mb-2 font-serif text-lg font-semibold text-stone-900">Role Permissions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center mb-2">
                <Shield className="w-5 h-5 mr-2 text-sage-600" />
                <h4 className="font-semibold text-stone-900">Admin</h4>
              </div>
              <ul className="space-y-1 text-sm text-stone-600">
                <li>• Full access to all features</li>
                <li>• Manage users and roles</li>
                <li>• Access media library</li>
                <li>• View version history</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center mb-2">
                <Edit className="w-5 h-5 mr-2 text-sage-600" />
                <h4 className="font-semibold text-stone-900">Editor</h4>
              </div>
              <ul className="space-y-1 text-sm text-stone-600">
                <li>• Edit all content</li>
                <li>• Upload media</li>
                <li>• Create new entries</li>
                <li>• Cannot manage users</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center mb-2">
                <UsersIcon className="w-5 h-5 mr-2 text-sage-600" />
                <h4 className="font-semibold text-stone-900">Viewer</h4>
              </div>
              <ul className="space-y-1 text-sm text-stone-600">
                <li>• View-only access</li>
                <li>• Cannot edit content</li>
                <li>• Can leave comments</li>
                <li>• Limited admin access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-stone-900">Invite User</h2>
              <button onClick={() => setShowInviteModal(false)} className="p-1 text-stone-400 hover:text-stone-600">
                ×
              </button>
            </div>
            <form onSubmit={sendInvite} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-stone-700">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-stone-700">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'editor' | 'admin')}
                  className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 font-semibold text-white rounded-lg bg-sage-600 hover:bg-sage-700 disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Invite'}
              </button>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
