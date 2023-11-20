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

type getSaleType = {
  sale: Sale
}

type paymentConfirmationType = {
  saleId: string | undefined
  paymentMethod: string
  paymentReference: string
  paymentDate: string
}

type paymentRejectionType = {
  saleId: string
  rejectionReason: string
}

type sentPackageType = {
  saleId: string
  trackingCode: string
}

type packageReceivedType = {
  saleId: string
  rating: number
  comment: string
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
    userPaymentConfirmation: builder.mutation<registerSaleTypeSuccess, paymentConfirmationType>({
      query: (data) => ({
        url: 'sales/user-payment-confirmation',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: { data: registerSaleTypeSuccess }) => response.data,
    }),
    adminPaymentConfirmation: builder.mutation<registerSaleTypeSuccess, paymentConfirmationType>({
      query: (data) => ({
        url: 'sales/admin-payment-confirmation',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: { data: registerSaleTypeSuccess }) => response.data,
    }),
    adminPaymentRejection: builder.mutation<registerSaleTypeSuccess, paymentRejectionType>({
      query: (data) => ({
        url: 'sales/admin-payment-rejection',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: { data: registerSaleTypeSuccess }) => response.data,
    }),
    sentPackage: builder.mutation<registerSaleTypeSuccess, sentPackageType>({
      query: (data) => ({
        url: 'sales/sent-package',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: { data: registerSaleTypeSuccess }) => response.data,
    }),
    packageReceived: builder.mutation<registerSaleTypeSuccess, packageReceivedType>({
      query: (data) => ({
        url: 'sales/package-received',
        method: 'POST',
        body: JSON.stringify(data),
      }),
      transformResponse: (response: { data: registerSaleTypeSuccess }) => response.data,
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
} = saleService
