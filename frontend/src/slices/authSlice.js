import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInforForUser(state, action) {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },

    logout(state) {
      state.userInfo = null
      localStorage.clear()
    },
  },
})

export const { setInforForUser, logout } = userSlice.actions
export default userSlice.reducer
