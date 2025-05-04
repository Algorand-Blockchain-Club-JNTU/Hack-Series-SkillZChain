"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAdminAuth } from "@/utils/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [authState, login] = useAdminAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    console.log("Auth state in login page:", authState)
    if (authState.isAuthenticated && !authState.isLoading) {
      console.log("User is authenticated, redirecting to dashboard")
      router.push("/admin/dashboard")
    }
  }, [authState, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    console.log("Form submitted with username:", username)

    try {
      // Validate input
      if (!username || !password) {
        setError("Username and password are required")
        setIsSubmitting(false)
        return
      }

      // Attempt login
      const isValid = login(username, password)
      console.log("Login result:", isValid)

      if (!isValid) {
        setError("Invalid username or password")
        setIsSubmitting(false)
      } else {
        // Force navigation if the useEffect doesn't trigger
        console.log("Login successful, manually navigating to dashboard")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 500)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login. Please try again.")
      setIsSubmitting(false)
    }
  }

  // Show loading state
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1218] flex items-center justify-center">
        <div className="text-white text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1218] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Admin Login</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-slate-300">
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-900/70 border-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-900/70 border-slate-700"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Signing in..."
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" /> Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition">
                Return to homepage
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
