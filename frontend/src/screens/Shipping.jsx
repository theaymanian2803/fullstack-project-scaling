import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from './../slices/cartSlice'
import CheckoutSteps from './../components/CheckoutSteps'

function Shipping() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* Progress Bar Padding */}
      <div className="py-8">
        <CheckoutSteps step1 step2 />
      </div>

      <div className="container mx-auto px-4 flex justify-center items-center h-[calc(100vh-200px)] min-h-[600px]">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg p-10 bg-[#0A0A0A] border border-zinc-800 shadow-2xl flex flex-col gap-6">
          <div className="mb-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
              Shipping <span className="text-orange-500">Details</span>
            </h2>
            <div className="h-1 w-12 bg-orange-500 mt-2"></div>
          </div>

          {/* Address Field */}
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Street Name"
              className="p-4 bg-zinc-900 text-white border border-zinc-800 focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm"
              required
            />
          </div>

          {/* City Field */}
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="p-4 bg-zinc-900 text-white border border-zinc-800 focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Postal Code Field */}
            <div className="flex flex-col">
              <label
                htmlFor="postalCode"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="00000"
                className="p-4 bg-zinc-900 text-white border border-zinc-800 focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm"
                required
              />
            </div>

            {/* Country Field */}
            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="p-4 bg-zinc-900 text-white border border-zinc-800 focus:border-orange-500 focus:outline-none transition-all duration-300 text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg">
            continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping
