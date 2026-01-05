import { apiSlice } from './apiSlice'
import { CONTACT_URL } from '../constants'

export const contactAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (data) => ({
        url: CONTACT_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useContactMutation } = contactAdmin
