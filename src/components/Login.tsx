import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

type LoginMode = 'signin' | 'magic-link';

export function Login() {
  const { signInWithPassword, signInWithMagicLink } = useAuth();
  const [mode, setMode] = useState<LoginMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error } = await signInWithPassword(email, password);

      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error } = await signInWithMagicLink(email);

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Check your email for the magic link!');
        setEmail('');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-stone-50 to-sage-50">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-sage-100">
              <LogIn className="w-8 h-8 text-sage-700" />
            </div>
            <h1 className="mb-2 font-serif text-3xl font-bold text-stone-900">
              Editor Login
            </h1>
            <p className="text-stone-600">
              Sign in to edit site content
            </p>
          </div>

          <div className="flex mb-6 overflow-hidden border rounded-lg border-stone-200">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                mode === 'signin'
                  ? 'bg-sage-600 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setMode('magic-link')}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                mode === 'magic-link'
                  ? 'bg-sage-600 text-white'
                  : 'bg-white text-stone-700 hover:bg-stone-50'
              }`}
            >
              Magic Link
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
              <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
              <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={handlePasswordSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-stone-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-stone-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-4 transition-colors border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-stone-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-stone-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-4 transition-colors border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
              <div>
                <label htmlFor="magic-email" className="block mb-2 text-sm font-medium text-stone-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-stone-400" />
                  <input
                    id="magic-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-4 transition-colors border rounded-lg border-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  We'll send you a magic link to sign in without a password
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Magic Link'
                )}
              </button>
            </form>
          )}

          <div className="pt-6 mt-6 text-center border-t border-stone-200">
            <p className="text-sm text-stone-600">
              Need access? Contact the site administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
