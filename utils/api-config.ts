// API Configuration utility

// Supabase configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wlafwflppuuofokrkrkc.supabase.co",
  serviceKey:
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYWZ3ZmxwcHV1b2Zva3JrcmtjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjE5MjcwNCwiZXhwIjoyMDYxNzY4NzA0fQ.NEqNI3nRbm3wiKoM4Kb2Nz8MVyn_aSfRPeVAhTb6Lo0",
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYWZ3ZmxwcHV1b2Zva3JrcmtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTI3MDQsImV4cCI6MjA2MTc2ODcwNH0.AYS26pQK2gf20eBTuaidIoFNDAULyiX_f4izzePNysI",
}

// Algorand configuration (simplified to avoid env errors)
export const algorandConfig = {
  apiKey: "",
  network: "testnet",
}

// Email configuration
export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY || "your-resend-api-key",
}

// Function to check if required environment variables are set
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const required = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY"]

  const missing = required.filter((key) => !process.env[key])

  return {
    valid: missing.length === 0,
    missing,
  }
}

// Helper function to check if we're in a production environment
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production"
}

// Helper function to get environment-specific configuration
export function getEnvironmentConfig() {
  return {
    environment: process.env.NODE_ENV || "development",
    isProduction: isProduction(),
    isDevelopment: process.env.NODE_ENV === "development",
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  }
}
