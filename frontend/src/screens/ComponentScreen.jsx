import React from 'react'
import { useGetComponentsQuery } from '../slices/componentSlice'
import JSComponentCard from '../components/JSComponentCard'

export default function LibraryPage() {
  const { data: components, isLoading, error } = useGetComponentsQuery()

  if (isLoading)
    return (
      <div className="min-h-screen bg-black text-orange-500 p-20 font-black text-4xl">
        LOADING...
      </div>
    )

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-40">
        <div className="flex flex-col items-start border-l border-white/10 pl-8 ml-2 mb-20">
          <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.6em] mb-4">
            Collection 2026
          </span>
          <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-[0.8] mb-8">
            JS UTILITIES
          </h1>
        </div>

        {Array.isArray(components) &&
          components.map((item) => <JSComponentCard key={item._id} item={item} />)}
      </div>
    </div>
  )
}
