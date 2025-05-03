"use server"

import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

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
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not found in environment variables")
      return { data: null, error: "Database configuration error" }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

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
  } catch (error) {
    console.error("Unexpected error:", error)
    return { data: null, error }
  }
}
