import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock supabase client for development when environment variables are missing
let supabaseClient: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using mock client for development.');
  supabaseClient = {
    from: (_table: string) => ({
      select: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => Promise.resolve({ data: { publicUrl: '' }, error: null }),
      }),
    },
  };
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;

// Helper function to check if we're using the mock client
export const isUsingMockClient = !supabaseUrl || !supabaseAnonKey;

// Helper function to validate authentication before operations
export const validateAuth = async () => {
  if (isUsingMockClient) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(`Authentication error: ${error.message}`);
  }
  
  if (!user) {
    throw new Error('You must be logged in to save changes.');
  }
  
  return user;
};

export type Database = {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: any;
          meta_description: string;
          published: boolean;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          updated_by: string | null;
        };
        Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pages']['Insert']>;
      };
      townships: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: any;
          industry_content: any;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['townships']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['townships']['Insert']>;
      };
      photographs: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          thumbnail_url: string | null;
          photo_date: string | null;
          photo_year: number | null;
          location: string | null;
          photographer: string | null;
          contributor: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string | null;
          event_year: number;
          decade: number | null;
          category: string;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
