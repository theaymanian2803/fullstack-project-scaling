import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetUsersDetailsQuery, useUpdateUserMutation } from '../../slices/userApiSlice'

function UserListAdmin() {
  const { id: userId } = useParams()
  const navigate = useNavigate()

  // --- State Configuration ---
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')

  const { data: user, isLoading, error } = useGetUsersDetailsQuery(userId)
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      })
      toast.success('User updated successfully')
      navigate('/admin/users')
    } catch (error) {
      toast.error(error.data.message) || 'something went wrong'
    }
  }

  return (
    <div className="bg-black min-h-screen pb-20 font-montserrat">
      {/* Top Navigation */}
      <div className="pt-6 ml-12">
        <Link
          className="bg-orange-600 text-white px-6 py-2 font-black uppercase tracking-tighter italic hover:bg-orange-500 transition-all inline-block"
          to="/admin/users">
          &larr; Return to users
        </Link>
      </div>

      <div className="flex items-center justify-center p-4 mt-4">
        <div className="w-full max-w-4xl bg-zinc-900/50 border border-zinc-800 p-8 rounded-sm shadow-2xl">
          <h1 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tighter">
            update <span className="text-orange-600">user</span>
            {isLoading && (
              <span className="ml-4 animate-pulse text-zinc-500 text-xs normal-case font-normal">
                updating Data...
              </span>
            )}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  Identify Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block  text-2xl font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
                  isAdmin
                </label>
                <input
                  type="checkbox"
                  value={isAdmin}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                  className=" px-4 text-2xl p-2 bg-black text-white border border-zinc-800 focus:border-orange-600 outline-none font-bold"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 rounded-sm font-bold uppercase tracking-tight text-center">
                Error: {error?.data?.message || error.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-orange-600 text-white font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all disabled:opacity-50 mt-4 shadow-xl">
              update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserListAdmin
