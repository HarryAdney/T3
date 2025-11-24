import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
