import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../../config/config'
import authHeader from '../../__helpers/auth-header'

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {

      headers.set( 'Content-Type', 'application/json' )
      headers.set('Authorization', authHeader())
      return headers
    }
  }),
  endpoints: () => ({}),
})

