import { api } from './servicesConfig/api.service'
import { AuthenticationUserType, GetUserType, LoginUserType, LoginUserTypeSuccess, RegisterUserType, SimpleResponse, UpdateDataType } from './servicesTypes/user.types'

export const userService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<SimpleResponse, RegisterUserType>({
      query: (data) => ({
        url: 'user/register',
        method: 'POST',
        body: JSON.stringify(data),
      }),
    }),

    getUserByUsername: builder.query<GetUserType, string>({
      query: (data) => ({
        url: 'user/get-user-by-username/'+data,
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<GetUserType, UpdateDataType>({
      query: (data) => ({
        url: 'user/update',
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    }),

    authenticateUser: builder.query<LoginUserTypeSuccess, AuthenticationUserType>({
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
      query: (data) => ({
        url: 'user/delete',
        method: 'DELETE',
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

    loginUser: builder.query<LoginUserTypeSuccess, LoginUserType>({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: JSON.stringify(data),
      }),
    }),

    ForgottenPasswordUser: builder.query({
      query: (data) => ({
        url: 'user/forgotten-password',
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
    ChangePasswordUser: builder.query({
      query: (data) => ({
        url: 'user/change-password',
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
  }),
})

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserByUsernameQuery,
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

