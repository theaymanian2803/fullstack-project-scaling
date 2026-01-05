import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useProfileMutation } from './../slices/userApiSlice'
import { setInforForUser } from './../slices/authSlice'
import { useGetMyOrdersQuery } from './../slices/orderApiSlice'
import { toast } from 'react-toastify'

function Profile() {
  const { userInfo } = useSelector((state) => state.auth)

  const [name, setName] = useState(userInfo?.name || '')
  const [email, setEmail] = useState(userInfo?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [updateProfile, { isLoading }] = useProfileMutation()
  const { data: orders, isLoading: ordersIsLoading, error: ordersError } = useGetMyOrdersQuery()

  const updateProfileHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap()
        dispatch(setInforForUser(res))
        toast.success('Profile updated successfully')
      } catch (err) {
        toast.error(err?.data?.message || 'Something went wrong')
      }
    }
  }

  return (
    <div className="w-11/12 mx-auto p-4 flex flex-col lg:flex-row gap-10 min-h-screen text-white">
      {/* LEFT SIDE: UPDATE PROFILE FORM */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 uppercase tracking-wider">Update Credentials</h1>
        <form onSubmit={updateProfileHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">EMAIL ADDRESS</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition duration-300">
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE: ORDER HISTORY TABLE */}
      <div className="lg:flex-[3] overflow-x-auto">
        <h1 className="text-3xl font-bold mb-6 uppercase tracking-wider">My Order History</h1>

        {ordersIsLoading ? (
          <div className="text-center py-10 text-gray-400 font-bold">Loading orders...</div>
        ) : ordersError ? (
          <div className="text-red-500 bg-red-900/20 p-4 rounded-lg">
            {ordersError?.data?.message || 'Error loading orders'}
          </div>
        ) : (
          <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase">
                  <th className="py-4 px-3">ID</th>
                  <th className="py-4 px-3">DATE</th>
                  <th className="py-4 px-3">TOTAL</th>
                  <th className="py-4 px-3">PAID</th>
                  <th className="py-4 px-3">DELIVERED</th>
                  <th className="py-4 px-3 text-center">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="py-4 px-3 font-mono text-xs text-blue-400">{order._id}</td>
                      <td className="py-4 px-3 text-sm">
                        {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                      </td>
                      <td className="py-4 px-3 text-sm font-bold">
                        ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                      </td>
                      <td className="py-4 px-3 text-sm">
                        {order.isPaid ? (
                          <span className="text-green-500">{order.paidAt?.substring(0, 10)}</span>
                        ) : (
                          <span className="text-red-500 font-bold">✘</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-sm">
                        {order.isDelivered ? (
                          <span className="text-green-500">
                            {order.deliveredAt?.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-red-500 font-bold">✘</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center">
                        <Link
                          to={`/order/${order._id}`}
                          className="inline-block bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2 px-6 rounded transition duration-200">
                          DETAILS
                        </Link>
                      </td>
                    </tr>
                  ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan="6" className="py-20 text-center text-gray-500">
                      No orders found in your history.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
