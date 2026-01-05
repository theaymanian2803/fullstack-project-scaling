import React from 'react'
import { Layout, Server, Code, ShieldCheck, Zap, Globe, ArrowRight, Monitor } from 'lucide-react'

const AboutPage = () => {
  const values = [
    {
      title: 'Clean Architecture',
      description:
        'Every template is built with high-performance React code, ensuring lightning-fast load times and SEO dominance.',
      icon: <Layout className="w-6 h-6" />,
    },
    {
      title: 'Infrastructure Integrity',
      description:
        'Our hosting plans utilize NVMe storage and enterprise-grade security to keep your digital assets online 24/7.',
      icon: <Server className="w-6 h-6" />,
    },
    {
      title: 'Deep Analysis',
      description:
        'Our reverse engineering services provide a transparent look into complex application logic and security audits.',
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: 'Global Deployment',
      description:
        'Scale your vision instantly. We provide the tools to deploy high-end web solutions to a global audience.',
      icon: <Globe className="w-6 h-6" />,
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* --- HERO / THE VISION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <div className="mb-8 border-l-4 border-yellow-500 pl-6">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                The <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  Protocol
                </span>
              </h1>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">
                Digital Infrastructure / Est. 2024
              </p>
            </div>

            <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed font-medium max-w-xl">
              <p>
                EVANOX was founded to bridge the gap between high-end design and raw technical
                performance. We don't just sell templates; we provide the architectural blueprints
                for the modern web.
              </p>
              <p className="border-t border-zinc-800 pt-6">
                From high-conversion React layouts to secure hosting protocols and deep-level
                software analysis, we empower developers and brands to dominate their digital
                landscape.
              </p>
            </div>
          </div>

          {/* Right side - Technical Brutalist Image Stack */}
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-yellow-500/20 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="relative aspect-video lg:aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Cybersecurity and Code"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
            {/* Overlay Badge - Matching Store Style */}
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black p-6 font-black uppercase tracking-tighter text-2xl rotate-[-2deg]">
              High <br /> Performance.
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES (Values) --- */}
      <section className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                Core <span className="text-yellow-500">Capabilities</span>
              </h2>
              <p className="text-zinc-400 text-xl font-medium">
                Engineered for speed. Secured for scale. We provide the foundational layers required
                for professional digital excellence.
              </p>
            </div>
            <div className="hidden md:block">
              <ShieldCheck className="w-24 h-24 text-zinc-900" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-black p-12 hover:bg-zinc-900 transition-colors group relative overflow-hidden">
                <div className="text-yellow-500 mb-6 transform group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-4">
                  {value.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {value.description}
                </p>
                {/* Decorative Technical Index */}
                <span className="absolute top-8 right-8 text-zinc-900 font-mono text-4xl italic group-hover:text-yellow-500/10 transition-colors">
                  SYSTEM_0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-40 px-6 relative overflow-hidden">
        {/* Background Glitch Text Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
          <h2 className="text-[25vw] font-black uppercase leading-none">ROOT</h2>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter">
            Deploy Your <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Digital Empire
            </span>
          </h2>
          <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Join the network of high-performance developers and businesses leveraging EVANOX
            infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group px-12 py-5 bg-white text-black font-black text-lg uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-95 flex items-center justify-center gap-3">
              Explore Store{' '}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-12 py-5 border-2 border-white/20 text-white font-black text-lg uppercase tracking-widest hover:bg-white/10 transition-colors">
              Contact Admin
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
