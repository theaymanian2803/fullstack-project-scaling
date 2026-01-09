import React from 'react'
import { Layout, Server, Code, ShieldCheck, Globe, ArrowRight } from 'lucide-react'

const AboutPage = () => {
  const values = [
    {
      title: 'Clean Architecture',
      description:
        'Every template is built with high-performance React code, ensuring lightning-fast load times and SEO dominance.',
      icon: <Layout className="w-8 h-8" />,
    },
    {
      title: 'Infrastructure Integrity',
      description:
        'Our hosting plans utilize NVMe storage and enterprise-grade security to keep your digital assets online 24/7.',
      icon: <Server className="w-8 h-8" />,
    },
    {
      title: 'Deep Analysis',
      description:
        'Our reverse engineering services provide a transparent look into complex application logic and security audits.',
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: 'Global Deployment',
      description:
        'Scale your vision instantly. We provide the tools to deploy high-end web solutions to a global audience.',
      icon: <Globe className="w-8 h-8" />,
    },
  ]

  return (
    <div className="bg-[#E5E5E1] text-zinc-900 min-h-screen font-sans selection:bg-zinc-300">
      {/* --- HERO / THE VISION --- */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="z-10">
            {/* Editorial Heading */}
            <div className="mb-12 border-l-[12px] border-zinc-900 pl-10">
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                The <br />
                <span className="font-serif italic text-zinc-400 normal-case tracking-tight">
                  Protocol
                </span>
              </h1>
              <p className="text-zinc-500 uppercase tracking-[0.6em] text-sm font-black">
                Digital Infrastructure // Est. 2026
              </p>
            </div>

            <div className="space-y-10 text-zinc-700 text-xl md:text-3xl leading-snug font-medium max-w-2xl">
              <p>
                EVANOX was founded to bridge the gap between{' '}
                <span className="text-zinc-900 font-black">high-end design</span> and raw technical
                performance.
              </p>
              <p className="border-t border-zinc-200 pt-10 font-serif italic text-zinc-500">
                We provide the architectural blueprints for the modern web—from high-conversion
                React layouts to secure hosting protocols.
              </p>
            </div>
          </div>

          {/* Right side - Technical Image Stack */}
          <div className="relative group">
            <div className="absolute -inset-6 border-4 border-zinc-900/10 translate-x-6 translate-y-6 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 rounded-[3rem]" />
            <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Cybersecurity and Code"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E5E5E1]/80 via-transparent to-transparent" />
            </div>

            {/* Overlay Badge */}
            <div className="absolute -bottom-10 -right-10 bg-zinc-900 text-white p-10 font-black uppercase tracking-tighter text-3xl rotate-[-3deg] shadow-2xl rounded-2xl">
              Verified <br /> Performance.
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="py-40 px-6 bg-white/30 backdrop-blur-sm border-y border-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-zinc-900 leading-none">
                Core{' '}
                <span className="font-serif italic text-zinc-400 normal-case tracking-normal">
                  Capabilities
                </span>
              </h2>
              <p className="text-zinc-500 text-2xl md:text-3xl font-medium leading-relaxed">
                Engineered for speed. Secured for scale. We provide the foundational layers required
                for professional digital excellence.
              </p>
            </div>
            <div className="hidden md:block opacity-10">
              <ShieldCheck className="w-48 h-48 text-zinc-900" />
            </div>
          </div>

          {/* Grid with Glassmorphic Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-xl p-16 rounded-[4rem] border border-white hover:bg-white transition-all duration-700 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2">
                <div className="text-zinc-900 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                  {value.icon}
                </div>
                <h3 className="text-zinc-900 text-3xl font-black uppercase tracking-tight mb-6">
                  {value.title}
                </h3>
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-medium max-w-md">
                  {value.description}
                </p>

                {/* Decorative Technical Index */}
                <span className="absolute top-12 right-12 text-zinc-200 font-serif italic text-6xl opacity-40 group-hover:text-zinc-900 group-hover:opacity-5 transition-all">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-60 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[30vw] font-black uppercase leading-none text-zinc-900">EVANOX</h2>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-[120px] font-black mb-12 leading-[0.9] uppercase tracking-tighter text-zinc-900">
            Deploy Your <br />
            <span className="font-serif italic text-zinc-400 normal-case tracking-tight">
              Digital Empire
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16">
            <button className="group px-16 py-8 bg-zinc-900 text-white font-black text-xl uppercase tracking-[0.2em] rounded-full hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl">
              Explore Store
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </button>
            <button className="px-16 py-8 border-2 border-zinc-900 text-zinc-900 font-black text-xl uppercase tracking-[0.2em] rounded-full hover:bg-zinc-900 hover:text-white transition-all">
              Contact Admin
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
