import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/userApiSlice'
import { setInforForUser } from '../slices/authSlice'

const LoginForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await register({ name, email, password }).unwrap()
      dispatch(setInforForUser({ ...res }))
    } catch (error) {
      console.error(error?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

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
              Create <span className="text-orange-500 italic">Account</span>
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

            {/* Password Field */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
                Create Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-zinc-900/50 border border-zinc-800 p-4 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg active:scale-95 disabled:opacity-50 mt-4">
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#0A0A0A] px-4 text-zinc-600">Already a member?</span>
            </div>
          </div>

          {/* Login Section */}
          <div className="text-center">
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="group flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-orange-500 transition-colors duration-300">
              Login to Evanox
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-zinc-600 text-[9px] uppercase tracking-[0.2em]">
          Join the Collection • Evanox Boutique
        </p>
      </div>
    </div>
  )
}

export default LoginForm
