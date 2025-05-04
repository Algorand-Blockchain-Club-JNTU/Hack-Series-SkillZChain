import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PageUnderConstruction() {
  return (
    <div className="min-h-screen bg-[#0f1218] flex flex-col items-center justify-center text-white p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-12 w-12 md:h-16 md:w-16 text-yellow-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Under Construction</h1>
        <p className="text-slate-300 mb-8 text-sm md:text-base">
          We're working hard to bring you this feature soon. Please check back later!
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
