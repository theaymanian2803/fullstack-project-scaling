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
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8 overflow-hidden relative">
      {/* Subtle Orange Glow Effect in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.3)]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="space-y-8 sm:max-w-md sm:mx-auto sm:text-center">
          {/* Logo with slight glow */}
          <img
            src="/images/ex.png"
            className="w-40 sm:mx-auto drop-shadow-[0_0_8px_rgba(249,115,22,0.2)]"
            alt="Evanox Logo"
          />

          <p className="text-zinc-500 text-sm uppercase tracking-[0.2em] leading-relaxed italic font-medium">
            Elevating your digital experience through{' '}
            <span className="text-orange-500">premium</span> curated collections.
          </p>

          <div className="items-center gap-x-4 space-y-3 sm:flex sm:justify-center sm:space-y-0">
            {/* Primary Action Button with Orange Glow */}
            <Link
              to="/store"
              className="block py-3 px-8 text-center text-black font-black uppercase tracking-widest text-xs bg-white duration-300 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transform hover:-translate-y-1">
              Let's get started
            </Link>

            {/* Secondary Action Button */}
            <Link
              to="/login"
              className="flex items-center justify-center gap-x-2 py-3 px-8 text-white hover:text-orange-500 font-black uppercase tracking-widest text-xs duration-300 border border-zinc-800 hover:border-orange-500 md:inline-flex transform hover:-translate-y-1">
              Get access
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 py-10 border-t border-zinc-900 items-center justify-between sm:flex">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            © 2025 <span className="text-orange-500">Evanox</span> Store Inc. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-6 sm:mt-0">
            {footerNavs.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-zinc-500 hover:text-orange-500 text-[10px] uppercase tracking-[0.2em] font-black duration-300 transition-colors"
                  to={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Accent: Side Glow */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/5 blur-[120px] rounded-full"></div>
    </footer>
  )
}

export default Footer
