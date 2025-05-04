"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface Category {
  id: number
  name: string
  icon: ReactNode
  count: number
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/arenas/categories?category=${category.name.toLowerCase()}`}>
      <div className="bg-slate-800/30 border border-slate-700 hover:border-purple-500/30 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer h-full">
        <div className="bg-slate-700/50 p-2 md:p-3 rounded-full mb-2 md:mb-3">{category.icon}</div>
        <h3 className="font-medium text-white mb-1 text-sm md:text-base">{category.name}</h3>
        <p className="text-slate-400 text-xs">{category.count} games</p>
      </div>
    </Link>
  )
}
