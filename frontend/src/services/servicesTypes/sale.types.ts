
export type registerSaleType = {
  token: string | null;
  products: Product[];
  total: number;
  totalQuantity: number;
  email: string | null;
};

export type registerSaleTypeSuccess = {
  message: string;
  saleId: string
};

export type getSaleType = {
  sale: Sale
}

export type paymentConfirmationType = {
  saleId: string | undefined
  paymentMethod: string
  paymentReference: string
  paymentDate: string
}

export type paymentRejectionType = {
  saleId: string
  rejectionReason: string
}

export type sentPackageType = {
  saleId: string
  trackingCode: string
}

export type packageReceivedType = {
  saleId: string
  rating: number
  comment: string
}