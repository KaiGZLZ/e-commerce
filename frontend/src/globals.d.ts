declare interface Product {
    _id: string
    image: string
    category: string
    name: string
    description: string
    price: number
    rating: number
    numberOfVotes?: number
    tags: string[]
    wholesalePrice: number
    orderMinForWholesale: number
    stock: number
  }

declare interface user {
  username: string
  firstname: string
  lastname: string
  email: string
  role: number
}

  type SaleProduct = {
    product: Product; // 'ObjectId' is typically a string in MongoDB
    name: string;
    description: string;
    price: number;
    wholesalePrice: number;
    category: string;
    orderMinForWholesale: number;
    images: string[];
    quantity: number;
    total: number;
  };

declare interface Sale {
  _id: string
  products: SaleProduct[]
  user: user | undefined
  email: string
  total: number
  totalQuantity: number
  status: number
  paymentMethod: number | undefined
  paymentReference: string | undefined
  paymentDate: string | undefined
  rejectionReason: string | undefined
  trackingCode: string | undefined
  rating: number | undefined
  comment: string | undefined
  createdAt: string
  updatedAt: string
}

declare interface CustomError {
  name: string
  message: string
  data: object | null
}


