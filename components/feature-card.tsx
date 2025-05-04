import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-slate-600 transition shadow-lg shadow-purple-900/5">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </CardContent>
    </Card>
  )
}
