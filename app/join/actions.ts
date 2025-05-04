"use server"

import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { supabaseConfig } from "@/utils/api-config"
import { emailService } from "@/utils/email-service"

// Form validation schema (same as client-side)
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  experience: z.string().min(1, { message: "Please select your gaming experience." }),
  interests: z.array(z.string()).min(1, { message: "Please select at least one interest." }),
  message: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

// Type for form data
type FormData = z.infer<typeof formSchema>

export async function submitJoinForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Initialize Supabase client
    const supabaseUrl = supabaseConfig.url
    const supabaseServiceKey = supabaseConfig.serviceKey

    // Check if Supabase credentials are available
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not found in environment variables")
      return { success: false, error: "Database configuration error" }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    try {
      // Check if the registrations table exists
      const { error: checkError } = await supabase.from("registrations").select("count").limit(1)

      if (checkError && checkError.message.includes("does not exist")) {
        // Table doesn't exist, create it
        const createTableQuery = `
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
        `

        // Execute the query to create the table
        const { error: createError } = await supabase.rpc("exec", { query: createTableQuery })

        if (createError) {
          console.error("Error creating table:", createError)
          return {
            success: false,
            error:
              "Database table does not exist. Please create the 'registrations' table using the SQL editor in Supabase.",
          }
        }
      }

      // 1. Save to Supabase database
      const { data, error } = await supabase.from("registrations").insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          experience: validatedData.experience,
          interests: validatedData.interests,
          message: validatedData.message || null,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error("Supabase error:", error)
        return { success: false, error: "Failed to save registration: " + error.message }
      }

      // 2. Send emails using our email service
      try {
        // Send welcome email to the user
        await emailService.sendWelcomeEmail(validatedData.name, validatedData.email)

        // Send notification to admin
        await emailService.sendRegistrationNotification({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          experience: validatedData.experience,
          interests: validatedData.interests,
          message: validatedData.message,
        })
      } catch (emailError) {
        console.error("Email sending error:", emailError)
        // We don't want to fail the whole submission if just the email fails
      }

      return { success: true }
    } catch (dbError) {
      console.error("Database operation error:", dbError)
      return { success: false, error: "Database operation failed" }
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false, error: "Failed to process your submission" }
  }
}
