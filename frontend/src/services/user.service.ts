import { api } from './servicesConfig/api.service'


/*type RegisterDataType = {
  username: string
  firstname: string
  lastname: string
  password: string
  passwordConfirmation: string
  email: string
}*/

type GetUserType = {
  result: User
  message: string
}

type UpdateDataType ={
  username: string
  firstname: string
  lastname: string
  email: string
  role: number | undefined;
  userId: string
};

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
  useRegisterUserQuery,
  useLazyRegisterUserQuery,
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

