import type React from "react"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

export default function ArenasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-900 pb-24 md:pb-0">
      {children}
      <MobileBottomNav />
    </div>
  )
}
