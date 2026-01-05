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
      icon: <Layout className="w-5 h-5" />,
      image:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2070&auto=format&fit=crop',
      color: 'from-pink-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Hosting Plans',
      desc: 'Ultra-fast NVMe storage with 99.9% uptime and dedicated support.',
      details:
        'Enterprise-grade hosting solutions featuring LiteSpeed web servers, automated daily backups, and free SSL certificates. Experience loading speeds that keep your bounce rate low.',
      features: ['99.9% Uptime SLA', 'Global CDN Integration', '24/7 Server Monitoring'],
      icon: <Server className="w-5 h-5" />,
      image:
        'https://images.unsplash.com/photo-1554098415-788601c80aef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Reverse Engineering',
      desc: 'Advanced application analysis and security auditing services.',
      details:
        'Deep-dive analysis into binary structures and application logic. We provide comprehensive security audits to identify vulnerabilities and optimize legacy code performance.',
      features: ['Vulnerability Assessment', 'Malware Analysis', 'Binary Decompilation'],
      icon: <Code className="w-5 h-5" />,
      image:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 4,
      title: 'Digital Assets',
      desc: 'High-resolution PSDs, textures, and UI kits for professional designers.',
      details:
        'A curated library of premium design resources. From high-bitrate textures to complex PSD face-drops, our assets are designed to give your work a professional edge.',
      features: ['4K Resolution Textures', 'Fully Layered PSDs', 'Commercial Use License'],
      icon: <Layers className="w-5 h-5" />,
      image:
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
      color: 'from-green-400 to-emerald-600',
    },
  ]

  return (
    <section className="bg-black py-24 px-6 min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 border-l-4 border-yellow-500 pl-8">
          <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Core{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Services
            </span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">
            Premium Digital Solutions / Est. 2024
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative group h-[500px] overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-yellow-500/50">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div
                  className={`w-10 h-10 mb-6 flex items-center justify-center bg-black border border-zinc-700 rounded-full text-white group-hover:border-yellow-500 transition-colors`}>
                  {service.icon}
                </div>

                <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-3">
                  {service.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{service.desc}</p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-fit flex items-center gap-2 text-yellow-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                  Read More <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Service Detail Dialog (Modal) --- */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header Image */}
            <div className="h-48 w-full relative">
              <img
                src={selectedService.image}
                className="w-full h-full object-cover opacity-50"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-black p-2 text-white hover:text-yellow-500 transition-colors border border-zinc-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-yellow-500 text-black">{selectedService.icon}</span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                  {selectedService.title}
                </h2>
              </div>

              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                {selectedService.details}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {selectedService.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-zinc-300 text-sm font-bold uppercase tracking-tight">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95">
                Close Details
              </button>
            </div>

            {/* Aesthetic Bottom Accent */}
            <div className={`h-2 w-full bg-gradient-to-r ${selectedService.color}`} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
