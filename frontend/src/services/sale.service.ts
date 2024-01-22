import { api } from './servicesConfig/api.service'
import { getSaleType, getSalesTableType, packageReceivedType, paymentConfirmationType, paymentRejectionType, registerSaleType, registerSaleTypeSuccess, sentPackageType } from './servicesTypes/sale.types'

export const saleService = api.injectEndpoints({
  endpoints: (builder) => ({

    registerSale: builder.mutation<registerSaleTypeSuccess, registerSaleType>({
      query: (data) => ({
        url: 'sales/register',
        method: 'POST',
        body: JSON.stringify(data)
      }),
    }),

    getSalesTable: builder.query<getSalesTableType, string>({
      query: (query) => ({
        url: 'sales/table' + query,
        method: 'GET',
      }),
      keepUnusedDataFor: 60,
      providesTags: [{ type: 'SALES', id: 'sales/table' }]
    }),

    getSaleById: builder.query<getSaleType, string>({
      query: (data) => ({
        url: 'sales/get-by-id/'+data,
        method: 'GET',
      }),
      keepUnusedDataFor: 60,
      providesTags: [{ type: 'SALES', id: 'sales/get-by-id' }]
    }),

    userPaymentConfirmation: builder.mutation<registerSaleTypeSuccess, paymentConfirmationType>({
      query: (data) => ({
        url: 'sales/user-payment-confirmation',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'SALES', id: 'sales/get-by-id' }, { type: 'SALES', id: 'sales/table' }],
    }),

    adminPaymentConfirmation: builder.mutation<registerSaleTypeSuccess, paymentConfirmationType>({
      query: (data) => ({
        url: 'sales/admin-payment-confirmation',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'SALES', id: 'sales/get-by-id' }, { type: 'SALES', id: 'sales/table' }],
    }),

    adminPaymentRejection: builder.mutation<registerSaleTypeSuccess, paymentRejectionType>({
      query: (data) => ({
        url: 'sales/admin-payment-rejection',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'SALES', id: 'sales/get-by-id' }, { type: 'SALES', id: 'sales/table' }],
    }),

    sentPackage: builder.mutation<registerSaleTypeSuccess, sentPackageType>({
      query: (data) => ({
        url: 'sales/sent-package',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'SALES', id: 'sales/get-by-id' }, { type: 'SALES', id: 'sales/table' }],
    }),

    packageReceived: builder.mutation<registerSaleTypeSuccess, packageReceivedType>({
      query: (data) => ({
        url: 'sales/package-received',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      invalidatesTags: [{ type: 'SALES', id: 'sales/get-by-id' }, { type: 'SALES', id: 'sales/table' }],
    }),
  }),
})

export const {
  useRegisterSaleMutation,
  useUserPaymentConfirmationMutation,
  useAdminPaymentConfirmationMutation,
  useAdminPaymentRejectionMutation,
  useSentPackageMutation,
  usePackageReceivedMutation,
  useGetSaleByIdQuery,
  useLazyGetSaleByIdQuery,
  useGetSalesTableQuery,
  useLazyGetSalesTableQuery,
} = saleService
