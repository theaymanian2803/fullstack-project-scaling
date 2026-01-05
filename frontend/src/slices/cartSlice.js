import { createSlice } from '@reduxjs/toolkit'
// import { updateCart } from '../utils/updateState' // Removing this since update logic is now inside the slice
import { updateCart } from './../utils/updateState'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {},
      paymentMethod: 'Paypal',
    }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const incomingQty = Number(item.qty)

      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        const newQty = incomingQty + Number(existItem.qty)

        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: newQty } : x
        )
      } else {
        state.cartItems = [...state.cartItems, { ...item, qty: incomingQty }]
      }

      return updateCart(state)
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
      return updateCart(state)
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload
      return updateCart(state)
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload
      return updateCart(state)
    },
    clearCart(state) {
      state.cartItems = []
      return updateCart(state)
    },
    resetCart: (state) => (state = initialState),
  },
})
export const {
  addToCart,
  removeItem,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
  resetCart,
} = cartSlice.actions
export default cartSlice.reducer
