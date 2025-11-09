import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'viewer' | 'editor' | 'admin';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  hasRole: (role: 'viewer' | 'editor' | 'admin') => boolean;
  isEditor: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile | null;
    } catch (err) {
      console.error('Exception fetching user profile:', err);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await fetchUserProfile(user.id);
      setProfile(userProfile);
    }
  };

  useEffect(() => {
    let mounted = true;
    let isInitialized = false;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          if (mounted) {
            setProfile(userProfile);
          }
        }

        if (mounted) {
          setLoading(false);
          isInitialized = true;
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
          isInitialized = true;
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted || !isInitialized) return;

      // Only update if the session actually changed
      setSession((prevSession) => {
        if (prevSession?.access_token === session?.access_token) {
          return prevSession;
        }
        return session;
      });

      setUser(session?.user ?? null);

      if (session?.user) {
        const userProfile = await fetchUserProfile(session.user.id);
        if (mounted) {
          setProfile(userProfile);
        }
      } else {
        if (mounted) {
          setProfile(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/editor`,
      },
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const hasRole = (role: 'viewer' | 'editor' | 'admin') => {
    if (!profile) return false;

    if (role === 'viewer') {
      return true;
    }

    if (role === 'editor') {
      return profile.role === 'editor' || profile.role === 'admin';
    }

    if (role === 'admin') {
      return profile.role === 'admin';
    }

    return false;
  };

  const isEditor = hasRole('editor');
  const isAdmin = hasRole('admin');

  const value = {
    user,
    profile,
    session,
    loading,
    signInWithPassword,
    signInWithMagicLink,
    signUp,
    signOut,
    hasRole,
    isEditor,
    isAdmin,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
