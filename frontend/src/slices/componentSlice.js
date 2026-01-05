import { apiSlice } from './apiSlice'
import { COMPONENT_URL } from '../constants'

export const componentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComponents: builder.query({
      query: () => COMPONENT_URL,
      providesTags: ['Component'], // Correct tag format
    }),
    addComponent: builder.mutation({
      query: (newComponent) => ({
        url: COMPONENT_URL,
        method: 'POST',
        body: newComponent,
      }),
      invalidatesTags: ['Component'], // Changed from string to array
    }),
    deleteComponent: builder.mutation({
      query: (id) => ({
        url: `${COMPONENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Component'],
    }),
  }),
})

export const { useGetComponentsQuery, useAddComponentMutation, useDeleteComponentMutation } =
  componentsApiSlice
