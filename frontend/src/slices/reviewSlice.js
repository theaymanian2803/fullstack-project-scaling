import { apiSlice } from './apiSlice'
import { REVIEWS_URL } from '../constants'

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    approveReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/approve`,
        method: 'PUT',
        body: data,
      }),
      // This forces the product list to refresh so the "Approved" status updates in UI
      invalidatesTags: ['Products'],
    }),
  }),
})

export const { useApproveReviewMutation } = reviewApiSlice
