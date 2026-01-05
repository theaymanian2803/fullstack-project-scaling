import React, { useState } from 'react'
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeItem } from './../slices/cartSlice'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export default function CartScreen() {
  const [qty, setQty] = useState(1)
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
  const shippingThreshold = 100 // Example threshold
  const remainingForFreeShipping = Math.max(0, shippingThreshold - itemsPrice)
  const progressPercent = Math.min(100, (itemsPrice / shippingThreshold) * 100)
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10 tracking-tight">Shopping Cart</h1>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* LEFT COLUMN - CART ITEMS */}
          <div className="flex-1">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-6 border-b border-zinc-800 pb-4 mb-6 text-zinc-500 text-lg font-medium tracking-wide uppercase">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="space-y-8">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="group flex flex-col md:grid md:grid-cols-12 gap-6 items-center border-b border-zinc-900 pb-8 last:border-0">
                  {/* PRODUCT INFO */}
                  <div className="col-span-6 flex gap-6 w-full">
                    <div className="w-34 h-34 shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                      <img
                        src={item.images[1]}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>

                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xl font-semibold text-white">{item.price} MAD</span>
                          {item.originalPrice && (
                            <span className="text-lg text-zinc-600 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Discount Badge */}
                      <div className="flex items-center gap-2 text-orange-400 text-base mt-2">
                        <Tag size={18} />
                        <span>Product Discount 20%</span>
                      </div>
                    </div>
                  </div>

                  {/* QUANTITY CONTROL */}
                  <div className="col-span-3 flex justify-center w-full">
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 w-[100px]">
                      <span className="w-16 text-center text-2xl font-bold text-white tabular-nums">
                        <select
                          className="p-2 border-orange-500 rounded-2xl"
                          value={item.qty}
                          onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option className="text-black bg-amber-100" key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </span>
                    </div>
                  </div>

                  {/* TOTAL & ACTIONS */}
                  <div className="col-span-3 text-right flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col items-end">
                      {item.originalPrice && (
                        <span className="text-lg text-zinc-600 line-through block mb-1">
                          {addDecimals(item.originalPrice * item.qty)} MAD
                        </span>
                      )}
                      <span className="text-3xl font-bold text-white">
                        {addDecimals(item.price * item.qty)} MAD
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-lg text-zinc-500 hover:text-red-400 underline decoration-zinc-800 hover:decoration-red-400 underline-offset-4 transition-all mt-4 md:mt-0 self-end z-40">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/"
                className="text-blue-500 text-xl font-medium hover:text-blue-400 flex items-center gap-2 transition-colors">
                <ArrowRight className="rotate-180" size={24} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="w-full xl:w-[480px] shrink-0">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 sticky top-8">
              {/* Free Shipping Progress */}
              <div className="mb-10">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-lg text-zinc-300">
                    {remainingForFreeShipping > 0 ? (
                      `Spend ${addDecimals(remainingForFreeShipping)} MAD more for FREE shipping`
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center gap-2">
                        <ShieldCheck size={20} /> You've unlocked FREE shipping!
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Order Instructions (Accordion Placeholder) */}
              <div className="border-t border-b border-zinc-800 py-6 mb-8">
                <div className="flex justify-between items-center cursor-pointer group">
                  <span className="text-xl font-medium text-zinc-300 group-hover:text-white transition-colors">
                    Order instruction
                  </span>
                  <Plus
                    size={24}
                    className="text-zinc-500 group-hover:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Totals */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xl text-zinc-400">Estimate total</span>
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {addDecimals(itemsPrice)} MAD
                  </span>
                </div>
                <p className="text-zinc-500 text-base mt-2">
                  Tax included and shipping calculated at checkout
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={checkoutHandler}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold py-5 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-900/20">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
