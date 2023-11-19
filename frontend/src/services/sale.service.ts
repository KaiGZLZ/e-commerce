import { api } from './servicesConfig/api.service'

type registerSaleType = {
  token: string | null;
  products: Product[];
  total: number;
  totalQuantity: number;
  email: string | null;
};

type registerSaleTypeSuccess = {
  message: string;
  saleId: string
};


type getTableSaleType = {
  result: Product[]
  total: number
}

type getSaleType = {
  sale: Sale
}

export const saleService = api.injectEndpoints({
  endpoints: (builder) => ({
    registerSale: builder.mutation<registerSaleTypeSuccess, registerSaleType>({
      query: (data) => ({
        url: 'sales/register',
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
    getSaleById: builder.query<getSaleType, string>({
      query: (data) => ({
        url: 'sales/get-by-id/'+data,
        method: 'GET',
      }),
      transformResponse: (response: { data: getSaleType }) => response.data,
      keepUnusedDataFor: 60,
    }),
    getTableSale: builder.query< getTableSaleType, string>({
      query: (data) => ({
        url: 'sales/table'+data,
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
      transformResponse: (response: { data: getTableSaleType }) => response.data,
      keepUnusedDataFor: 60,
    }),
    deleteSale: builder.query({
      query: (data) => ({
        url: 'sales/delete',
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
  useRegisterSaleMutation,
  useGetTableSaleQuery,
  useLazyGetTableSaleQuery,
  useGetSaleByIdQuery,
  useLazyGetSaleByIdQuery,
  useDeleteSaleQuery,
  useLazyDeleteSaleQuery,
} = saleService
