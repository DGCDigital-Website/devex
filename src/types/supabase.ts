export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          all_day: boolean
          calendar: string | null
          created_at: string | null
          description: string | null
          end_at: string
          id: string
          start_at: string
          title: string
          url: string | null
        }
        Insert: {
          all_day?: boolean
          calendar?: string | null
          created_at?: string | null
          description?: string | null
          end_at: string
          id: string
          start_at: string
          title: string
          url?: string | null
        }
        Update: {
          all_day?: boolean
          calendar?: string | null
          created_at?: string | null
          description?: string | null
          end_at?: string
          id?: string
          start_at?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          avatar: string | null
          avatar_color: string | null
          billing: string
          company: string
          contact: string
          country: string
          created_at: string | null
          current_plan: string
          email: string
          full_name: string
          id: number
          role: string
          status: string
          username: string
        }
        Insert: {
          avatar?: string | null
          avatar_color?: string | null
          billing?: string
          company: string
          contact: string
          country: string
          created_at?: string | null
          current_plan?: string
          email: string
          full_name: string
          id?: never
          role?: string
          status?: string
          username: string
        }
        Update: {
          avatar?: string | null
          avatar_color?: string | null
          billing?: string
          company?: string
          contact?: string
          country?: string
          created_at?: string | null
          current_plan?: string
          email?: string
          full_name?: string
          id?: never
          role?: string
          status?: string
          username?: string
        }
        Relationships: []
      }
      instruments: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          address: string
          avatar: string | null
          avatar_color: string | null
          balance: string | null
          company: string
          company_email: string
          contact: string
          country: string
          created_at: string | null
          discount_amount: number | null
          discount_percent: number | null
          due_date: string
          id: string
          invoice_status: string
          issued_date: string
          line_items: Json | null
          name: string
          service: string
          subtotal: number | null
          tax_amount: number | null
          total: number
        }
        Insert: {
          address: string
          avatar?: string | null
          avatar_color?: string | null
          balance?: string | null
          company: string
          company_email: string
          contact: string
          country: string
          created_at?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          due_date: string
          id: string
          invoice_status?: string
          issued_date: string
          line_items?: Json | null
          name: string
          service: string
          subtotal?: number | null
          tax_amount?: number | null
          total?: number
        }
        Update: {
          address?: string
          avatar?: string | null
          avatar_color?: string | null
          balance?: string | null
          company?: string
          company_email?: string
          contact?: string
          country?: string
          created_at?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          due_date?: string
          id?: string
          invoice_status?: string
          issued_date?: string
          line_items?: Json | null
          name?: string
          service?: string
          subtotal?: number | null
          tax_amount?: number | null
          total?: number
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string | null
          deadline: string | null
          department: string
          description: string | null
          id: string
          location: string
          requirements: string[] | null
          thematic: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          deadline?: string | null
          department?: string
          description?: string | null
          id: string
          location?: string
          requirements?: string[] | null
          thematic?: string | null
          title: string
          type?: string
        }
        Update: {
          created_at?: string | null
          deadline?: string | null
          department?: string
          description?: string | null
          id?: string
          location?: string
          requirements?: string[] | null
          thematic?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string | null
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string
          category?: string
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id: string
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quotations: {
        Row: {
          address: string
          avatar: string | null
          avatar_color: string | null
          balance: string | null
          company: string
          company_email: string
          contact: string
          country: string
          created_at: string | null
          discount_amount: number | null
          discount_percent: number | null
          id: string
          issued_date: string
          line_items: Json | null
          name: string
          quotation_status: string
          service: string
          subtotal: number | null
          tax_amount: number | null
          total: number
          valid_until: string
        }
        Insert: {
          address: string
          avatar?: string | null
          avatar_color?: string | null
          balance?: string | null
          company: string
          company_email: string
          contact: string
          country: string
          created_at?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          id: string
          issued_date: string
          line_items?: Json | null
          name: string
          quotation_status?: string
          service: string
          subtotal?: number | null
          tax_amount?: number | null
          total?: number
          valid_until: string
        }
        Update: {
          address?: string
          avatar?: string | null
          avatar_color?: string | null
          balance?: string | null
          company?: string
          company_email?: string
          contact?: string
          country?: string
          created_at?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          issued_date?: string
          line_items?: Json | null
          name?: string
          quotation_status?: string
          service?: string
          subtotal?: number | null
          tax_amount?: number | null
          total?: number
          valid_until?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
