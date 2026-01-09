import React from 'react'

function Hero() {
  return (
    <div className="relative w-full overflow-hidden min-h-[400px] md:min-h-[500px] bg-white flex items-center">
      {/* MINIMALIST BACKGROUND DECORATION */}
      <div className="hidden md:block absolute top-0 right-0 w-1/4 h-full bg-zinc-50 skew-x-[-10deg] translate-x-10"></div>

      {/* MOBILE IMAGE OVERLAY */}

      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10 flex flex-col md:flex-row items-center justify-between">
        {/* CONCISE TEXT CONTENT */}
        <div className="text-center md:text-left">
          <span className="inline-block text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            Collection 2025
          </span>

          <h1 className="text-white md:text-black text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
            Build Your <br />
            <span className="text-orange-500 italic">Legacy</span>
          </h1>

          <button className="group relative px-12 py-4 bg-black text-white font-black text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-orange-500 hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] active:scale-95">
            Get The Drop
          </button>
        </div>

        {/* COMPACT IMAGE SECTION (Desktop Only) */}
        <div className="hidden md:block relative animate-float">
          <div className="absolute inset-0 bg-orange-500/5 blur-[80px] rounded-full"></div>
          <img
            src="/images/ex.png"
            alt="hero"
            className="relative w-[350px] lg:w-[450px] h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* REMOVED 'jsx' ATTRIBUTE TO FIX ERROR */}
      <style>
        {`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  )
}

export default Hero
