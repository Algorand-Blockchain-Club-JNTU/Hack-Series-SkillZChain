import { Resend } from "resend"
import { emailConfig } from "./api-config"

// Email templates
export const EMAIL_TEMPLATES = {
  WELCOME: "welcome",
  REGISTRATION_NOTIFICATION: "registration-notification",
}

// Initialize Resend with API key
const resend = new Resend(emailConfig.apiKey)

// Email service functions
export const emailService = {
  /**
   * Send a welcome email to a new user
   */
  sendWelcomeEmail: async (name: string, email: string) => {
    try {
      const { data, error } = await resend.emails.send({
        from: "SkillZChain <welcome@skillzchain.com>",
        to: email,
        subject: "Welcome to SkillZChain!",
        html: `
          <h1>Welcome to SkillZChain!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining the SkillZChain revolution! We're excited to have you on board.</p>
          <p>We'll keep you updated on our latest developments and let you know when our platform launches.</p>
          <p>Get ready to compete, earn, and own your victory!</p>
          <p>Best regards,<br>The SkillZChain Team</p>
        `,
      })

      if (error) {
        console.error("Failed to send welcome email:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending welcome email:", error)
      return { success: false, error }
    }
  },

  /**
   * Send a notification email to admins about a new registration
   */
  sendRegistrationNotification: async (userData: {
    name: string
    email: string
    phone?: string
    experience: string
    interests: string[]
    message?: string
  }) => {
    try {
      const { data, error } = await resend.emails.send({
        from: "SkillZChain <notifications@skillzchain.com>",
        to: "admin@skillzchain.com", // Change this to your admin email
        subject: "New SkillZChain Registration",
        html: `
          <h1>New Registration</h1>
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Phone:</strong> ${userData.phone || "Not provided"}</p>
          <p><strong>Experience:</strong> ${userData.experience}</p>
          <p><strong>Interests:</strong> ${userData.interests.join(", ")}</p>
          <p><strong>Message:</strong> ${userData.message || "Not provided"}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `,
      })

      if (error) {
        console.error("Failed to send registration notification:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending registration notification:", error)
      return { success: false, error }
    }
  },
}
