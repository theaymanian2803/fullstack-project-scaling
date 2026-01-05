import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './../components/CheckoutSteps'
import { savePaymentMethod } from './../slices/cartSlice'

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* Progress Bar Container */}
      <div className="py-8">
        <CheckoutSteps step1 step2 step3 />
      </div>

      <div className="container mx-auto px-4 flex justify-center items-center h-[calc(100vh-250px)] min-h-[500px]">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg p-10 bg-[#0A0A0A] border border-zinc-800 shadow-2xl flex flex-col gap-8">
          {/* Header Section */}
          <div className="mb-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
              Payment <span className="text-orange-500">Method</span>
            </h2>
            <div className="h-1 w-12 bg-orange-500 mt-2"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mt-4">
              Select your preferred way to pay
            </p>
          </div>

          {/* Payment Options Area */}
          <div className="space-y-4">
            <div
              className={`flex items-center p-5 border transition-all duration-300 cursor-pointer ${
                paymentMethod === 'PayPal'
                  ? 'border-orange-500 bg-orange-500/5'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
              }`}
              onClick={() => setPaymentMethod('PayPal')}>
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === 'PayPal'}
                className="w-5 h-5 accent-orange-500 cursor-pointer"
              />
              <label htmlFor="paypal" className="ml-4 flex flex-col cursor-pointer">
                <span className="text-lg font-bold tracking-tight text-white leading-none">
                  PayPal or Credit Card
                </span>
                <span className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                  Secure encrypted transaction
                </span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="mt-4 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg active:scale-95">
            Continue to Order
          </button>

          <p className="text-center text-[9px] text-zinc-600 uppercase tracking-widest leading-relaxed">
            By clicking continue, you agree to our <br /> terms of service and privacy policy.
          </p>
        </form>
      </div>
    </div>
  )
}

export default Payment
