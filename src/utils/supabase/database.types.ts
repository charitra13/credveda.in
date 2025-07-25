export type Database = {
  public: {
    Tables: {
      [key: string]: Record<string, unknown>
    }
    Views: {
      [key: string]: Record<string, unknown>
    }
    Functions: {
      [key: string]: Record<string, unknown>
    }
    Enums: {
      [key: string]: Record<string, unknown>
    }
  }
} 