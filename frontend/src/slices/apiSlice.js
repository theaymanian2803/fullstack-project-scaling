import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
import { User } from 'lucide-react'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'User, Order'],
  endpoints: (builder) => ({}),
})
