import { api } from './servicesConfig/api.service'
import { RegisterProductType, RegisterProductTypeSuccess, UpdateProductType, getProductType, getTableProductsType } from './servicesTypes/product.types'

export const productsService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerProducts: builder.mutation<RegisterProductTypeSuccess, RegisterProductType>({
      query: (data) => ({
        url: 'products/register',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'PRODUCTS', id: 'products/table' }],
    }),

    getTableProducts: builder.query< getTableProductsType, string>({
      query: (data) => ({
        url: 'products/table/'+data,
        method: 'GET',
      }),
      providesTags: [{ type: 'PRODUCTS', id: 'products/table' }],
      keepUnusedDataFor: 60,
    }),

    getProduct: builder.query<getProductType, string>({
      query: (data) => ({
        url: 'products/product/'+data,
        method: 'GET',
      }),
      providesTags: [{ type: 'PRODUCTS', id: 'products/product' }],
      keepUnusedDataFor: 60,
    }),

    updateProducts: builder.mutation<getProductType, UpdateProductType>({
      query: (data) => ({
        url: 'products/update/'+data.productId,
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'PRODUCTS', id: 'products/product' }, { type: 'PRODUCTS', id: 'products/table' }],
    }),

    deleteProducts: builder.mutation({
      query: (data) => ({
        url: 'products/delete',
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
      invalidatesTags: [{ type: 'PRODUCTS', id: 'products/product' }, { type: 'PRODUCTS', id: 'products/table' }],
    }),
  }),
})

export const {
  useRegisterProductsMutation,
  useGetTableProductsQuery,
  useLazyGetTableProductsQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation
} = productsService
