import { api } from './servicesConfig/api.service'

export const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.query({
      query: (data) => ({
        url: 'user/register',
        method: 'POST',
        body: JSON.stringify(data),
        // This is the same as passing 'text'
        responseHandler: (response) => {
          if (!response.ok) {
            // Probably return some error object here
            return response.text()
          }
          return response.json()
        },
      }),
    }),
    authenticateUser: builder.query({
      query: (data) => ({
        url: 'user/authenticate',
        method: 'POST',
        body: JSON.stringify(data),
        // This is the same as passing 'text'
        responseHandler: (response) => {
          if (!response.ok) {
            // Probably return some error object here
            return response.text()
          }
          return response.json()
        },
      }),
    }),
    deleteUser: builder.query({
      query(data) {
        return {
          url: 'user/delete',
          method: 'DELETE',
          body: JSON.stringify({ ...data }),
        }
      },
    }),
    loginUser: builder.query({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: JSON.stringify(data),
        // This is the same as passing 'text'
        responseHandler: (response) => {
          if (!response.ok) {
            // Probably return some error object here
            return response.text()
          }
          return response.json()
        },
      }),
    }),
    ForgottenPasswordUser: builder.query({
      query(data) {
        return {
          url: 'user/forgotten-password',
          method: 'POST',
          body: JSON.stringify({ ...data }),
        }
      },
    }),
    ChangePasswordUser: builder.query({
      query(data) {
        return {
          url: 'user/change-password',
          method: 'POST',
          body: JSON.stringify({ ...data }),
        }
      },
    }),
  }),
})

export const {
  useRegisterUserQuery,
  useLazyRegisterUserQuery,
  useAuthenticateUserQuery,
  useLazyAuthenticateUserQuery,
  useDeleteUserQuery,
  useLazyDeleteUserQuery,
  useLoginUserQuery,
  useLazyLoginUserQuery,
  useForgottenPasswordUserQuery,
  useLazyForgottenPasswordUserQuery,
  useChangePasswordUserQuery,
  useLazyChangePasswordUserQuery,


} = userService





/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../config/config'


// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        registerUser: builder.query({

            query(user) {
                return {
                url: `user/register`,
                method: 'POST',
                body: JSON.stringify({user}),
                }

                method: 'POST',
                body: JSON.stringify({user}),
                headers:{
                'Content-Type': 'application/json'
                }
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi*/