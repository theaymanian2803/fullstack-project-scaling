import React from 'react'
import Grid from './../components/Grid'
import { useGetProductsForHomeQuery } from './../slices/productSlice'

function Home() {
  const { data: products, isLoading, error } = useGetProductsForHomeQuery()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center font-serif italic text-zinc-400">
        Loading Collection...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-10">
        <div className="text-center">
          <p className="text-red-500 uppercase tracking-[0.3em] text-[12px] font-bold">
            Error Accessing Archive
          </p>
          <p className="text-zinc-400 text-[12px] mt-2 font-mono">{error.message}</p>
        </div>
      </div>
    )
  }

  const BasketBall = products?.filter((item) => item.category?.toLowerCase() === 'basketball')
  const legendsCat = products?.filter((item) => item.category?.toLowerCase() === 'legends')

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-zinc-900 selection:bg-zinc-200">
      {/* 1. FIXED: SPACER TO PUSH HERO DOWN BELOW NAVBAR */}

      {/* Editorial Banner Section */}
      <section className="relative w-full px-4 md:px-10 pt-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-4 z-10 space-y-10 py-12">
            <span className="text-[12px] uppercase tracking-[0.5em] font-black text-zinc-400 block">
              New Arrival / 2026
            </span>

            {/* 2. ENLARGED TEXT: text-7xl to 9xl */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif leading-[0.85] tracking-tighter text-zinc-800">
              Fresh <br /> <span className="italic ml-6">Spring</span> <br /> Hues
            </h1>

            <p className="max-w-md text-zinc-500 text-lg leading-relaxed font-light">
              Verbena. Blackberry. Prune. No, it’s not a farmers market list. These are the new
              colors livening up your new year active goals. Designed for movement, crafted for the
              aesthetic eye.
            </p>

            <div className="pt-6">
              {/* 3. ENLARGED BUTTON */}
              <button className="px-12 py-5 border-2 border-zinc-900 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all duration-500 shadow-lg">
                Shop the Collection
              </button>
            </div>
          </div>

          {/* Multi-Image Display Column */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-6 h-[500px] md:h-[800px]">
            <div className="relative overflow-hidden rounded-[3rem] group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
                alt="Lifestyle"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="relative overflow-hidden rounded-[3rem] mt-20 group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
                alt="Fashion detail"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-[1440px] mx-auto mt-48 px-6 md:px-12 space-y-56 pb-32">
        {/* Legends Section */}
        <section>
          <div className="flex items-center justify-between mb-24">
            <div className="flex flex-col border-l-4 border-zinc-900 pl-10">
              <span className="text-zinc-400 text-xs uppercase tracking-[0.4em] font-black mb-4">
                unccode style
              </span>
              <h2 className="font-serif italic text-6xl md:text-8xl text-zinc-800 tracking-tight">
                Legends
              </h2>
            </div>
            <p className="hidden md:block max-w-[250px] text-xs text-zinc-400 leading-relaxed font-mono font-bold">
              REFINED SELECTION FROM THE 2026 VAULT.
            </p>
          </div>

          <div className="relative">
            <Grid products={legendsCat} />
          </div>
        </section>

        {/* Basketball Section */}
        <section className="pt-10 border-t-2 border-zinc-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-8">
            <div className="space-y-4">
              <span className="text-zinc-400 text-xs uppercase tracking-[0.4em] font-black">
                Performance Lab
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-zinc-800 tracking-tight leading-none">
                Basketball <span className="italic font-light">Laboratory</span>
              </h2>
            </div>
            <button className="text-xs font-black uppercase tracking-[0.3em] border-b-4 border-zinc-900 pb-3 hover:text-zinc-400 transition-all">
              View the Series
            </button>
          </div>

          <div className="relative">
            <Grid products={BasketBall} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
