import React from 'react'
import Hero from './../components/Hero'
import Grid from './../components/Grid'
import { useGetProductsForHomeQuery } from './../slices/productSlice'

function Home() {
  const { data: products, isLoading, error } = useGetProductsForHomeQuery()

  // High-end Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black animate-pulse">
            Loading Collection
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-10">
        <div className="text-center border border-red-500/20 bg-red-500/5 p-10">
          <p className="text-red-500 uppercase tracking-widest text-xs font-bold">
            Error Accessing Archive
          </p>
          <p className="text-zinc-500 text-[10px] mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  const BasketBall = products?.filter((item) => item.category?.toLowerCase() === 'basketball')
  const legendsCat = products?.filter((item) => item.category?.toLowerCase() === 'legends')

  return (
    <div className="min-h-screen bg-black text-white antialiased pb-20">
      {/* Hero Section Container */}
      <div className="relative pt-4 md:pt-10">
        {/* Subtle background glow behind Hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10"></div>

        <div className="bg-white rounded-none md:rounded-[60px] w-full md:w-[92%] lg:w-[85%] mx-auto overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <Hero />
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-20 px-4 md:px-10 lg:px-20 space-y-24">
        {/* Legends Section */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.5em] font-black mb-3">
              The Archive
            </span>
            <h1 className="text-center font-black text-4xl md:text-6xl tracking-tighter uppercase italic">
              Legends <span className="text-zinc-800 not-italic">Never</span> Die
            </h1>
            <div className="h-1 w-20 bg-orange-500 mt-6"></div>
          </div>

          <div className="relative">
            <Grid products={legendsCat} />
          </div>
        </section>

        {/* Basketball Section */}
        <section>
          <div className="flex flex-col items-center mb-12">
            <span className="text-orange-500 text-[10px] uppercase tracking-[0.5em] font-black mb-3">
              Pro Performance
            </span>
            <h1 className="text-center font-black text-4xl md:text-6xl tracking-tighter uppercase">
              Basketball <span className="text-zinc-800">Lab</span> Legends
            </h1>
            <div className="h-1 w-20 bg-orange-500 mt-6"></div>
          </div>

          <div className="relative">
            <Grid products={BasketBall} />
          </div>
        </section>
      </div>

      {/* Bottom Visual Accent */}
      <div className="mt-20 flex justify-center">
        <div className="w-px h-24 bg-gradient-to-b from-orange-500 to-transparent"></div>
      </div>
    </div>
  )
}

export default Home
