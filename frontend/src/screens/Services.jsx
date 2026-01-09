import React, { useState } from 'react'
import { Layout, Server, Code, Layers, ArrowUpRight, X, CheckCircle2 } from 'lucide-react'

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Website Templates',
      desc: 'Premium React & Tailwind CSS layouts built for high conversion and speed.',
      details:
        'Our templates are built with SEO optimization, mobile-first responsiveness, and clean code architecture. Perfect for startups and creative agencies looking to launch in days, not months.',
      features: ['React/Next.js Ready', 'Tailwind CSS Stylings', 'Figma Files Included'],
      icon: <Layout className="w-6 h-6" />,
      image:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-zinc-900',
    },
    {
      id: 2,
      title: 'Hosting Plans',
      desc: 'Ultra-fast NVMe storage with 99.9% uptime and dedicated support.',
      details:
        'Enterprise-grade hosting solutions featuring LiteSpeed web servers, automated daily backups, and free SSL certificates. Experience loading speeds that keep your bounce rate low.',
      features: ['99.9% Uptime SLA', 'Global CDN Integration', '24/7 Server Monitoring'],
      icon: <Server className="w-6 h-6" />,
      image:
        'https://images.unsplash.com/photo-1554098415-788601c80aef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: 'bg-zinc-900',
    },
    {
      id: 3,
      title: 'Reverse Engineering',
      desc: 'Advanced application analysis and security auditing services.',
      details:
        'Deep-dive analysis into binary structures and application logic. We provide comprehensive security audits to identify vulnerabilities and optimize legacy code performance.',
      features: ['Vulnerability Assessment', 'Malware Analysis', 'Binary Decompilation'],
      icon: <Code className="w-6 h-6" />,
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-zinc-900',
    },
    {
      id: 4,
      title: 'Digital Assets',
      desc: 'High-resolution PSDs, textures, and UI kits for professional designers.',
      details:
        'A curated library of premium design resources. From high-bitrate textures to complex PSD face-drops, our assets are designed to give your work a professional edge.',
      features: ['4K Resolution Textures', 'Fully Layered PSDs', 'Commercial Use License'],
      icon: <Layers className="w-6 h-6" />,
      image:
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
      color: 'bg-zinc-900',
    },
  ]

  return (
    <section className="bg-[#E5E5E1] py-32 px-6 min-h-screen relative selection:bg-zinc-300">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section - Refined for White Theme */}
        <div className="mb-24 border-l-8 border-zinc-900 pl-10">
          <h2 className="text-zinc-900 text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            Core <br />
            <span className="font-serif italic text-zinc-400 normal-case tracking-tight">
              Services
            </span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm font-black">
            Premium Digital Solutions / Est. 2026
          </p>
        </div>

        {/* Services Grid - White Cards with Soft Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative group h-[600px] rounded-[3rem] overflow-hidden bg-white/40 backdrop-blur-sm border border-white/60 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-4">
              {/* Image Treatment - Subtle Grayscale to Color */}
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E5E5E1] via-transparent to-transparent" />
              </div>

              {/* Card Content - Enlarged Typography */}
              <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                <div className="w-16 h-16 mb-8 flex items-center justify-center bg-zinc-900 rounded-2xl text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                <h3 className="text-zinc-900 text-3xl font-black uppercase tracking-tighter mb-4">
                  {service.title}
                </h3>

                <p className="text-zinc-600 text-base font-medium leading-relaxed mb-8">
                  {service.desc}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-5 flex items-center justify-center gap-3 bg-white border border-zinc-200 text-zinc-900 text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-500 shadow-sm">
                  Service Intel <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Service Detail Dialog (Modal) - Neo-Brutalist Glass --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-zinc-900/40 backdrop-blur-md">
          <div className="bg-[#E5E5E1] border border-white w-full max-w-3xl relative rounded-[4rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
            {/* Modal Header Image */}
            <div className="h-64 w-full relative">
              <img
                src={selectedService.image}
                className="w-full h-full object-cover grayscale"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E5E5E1] to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 bg-zinc-900 p-4 text-white rounded-full hover:scale-110 transition-transform shadow-2xl">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-12 md:p-16">
              <div className="flex items-center gap-6 mb-8">
                <span className="w-14 h-14 bg-zinc-900 text-white flex items-center justify-center rounded-2xl shadow-lg">
                  {selectedService.icon}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter">
                  {selectedService.title}
                </h2>
              </div>

              <p className="text-zinc-600 text-xl font-serif italic mb-10 leading-relaxed">
                {selectedService.details}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {selectedService.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 text-zinc-900 text-[13px] font-black uppercase tracking-widest bg-white/50 p-4 rounded-2xl border border-white">
                    <CheckCircle2 className="w-5 h-5 text-zinc-900" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="w-full py-6 bg-zinc-900 text-white font-black uppercase tracking-[0.3em] text-xs rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all active:scale-95">
                Return to Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
