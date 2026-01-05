import React from 'react'
import CheckoutSteps from './../components/CheckoutSteps'
import Orders from './OrderScreen'

function PlaceOrder() {
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Orders />
    </div>
  )
}

export default PlaceOrder
