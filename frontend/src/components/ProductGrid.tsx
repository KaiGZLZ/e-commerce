import React from 'react'
import ProductCard from './ProductCard'
import {  Grid } from '@chakra-ui/react'

interface ProductGridProps {
  devCondition?: boolean;   // If true, it will use the products passed as props, if false, it will use the products declared in the component
  products?: Product[];
}

function ProductGrid({ devCondition = false, products } : ProductGridProps) {
  const productsDev = [
    {
      id: '1',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 111',
      price: 29.99,
      rating: 4,
      description: 'desctipcion del producto',
      tags: ['hola', 'que', 'que', 'tal'],
      wholesalePrice: 20,
      orderMinForWholesale: 12,
      stock: 100
    },
    {
      id: '2',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Produsssssssdf asdfasdfa sdfas dfasdfas fasd fasdf asd fasdf adsfasdf asdf asdf asfas fa s fadsf asdfadsf adsfa f asdfct 1',
      price: 29.99,
      rating: 4,
      description: 'desctipcion del producto',
      tags: ['hola', 'que', 'que', 'tal'],
      wholesalePrice: 20,
      orderMinForWholesale: 12,
      stock: 100
    },
    {
      id: '3',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
      description: 'desctipcion del producto',
      tags: ['hola', 'que', 'que', 'tal'],
      wholesalePrice: 20,
      orderMinForWholesale: 12,
      stock: 100
    },
    // Add more products here
  ]

  return (
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={1} templateRows={'auto'} width={'auto'} margin={'30px'} maxWidth={'1200px'} >
      {
        devCondition && products ?
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) :
          productsDev.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
      }
    </Grid>
  )
}


export default ProductGrid
