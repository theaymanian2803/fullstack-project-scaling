// store.js
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import userSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    auth: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
