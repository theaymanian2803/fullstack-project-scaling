import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContactMutation } from './../slices/contactApiSlice'
import { toast } from 'react-toastify'

function ContactAdmin() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [contact, { isLoading, error }] = useContactMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await contact({ name, email, message }).unwrap()
      toast.success('message sent successfully')
      navigate('/')
      // Optional: Clear form after success
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
      console.error(error?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 antialiased relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-[#0A0A0A] border border-zinc-800 p-10 shadow-2xl relative">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
              message <span className="text-orange-500 italic">admin</span>
            </h1>
            <div className="h-1 w-12 bg-orange-500 mx-auto mt-3"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-zinc-900/50 border border-zinc-800 p-4 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 text-sm"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-zinc-900/50 border border-zinc-800 p-4 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 text-sm"
                required
              />
            </div>

            {/* Message Field (CHANGED TO TEXTAREA) */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
                send a message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="enter your message"
                className="bg-zinc-900/50 border border-zinc-800 p-4 text-white focus:outline-none focus:border-orange-500 min-h-[200px] transition-all duration-300 text-sm resize"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg active:scale-95 disabled:opacity-50 mt-4">
              {isLoading ? 'sending...' : 'send message'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#0A0A0A] px-4 text-zinc-600">contact admin</span>
            </div>
          </div>

          {/* Login Section */}
          <div className="text-center">
            <Link
              to="/"
              className="group flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-orange-500 transition-colors duration-300">
              admin entry
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactAdmin
