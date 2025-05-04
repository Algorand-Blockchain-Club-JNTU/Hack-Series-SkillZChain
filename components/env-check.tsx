"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, X } from "lucide-react"
import { validateEnvironment } from "@/utils/api-config"

export function EnvironmentCheck() {
  const [envStatus, setEnvStatus] = useState<{ valid: boolean; missing: string[] }>({
    valid: true,
    missing: [],
  })
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === "development") {
      const status = validateEnvironment()
      setEnvStatus(status)
      setShowAlert(!status.valid)
    }
  }, [])

  if (!showAlert) return null

  return (
    <Alert variant="destructive" className="mb-4 fixed bottom-4 right-4 w-auto max-w-md z-50 shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 mt-0.5" />
          <div>
            <AlertTitle className="mb-2">Missing Environment Variables</AlertTitle>
            <AlertDescription>
              <p>The following environment variables are missing:</p>
              <ul className="list-disc pl-5 mt-2">
                {envStatus.missing.map((key) => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
            </AlertDescription>
          </div>
        </div>
        <button onClick={() => setShowAlert(false)} className="text-white hover:text-gray-200" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </Alert>
  )
}
