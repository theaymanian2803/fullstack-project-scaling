import React from 'react'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '.././../slices/orderApiSlice'

function OrderListAdmin() {
  const { data: orders, isLoading, error } = useGetOrdersQuery()

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-500 font-mono text-2xl tracking-widest animate-pulse font-bold">
          LOADING_SYSTEM_ORDERS...
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-black p-10 flex justify-center">
        <div className="max-w-2xl w-full bg-red-950/20 border border-red-900/50 p-10 rounded-xl text-red-500 text-center">
          <p className="font-extrabold text-2xl mb-2">System Error</p>
          <p className="text-lg opacity-80">{error?.data?.message || error.message}</p>
        </div>
      </div>
    )

  return (
    <div className="bg-black min-h-screen text-zinc-200 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
              Order <span className="text-indigo-500">Management</span>
            </h1>
            <p className="text-zinc-500 text-lg font-bold uppercase tracking-widest mt-2">
              Admin Control Panel
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-xl">
            <span className="text-zinc-400 text-sm font-bold mr-3 uppercase tracking-widest">
              Global Count:
            </span>
            <span className="text-white font-mono text-2xl font-bold">{orders?.length || 0}</span>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-800/30 text-zinc-400 text-xs font-black uppercase tracking-[0.25em]">
                  <th className="py-6 px-8">Order ID</th>
                  <th className="py-6 px-6">Date</th>
                  <th className="py-6 px-6">Customer</th>
                  <th className="py-6 px-6">Total</th>
                  <th className="py-6 px-6">Payment</th>
                  <th className="py-6 px-6">Delivery</th>
                  <th className="py-6 px-8 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-zinc-800/40 transition-all group">
                      <td className="py-7 px-8">
                        <span className="font-mono text-sm text-indigo-400 font-bold group-hover:text-indigo-300 transition">
                          {order._id}
                        </span>
                      </td>
                      <td className="py-7 px-6 text-base font-medium whitespace-nowrap">
                        {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                      </td>
                      <td className="py-7 px-6">
                        <div className="text-lg font-bold text-white whitespace-nowrap">
                          {order.user ? (
                            order.user.name
                          ) : (
                            <span className="text-zinc-600 italic font-medium">Deleted User</span>
                          )}
                        </div>
                      </td>
                      <td className="py-7 px-6">
                        <span className="text-xl font-black text-white tracking-tight">
                          ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                        </span>
                      </td>
                      <td className="py-7 px-6 whitespace-nowrap">
                        {order.isPaid ? (
                          <div className="flex flex-col">
                            <span className="text-emerald-400 text-sm font-black uppercase tracking-wider">
                              Verified
                            </span>
                            <span className="text-zinc-500 text-xs font-mono">
                              {order.paidAt?.substring(0, 10)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-500 text-sm font-black uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            Unpaid
                          </div>
                        )}
                      </td>
                      <td className="py-7 px-6 whitespace-nowrap">
                        {order.isDelivered ? (
                          <div className="flex flex-col">
                            <span className="text-emerald-400 text-sm font-black uppercase tracking-wider">
                              Delivered
                            </span>
                            <span className="text-zinc-500 text-xs font-mono">
                              {order.deliveredAt?.substring(0, 10)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-500 text-sm font-black uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                            Processing
                          </div>
                        )}
                      </td>
                      <td className="py-7 px-8 text-right">
                        <Link
                          to={`/order/${order._id}`}
                          className="inline-flex bg-white hover:bg-zinc-200 text-black text-xs font-black px-8 py-3 rounded-lg uppercase tracking-widest transition-all active:scale-95 shadow-lg">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}

                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan="7" className="py-40 text-center">
                      <p className="text-zinc-600 font-extrabold uppercase tracking-[0.4em] text-lg">
                        No records in system
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Swipe indicator for tablet/mobile */}
        <div className="mt-6 md:hidden text-center">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] animate-pulse">
            ← Scroll horizontally to view columns →
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderListAdmin
