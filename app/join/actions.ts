"use server"

import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { z } from "zod"

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

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY

export async function submitJoinForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Initialize clients only if environment variables are available
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not found in environment variables")
      return { success: false, error: "Database configuration error" }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

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
      return { success: false, error: "Failed to save registration" }
    }

    // 2. Send email notification if Resend API key is available
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)

      try {
        await resend.emails.send({
          from: "SkillZChain <onboarding@skillzchain.com>",
          to: "admin@skillzchain.com", // Change this to your email
          subject: "New SkillZChain Registration",
          html: `
            <h1>New Registration</h1>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
            <p><strong>Experience:</strong> ${validatedData.experience}</p>
            <p><strong>Interests:</strong> ${validatedData.interests.join(", ")}</p>
            <p><strong>Message:</strong> ${validatedData.message || "Not provided"}</p>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          `,
        })

        // Also send confirmation email to the user
        await resend.emails.send({
          from: "SkillZChain <welcome@skillzchain.com>",
          to: validatedData.email,
          subject: "Welcome to SkillZChain!",
          html: `
            <h1>Welcome to SkillZChain!</h1>
            <p>Hi ${validatedData.name},</p>
            <p>Thank you for joining the SkillZChain revolution! We're excited to have you on board.</p>
            <p>We'll keep you updated on our latest developments and let you know when our platform launches.</p>
            <p>Get ready to compete, earn, and own your victory!</p>
            <p>Best regards,<br>The SkillZChain Team</p>
          `,
        })
      } catch (emailError) {
        console.error("Email sending error:", emailError)
        // We don't want to fail the whole submission if just the email fails
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false, error: "Failed to process your submission" }
  }
}
