export type RegisterProductType = {
    name: string
    price: number
    description: string
    category: string
    wholesalePrice: number | undefined
    orderMinForWholesale: number | undefined
    stock: number
  }

export type RegisterProductTypeSuccess = {
    message: string
  }


export type getTableProductsType = {
  result: Product[]
  total: number
  message: string
}

export type getProductType = {
  result: Product
  message: string
}

export type UpdateProductType = RegisterProductType & {
  productId: string;
};
