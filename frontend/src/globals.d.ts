declare interface Product {
    id: string
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

