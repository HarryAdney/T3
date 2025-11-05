export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      people: {
        Row: {
          id: string
          first_name: string
          last_name: string
          maiden_name: string | null
          birth_year: number | null
          death_year: number | null
          occupation: string | null
          biography: string
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          maiden_name?: string | null
          birth_year?: number | null
          death_year?: number | null
          occupation?: string | null
          biography?: string
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          maiden_name?: string | null
          birth_year?: number | null
          death_year?: number | null
          occupation?: string | null
          biography?: string
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      buildings: {
        Row: {
          id: string
          name: string
          address: string | null
          latitude: number | null
          longitude: number | null
          construction_year: number | null
          description: string
          current_status: 'standing' | 'ruins' | 'demolished'
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          construction_year?: number | null
          description?: string
          current_status?: 'standing' | 'ruins' | 'demolished'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          construction_year?: number | null
          description?: string
          current_status?: 'standing' | 'ruins' | 'demolished'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string | null
          event_year: number
          decade: number
          category: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          event_date?: string | null
          event_year: number
          category?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string | null
          event_year?: number
          category?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      photographs: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          thumbnail_url: string | null
          photo_date: string | null
          photo_year: number | null
          location: string | null
          photographer: string | null
          contributor: string | null
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          image_url: string
          thumbnail_url?: string | null
          photo_date?: string | null
          photo_year?: number | null
          location?: string | null
          photographer?: string | null
          contributor?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          thumbnail_url?: string | null
          photo_date?: string | null
          photo_year?: number | null
          location?: string | null
          photographer?: string | null
          contributor?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      maps: {
        Row: {
          id: string
          title: string
          description: string
          map_year: number | null
          map_url: string
          thumbnail_url: string | null
          map_type: 'historical' | 'modern' | 'survey' | 'sketch'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          map_year?: number | null
          map_url: string
          thumbnail_url?: string | null
          map_type?: 'historical' | 'modern' | 'survey' | 'sketch'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          map_year?: number | null
          map_url?: string
          thumbnail_url?: string | null
          map_type?: 'historical' | 'modern' | 'survey' | 'sketch'
          created_at?: string
          updated_at?: string
        }
      }
      contributions: {
        Row: {
          id: string
          contributor_name: string
          contributor_email: string
          contribution_type: 'story' | 'photo' | 'document' | 'correction'
          title: string
          content: string
          attachments: Json
          status: 'pending' | 'approved' | 'rejected'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contributor_name: string
          contributor_email: string
          contribution_type: 'story' | 'photo' | 'document' | 'correction'
          title: string
          content?: string
          attachments?: Json
          status?: 'pending' | 'approved' | 'rejected'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contributor_name?: string
          contributor_email?: string
          contribution_type?: 'story' | 'photo' | 'document' | 'correction'
          title?: string
          content?: string
          attachments?: Json
          status?: 'pending' | 'approved' | 'rejected'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      relationships: {
        Row: {
          id: string
          person_id: string
          related_person_id: string
          relationship_type: 'spouse' | 'parent' | 'child' | 'sibling'
          created_at: string
        }
        Insert: {
          id?: string
          person_id: string
          related_person_id: string
          relationship_type: 'spouse' | 'parent' | 'child' | 'sibling'
          created_at?: string
        }
        Update: {
          id?: string
          person_id?: string
          related_person_id?: string
          relationship_type?: 'spouse' | 'parent' | 'child' | 'sibling'
          created_at?: string
        }
      }
      event_people: {
        Row: {
          event_id: string
          person_id: string
          role: string | null
        }
        Insert: {
          event_id: string
          person_id: string
          role?: string | null
        }
        Update: {
          event_id?: string
          person_id?: string
          role?: string | null
        }
      }
      building_photos: {
        Row: {
          building_id: string
          photograph_id: string
        }
        Insert: {
          building_id: string
          photograph_id: string
        }
        Update: {
          building_id?: string
          photograph_id?: string
        }
      }
      puck_pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: Json
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content?: Json
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: Json
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
