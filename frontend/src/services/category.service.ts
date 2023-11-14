import { api } from './servicesConfig/api.service'

interface Category {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}




export const categoryService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerCategory: builder.query({
      query: (data) => ({
        url: 'category/register',
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
    getAllCategories: builder.query<Category[],void|null>({
      query: () => ({
        url: 'category/get-all',
        method: 'GET',
        // This is the same as passing 'text'
        responseHandler: (response) => {
          if (!response.ok) {
            // Probably return some error object here
            return response.text()
          }
          return response.json()
        },
      }),
      transformResponse: (response: { data: Category[] }) => response.data,
      keepUnusedDataFor: 60,
    }),
    updateCategory: builder.query({
      query: (data) => ({
        url: 'category/update',
        method: 'PATCH',
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
    deleteCategory: builder.query({
      query: (data) => ({
        url: 'category/delete',
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
  }),
})

export const {
  useRegisterCategoryQuery,
  useLazyRegisterCategoryQuery,
  useDeleteCategoryQuery,
  useLazyDeleteCategoryQuery,
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
} = categoryService
