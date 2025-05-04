"use server"

import { createClient } from "@supabase/supabase-js"

// Update the Supabase client initialization to use environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

export type Registration = {
  id: number
  name: string
  email: string
  phone: string | null
  experience: string
  interests: string[]
  message: string | null
  created_at: string
}

export async function getRegistrations(): Promise<{
  data: Registration[] | null
  error: any
  tableNotFound?: boolean
}> {
  try {
    // Update the check in getRegistrations function
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not found in environment variables")
      return { data: null, error: "Database configuration error" }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if the table exists first
    try {
      // Fetch all registrations ordered by most recent first
      const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching registrations:", error)

        // Check if the error is because the table doesn't exist
        if (error.message.includes("relation") && error.message.includes("does not exist")) {
          return { data: null, error, tableNotFound: true }
        }

        return { data: null, error }
      }

      return { data: data as Registration[], error: null }
    } catch (error: any) {
      console.error("Unexpected error:", error)

      // Check if the error is because the table doesn't exist
      if (error.message && error.message.includes("relation") && error.message.includes("does not exist")) {
        return { data: null, error, tableNotFound: true }
      }

      return { data: null, error }
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { data: null, error }
  }
}

export async function createRegistrationsTable(): Promise<{
  success: boolean
  error?: any
}> {
  try {
    // Update the check in createRegistrationsTable function
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not found in environment variables")
      return { success: false, error: "Database configuration error" }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.registrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        experience TEXT NOT NULL,
        interests TEXT[] NOT NULL,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Add an index on email for faster lookups
      CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
      
      -- Add an index on created_at for faster sorting
      CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);
    `

    // Execute the SQL directly
    const { error } = await supabase.rpc("exec", { query: createTableSQL })

    if (error) {
      console.error("Error creating table:", error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error("Error creating registrations table:", error)
    return { success: false, error }
  }
}
