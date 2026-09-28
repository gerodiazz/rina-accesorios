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
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          active: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          active?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          active?: boolean
          order_index?: number
          created_at?: string
        }
        Relationships: []
      }
      phone_models: {
        Row: {
          id: string
          brand: string
          name: string
          slug: string
          active: boolean
          order_index: number
        }
        Insert: {
          id?: string
          brand: string
          name: string
          slug: string
          active?: boolean
          order_index?: number
        }
        Update: {
          id?: string
          brand?: string
          name?: string
          slug?: string
          active?: boolean
          order_index?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category_id: string | null
          price_display: string | null
          whatsapp_only: boolean
          whatsapp_message: string | null
          active: boolean
          featured: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          category_id?: string | null
          price_display?: string | null
          whatsapp_only?: boolean
          whatsapp_message?: string | null
          active?: boolean
          featured?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          category_id?: string | null
          price_display?: string | null
          whatsapp_only?: boolean
          whatsapp_message?: string | null
          active?: boolean
          featured?: boolean
          order_index?: number
          created_at?: string
        }
        Relationships: []
      }
      product_phone_models: {
        Row: {
          product_id: string
          phone_model_id: string
        }
        Insert: {
          product_id: string
          phone_model_id: string
        }
        Update: {
          product_id?: string
          phone_model_id?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt: string | null
          order_index: number
          is_primary: boolean
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          alt?: string | null
          order_index?: number
          is_primary?: boolean
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          alt?: string | null
          order_index?: number
          is_primary?: boolean
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: string
          key: string
          value: string
          description: string | null
          section: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          description?: string | null
          section: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          description?: string | null
          section?: string
        }
        Relationships: []
      }
      site_images: {
        Row: {
          id: string
          key: string
          url: string
          alt: string | null
          section: string
          description: string | null
        }
        Insert: {
          id?: string
          key: string
          url: string
          alt?: string | null
          section: string
          description?: string | null
        }
        Update: {
          id?: string
          key?: string
          url?: string
          alt?: string | null
          section?: string
          description?: string | null
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          id: string
          question: string
          answer: string
          order_index: number
          active: boolean
        }
        Insert: {
          id?: string
          question: string
          answer: string
          order_index?: number
          active?: boolean
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          order_index?: number
          active?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Category = Database['public']['Tables']['categories']['Row']
export type PhoneModel = Database['public']['Tables']['phone_models']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type SiteContent = Database['public']['Tables']['site_content']['Row']
export type SiteImage = Database['public']['Tables']['site_images']['Row']
export type FaqItem = Database['public']['Tables']['faq_items']['Row']

export interface ProductWithRelations extends Product {
  category: Category | null
  images: ProductImage[]
  phone_models: PhoneModel[]
}
