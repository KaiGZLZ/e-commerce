import { api } from './servicesConfig/api.service'

type getTableProductsType = {
  result: Product[]
  total: number
}

type getProductType = {
  result: Product
}

export const productsService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerProducts: builder.query({
      query: (data) => ({
        url: 'products/register',
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
    getTableProducts: builder.query< getTableProductsType, string>({
      query: (data) => ({
        url: 'products/table'+data,
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
      transformResponse: (response: { data: getTableProductsType }) => response.data,
      keepUnusedDataFor: 60,
    }),
    getProduct: builder.query<getProductType, string>({
      query: (data) => ({
        url: 'products/product/'+data,
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
      transformResponse: (response: { data: getProductType }) => response.data,
      keepUnusedDataFor: 60,
    }),
    deleteProducts: builder.query({
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
    }),
  }),
})

export const {
  useRegisterProductsQuery,
  useLazyRegisterProductsQuery,
  useGetTableProductsQuery,
  useLazyGetTableProductsQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  useDeleteProductsQuery,
  useLazyDeleteProductsQuery,
} = productsService
