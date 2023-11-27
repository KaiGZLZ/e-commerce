import { api } from './servicesConfig/api.service'

interface Category {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

type RegisterCategoryType = {
  name: string
  description: string
}


export const categoryService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerCategory: builder.mutation<SimpleResponse , RegisterCategoryType>({
      query: (data) => ({
        url: 'category/register',
        method: 'POST',
        body: JSON.stringify(data)
      }),
      invalidatesTags: [{ type: 'CATEGORY', id: 'category/get-all' }],
    }),

    getAllCategories: builder.query<Category[],void|null>({
      query: () => ({
        url: 'category/get-all',
        method: 'GET',
      }),
      keepUnusedDataFor: 60,
      providesTags: [{ type: 'CATEGORY', id: 'category/get-all' }]
    }),

    updateCategory: builder.query({
      query: (data) => ({
        url: 'category/update',
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    }),

    deleteCategory: builder.query({
      query: (data) => ({
        url: 'category/delete',
        method: 'DELETE',
        body: JSON.stringify(data),
      }),
    }),
  }),
})

export const {
  useRegisterCategoryMutation,
  useDeleteCategoryQuery,
  useLazyDeleteCategoryQuery,
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
} = categoryService
