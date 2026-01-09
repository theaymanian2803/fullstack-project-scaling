import React from 'react'
import { Link } from 'react-router-dom'

const footerNavs = [
  {
    href: '/terms',
    name: 'Terms',
  },
  {
    href: '/licence',
    name: 'License',
  },
  {
    href: '/privacy',
    name: 'Privacy',
  },
  {
    href: '/about',
    name: 'About us',
  },
]

function Footer() {
  return (
    /* Background matches the new warm-gray Home theme */
    <footer className="bg-[#E5E5E1] border-t border-zinc-300 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Blur Element for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-200 rounded-full blur-[150px] opacity-50 z-0"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          {/* Minimalist Text-Based Logo for consistency */}
          <div className="flex flex-col items-center group">
            <span className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">
              unc code
            </span>
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-zinc-400 mt-1">
              ARCHIVE
            </span>
          </div>

          <p className="text-zinc-500 text-lg font-serif italic leading-relaxed max-w-lg mx-auto">
            Elevating your digital experience through <br />
            <span className="text-zinc-900 not-italic font-sans font-bold uppercase tracking-widest text-[11px]">
              premium curated collections.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Primary Action Button - Solid Neo-Brutalist Style */}
            <Link
              to="/store"
              className="w-full sm:w-auto py-5 px-10 text-center bg-zinc-900 text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-full hover:scale-105 transition-all shadow-xl shadow-zinc-900/20">
              Explore Store
            </Link>

            {/* Secondary Action Button - Outlined */}
            <Link
              to="/login"
              className="w-full sm:w-auto py-5 px-10 text-center border border-zinc-400 text-zinc-900 font-bold uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-white transition-all">
              Member Access
            </Link>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="mt-32 pt-10 border-t border-zinc-300 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright with refined spacing */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-zinc-400"></div>
            <p className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-bold">
              © 2026 <span className="text-zinc-900">unc code</span> / Studio Archive
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {footerNavs.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-zinc-400 hover:text-zinc-900 text-[9px] uppercase tracking-[0.4em] font-black transition-all duration-300 relative group"
                  to={item.href}>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
