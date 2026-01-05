import React from 'react'
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
  // Base classes: Larger text (base to 2xl), heavy tracking, and thick bottom border
  const baseClasses =
    'px-2 py-3 transition-all duration-300 text-lg sm:text-2xl font-black uppercase tracking-tighter italic border-b-4'

  // Active: Signature orange with white hover effect
  const activeClasses = 'border-orange-500 text-orange-500 hover:text-white hover:border-white'

  // Disabled: Muted zinc with transparent border
  const disabledClasses = 'border-transparent text-zinc-800 cursor-not-allowed'

  return (
    <div className="w-full flex justify-center items-center py-10 bg-black">
      <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
        {/* Step 1: Sign In */}
        <div className="flex items-center">
          {step1 ? (
            <Link to="/login">
              <button className={`${baseClasses} ${activeClasses}`}>01 Sign In</button>
            </Link>
          ) : (
            <button className={`${baseClasses} ${disabledClasses}`} disabled>
              01 Sign In
            </button>
          )}
        </div>

        {/* Step 2: Shipping */}
        <div className="flex items-center">
          {step2 ? (
            <Link to="/shipping">
              <button className={`${baseClasses} ${activeClasses}`}>02 Shipping</button>
            </Link>
          ) : (
            <button className={`${baseClasses} ${disabledClasses}`} disabled>
              02 Shipping
            </button>
          )}
        </div>

        {/* Step 3: Payment */}
        <div className="flex items-center">
          {step3 ? (
            <Link to="/payment">
              <button className={`${baseClasses} ${activeClasses}`}>03 Payment</button>
            </Link>
          ) : (
            <button className={`${baseClasses} ${disabledClasses}`} disabled>
              03 Payment
            </button>
          )}
        </div>

        {/* Step 4: Place Order */}
        <div className="flex items-center">
          {step4 ? (
            <Link to="/placeorder">
              <button className={`${baseClasses} ${activeClasses}`}>04 Order</button>
            </Link>
          ) : (
            <button className={`${baseClasses} ${disabledClasses}`} disabled>
              04 Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutSteps
