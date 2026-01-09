import React, { useState } from 'react'
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeItem } from './../slices/cartSlice'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export default function CartScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id))
  }

  // Calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shippingThreshold = 1000 // Adjusted for MAD
  const remainingForFreeShipping = Math.max(0, shippingThreshold - itemsPrice)
  const progressPercent = Math.min(100, (itemsPrice / shippingThreshold) * 100)

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div className="min-h-screen bg-[#E5E5E1] text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Spacer for Fixed Navbar */}
      <div className="h-32 md:h-40" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
        {/* Header Section */}
        <div className="mb-16 border-l-8 border-zinc-900 pl-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            Shopping <br />
            <span className="font-serif italic text-zinc-400 normal-case tracking-tight">Cart</span>
          </h1>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm font-black">
            {cartItems.length} Items Locked in Archive
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-16">
          {/* LEFT COLUMN - CART ITEMS */}
          <div className="flex-1">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-6 border-b-2 border-zinc-200 pb-6 mb-10 text-zinc-400 text-xs font-black tracking-[0.2em] uppercase">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Unit Total</div>
            </div>

            <div className="space-y-12">
              {cartItems.length === 0 ? (
                <div className="bg-white/50 backdrop-blur-sm rounded-[3rem] p-20 text-center border border-white">
                  <p className="font-serif italic text-3xl text-zinc-400 mb-8">
                    Your vault is currently empty.
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-12 py-5 bg-zinc-900 text-white rounded-full font-black uppercase tracking-widest text-xs">
                    Explore Collection
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="group flex flex-col md:grid md:grid-cols-12 gap-8 items-center border-b border-zinc-200 pb-12 last:border-0">
                    {/* PRODUCT INFO */}
                    <div className="col-span-6 flex gap-8 w-full">
                      <div className="w-40 h-40 shrink-0 bg-white rounded-[2rem] overflow-hidden border border-white shadow-sm group-hover:shadow-xl transition-all duration-700">
                        <img
                          src={item.images && item.images[1] ? item.images[1] : item.image}
                          alt={item.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter mb-2 group-hover:text-zinc-500 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-zinc-900">{item.price} MAD</span>
                        </div>
                        {/* Status Tag */}
                        <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-4 bg-zinc-100 w-fit px-3 py-1 rounded-full">
                          <Tag size={12} />
                          <span>In Stock / Ready to Ship</span>
                        </div>
                      </div>
                    </div>

                    {/* QUANTITY CONTROL */}
                    <div className="col-span-3 flex justify-center w-full">
                      <div className="relative inline-block w-24">
                        <select
                          className="w-full appearance-none bg-white border-2 border-zinc-100 rounded-2xl py-4 px-6 text-center font-black text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors cursor-pointer"
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* TOTAL & ACTIONS */}
                    <div className="col-span-3 text-right flex flex-col justify-center h-full w-full">
                      <span className="text-3xl font-black text-zinc-900 tracking-tighter">
                        {addDecimals(item.price * item.qty)} MAD
                      </span>
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-zinc-900 transition-colors mt-4">
                        Remove from Archive —
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-20">
              <Link
                to="/"
                className="group inline-flex items-center gap-4 text-zinc-900 font-black uppercase tracking-[0.3em] text-xs">
                <div className="w-12 h-12 rounded-full border border-zinc-900 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <ArrowRight className="rotate-180" size={18} />
                </div>
                <span>Back to Store</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="w-full xl:w-[500px] shrink-0">
            <div className="bg-white/40 backdrop-blur-md border border-white rounded-[3rem] p-10 md:p-14 sticky top-40 shadow-xl shadow-zinc-200/50">
              {/* Shipping Logic */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Logistics
                  </span>
                </div>
                <div className="text-sm font-bold text-zinc-800 mb-4 leading-relaxed">
                  {remainingForFreeShipping > 0 ? (
                    `Spend ${addDecimals(
                      remainingForFreeShipping
                    )} MAD more for COMPLIMENTARY shipping`
                  ) : (
                    <span className="text-zinc-900 flex items-center gap-2">
                      <ShieldCheck size={18} /> SHIPPING UNLOCKED
                    </span>
                  )}
                </div>
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Estimate */}
              <div className="mb-12 pt-10 border-t border-zinc-100">
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 block mb-4">
                  Subtotal
                </span>
                <div className="flex justify-between items-baseline">
                  <span className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter">
                    {addDecimals(itemsPrice)}
                  </span>
                  <span className="text-xl font-black text-zinc-900 ml-2">MAD</span>
                </div>
                <p className="text-zinc-400 text-xs font-medium mt-6 leading-relaxed">
                  VAT included. Logistics and handling calculated based on destination at next step.
                </p>
              </div>

              {/* Checkout Button */}
              <button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="w-full bg-zinc-900 hover:bg-zinc-700 text-white text-xs font-black uppercase tracking-[0.4em] py-7 rounded-full transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
