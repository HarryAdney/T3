import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            role: 'admin',
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: email,
              role: 'admin',
            },
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        alert('Account created successfully! Please check your email to confirm your account, then you can login.');
        setShowSignup(false);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100">
          <Lock className="w-8 h-8 text-sage-700" />
        </div>
        <h1 className="mb-2 font-serif text-3xl font-bold text-center text-stone-900">
          {showForgotPassword ? 'Reset Password' : showSignup ? 'Create Account' : 'Admin Login'}
        </h1>
        <p className="mb-8 text-center text-stone-600">
          {showForgotPassword
            ? 'Enter your email to receive a password reset link'
            : showSignup
            ? 'Create your admin account'
            : 'Sign in to manage content'}
        </p>

        {error && (
          <div className="p-4 mb-6 text-sm border rounded-lg bg-red-50 border-red-200 text-red-800">
            {error}
          </div>
        )}

        {resetSent && (
          <div className="p-4 mb-6 text-sm border rounded-lg bg-green-50 border-green-200 text-green-800">
            Password reset link sent! Check your email.
          </div>
        )}

        <form onSubmit={showForgotPassword ? handleForgotPassword : showSignup ? handleSignup : handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          {!showForgotPassword && (
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          )}

          {showSignup && (
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-stone-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border rounded-lg border-stone-300 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || resetSent}
            className="w-full py-3 font-semibold text-white transition-colors bg-sage-600 rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? showForgotPassword
                ? 'Sending...'
                : showSignup
                ? 'Creating account...'
                : 'Signing in...'
              : showForgotPassword
              ? 'Send Reset Link'
              : showSignup
              ? 'Create Account'
              : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          {!showSignup && (
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(!showForgotPassword);
                setShowSignup(false);
                setError('');
                setResetSent(false);
              }}
              className="block w-full text-sm text-sage-600 hover:text-sage-700 hover:underline"
            >
              {showForgotPassword ? 'Back to login' : 'Forgot password?'}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setShowSignup(!showSignup);
              setShowForgotPassword(false);
              setError('');
              setResetSent(false);
              setPassword('');
              setConfirmPassword('');
            }}
            className="block w-full text-sm text-sage-600 hover:text-sage-700 hover:underline"
          >
            {showSignup ? 'Already have an account? Sign in' : 'Create an account'}
          </button>
        </div>
      </div>
    </div>
  );
}
