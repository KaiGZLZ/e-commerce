import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ArrayProduct extends Product {
  product: string; // 'ObjectId' is typically a string in MongoDB
  quantity: number;
  total: number;
}

interface Cart {
  products: ArrayProduct[],
  totalQuantity: number,
  total: number,
}

const initialState: Cart = {
  products: [],
  totalQuantity: 0,
  total: 0,
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart : (state, action: PayloadAction<ArrayProduct[]>) => {
      state.products = action.payload
      state.totalQuantity = state.products.reduce((total, product) => {
        return total + product.quantity
      }, 0)
      state.total = state.products.reduce((total, product) => {

        if(product.quantity >= product.orderMinForWholesale){
          return total + (product.wholesalePrice * product.quantity)
        }
        return total + (product.price * product.quantity)
      }, 0)
    },
    addCartItem: (state, action: PayloadAction<Product | undefined>) => {

      // if action.payload is undefined, return nothing
      if (!action.payload) {
        return
      }

      const product = state.products.find(product => product._id === action.payload?._id)
      if (product) {
        if(product.quantity >= product.stock) {
          return
        }
        product.quantity += 1
        if(product.quantity >= product.orderMinForWholesale){
          product.total = product.quantity * product.wholesalePrice
        }
        else {
          product.total = product.quantity * product.price
        }
      } else {
        const newProduct = { ...action.payload, quantity: 1, total: action.payload.price, product: action.payload._id }
        state.products.push(newProduct)
      }
      // The total quantity of products in the cart is increased by 1
      state.totalQuantity += 1
      // The total price of products in the cart is increased by the price of the product
      state.total = state.products.reduce((total, product) => {

        if(product.quantity >= product.orderMinForWholesale){
          return total + (product.wholesalePrice * product.quantity)
        }
        return total + (product.price * product.quantity)
      }, 0)

      localStorage.setItem('cart', JSON.stringify(state.products))
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {

      const product = state.products.find(product => product._id === action.payload)
      if (!product) {
        return
      }
      product.quantity -= 1
      if (product.quantity === 0) {
        state.products = state.products.filter(product => product._id !== action.payload)
      }
      else {
        if(product.quantity >= product.orderMinForWholesale){
          product.total = product.quantity * product.wholesalePrice
        }
        else {
          product.total = product.quantity * product.price
        }
      }
      // The total quantity of products in the cart is reduced by 1
      state.totalQuantity -= 1
      // The total price of products in the cart is reduced by the price of the product
      state.total = state.products.reduce((total, product) => {

        if(product.quantity >= product.orderMinForWholesale){
          return total + (product.wholesalePrice * product.quantity)
        }
        return total + (product.price * product.quantity)
      }, 0)

      localStorage.setItem('cart', JSON.stringify(state.products))
    },
    clearCart: (state) => {
      state.products = []
      state.totalQuantity = 0
      state.total = 0

      localStorage.setItem('cart', JSON.stringify(state.products))
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCart, addCartItem, deleteCartItem, clearCart } = cartSlice.actions

export default cartSlice.reducer