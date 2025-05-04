"use client"

import { useState, useEffect } from "react"

// Hardcoded admin credentials - in a real app, these would be securely stored
const ADMIN_USERNAME = "Yogesh"
const ADMIN_PASSWORD = "yogesh@9139"

// Types for our auth state
export type AuthState = {
  isAuthenticated: boolean
  isLoading: boolean
}

// Check if credentials match our hardcoded values
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

// Save auth state to localStorage
export function setAuthState(isAuthenticated: boolean): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("skillzchain_admin_auth", isAuthenticated ? "true" : "false")
      console.log("Auth state set to:", isAuthenticated)
    } catch (error) {
      console.error("Error setting auth state:", error)
    }
  }
}

// Get auth state from localStorage
export function getAuthState(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("skillzchain_admin_auth") === "true"
  }
  return false
}

// Clear auth state
export function clearAuthState(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("skillzchain_admin_auth")
  }
}

// Custom hook to handle auth state
export function useAdminAuth(): [AuthState, (username: string, password: string) => boolean, () => void] {
  const [authState, setAuthStateLocal] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check auth state on component mount
    const isAuth = getAuthState()
    console.log("Initial auth state:", isAuth)
    setAuthStateLocal({
      isAuthenticated: isAuth,
      isLoading: false,
    })
  }, [])

  const login = (username: string, password: string): boolean => {
    console.log("Login attempt with:", username)
    const isValid = validateCredentials(username, password)
    console.log("Credentials valid:", isValid)

    if (isValid) {
      setAuthStateLocal({ isAuthenticated: true, isLoading: false })
      setAuthState(true) // Set in localStorage
      console.log("Login successful, auth state updated")
    }
    return isValid
  }

  const logout = () => {
    setAuthStateLocal({ isAuthenticated: false, isLoading: false })
    clearAuthState()
    console.log("Logout completed, auth state cleared")
  }

  return [authState, login, logout]
}
