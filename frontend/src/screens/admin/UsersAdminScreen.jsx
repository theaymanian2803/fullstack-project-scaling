import React, { useState } from 'react'
import { Plus, SquarePen, Trash, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/userApiSlice'
import { toast } from 'react-toastify'
function UsersAdminScreen() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = (id) => async (e) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteUser(id).unwrap()
        refetch()
        toast.success('User deleted successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.message || 'Failed to delete product')
      }
    }
  }

  return (
    <div>
      <div className="bg-black min-h-screen text-white pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
                list <span className="text-orange-600">of users</span>
              </h1>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2 font-bold">
                Management users
              </p>
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase px-6 py-3 tracking-tighter transition-all duration-200 rounded-sm disabled:opacity-50">
              <Plus size={20} />
            </button>
          </div>

          {/* --- MOBILE VIEW (Visible only on small screens) --- */}
          <div className="block md:hidden space-y-4">
            {users?.map((user) => (
              <div key={user._id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight leading-tight">
                      {user.name}
                    </h3>
                    <p className="text-blue-400 font-mono text-[10px] mt-1">{user._id}</p>
                  </div>
                  <p className="text-orange-500 font-black text-xl">${user.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs uppercase font-bold tracking-widest text-zinc-500 mb-6">
                  <div>
                    <span className="block text-[10px] text-zinc-600 mb-1">isAdmin</span>
                    {user.isAdmin ? (
                      <div>
                        <Check style={{ color: 'green' }} />
                      </div>
                    ) : (
                      <div>
                        <X style={{ color: 'red' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 border-t border-zinc-800 pt-4">
                  {/* Fixed SquarePen Link */}
                  <Link
                    to={`/admin/user/${user._id}/edit`}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 p-3 flex justify-center transition-colors rounded-sm">
                    <SquarePen size={18} />
                  </Link>

                  {/* Trash Button */}
                  <button className="flex-1 bg-red-900/20 text-red-500 border border-red-900/50 flex justify-center items-center hover:bg-red-500 hover:text-white transition-all rounded-sm">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* --- DESKTOP VIEW (Visible only on medium screens and up) --- */}
          <div className="hidden md:block overflow-hidden bg-zinc-900/30 border border-zinc-800 rounded-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-300 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="py-5 px-6">ID</th>
                  <th className="py-5 px-6">name</th>
                  <th className="py-5 px-6">email</th>
                  <th className="py-5 px-6">admin</th>
                  <th className="py-5 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users?.map((user) => (
                  <tr key={user._id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="py-5 px-6 font-mono text-[11px] text-zinc-500 group-hover:text-blue-400 transition-colors">
                      {user._id.substring(0, 12)}...
                    </td>
                    <td className="py-5 px-6 text-sm font-bold uppercase tracking-tight">
                      {user.name}
                    </td>
                    <td className="py-5 px-6 text-sm font-black text-orange-500">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td className="py-5 px-6 text-sm font-black text-orange-500">
                      {user.isAdmin ? (
                        <div>
                          <Check />
                        </div>
                      ) : (
                        <div>
                          <X />
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-center items-center gap-3">
                        {/* FIX 1: Edit Icon (Link Only) */}
                        <Link
                          to={`/admin/user/${user._id}/edit`}
                          className="text-zinc-500 hover:text-white transition-colors">
                          <SquarePen size={19} style={{ color: 'orange' }} />
                        </Link>

                        <button
                          onClick={deleteHandler(user._id)}
                          type="button"
                          className="text-zinc-500 hover:text-red-500 transition-colors">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersAdminScreen
