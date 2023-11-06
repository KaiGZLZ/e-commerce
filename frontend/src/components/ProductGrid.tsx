import React from 'react'
import ProductCard from './ProductCard'
import {  Grid } from '@chakra-ui/react'

function ProductGrid() {
  const products = [
    {
      id: '1',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 111',
      price: 29.99,
      rating: 4,
    },
    {
      id: '2',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Produsssssssdf asdfasdfa sdfas dfasdfas fasd fasdf asd fasdf adsfasdf asdf asdf asfas fa s fadsf asdfadsf adsfa f asdfct 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '3',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '4',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '5',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '6',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '7',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '8',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '9',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '10',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '11',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '12',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '13',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '14',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '15',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '16',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '17',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '18',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    {
      id: '19',
      image: 'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png',
      category: 'Electronics',
      name: 'Product 1',
      price: 29.99,
      rating: 4,
    },
    // Add more products here
  ]

  return (
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={1} templateRows={'auto'} width={'auto'} margin={'30px'} maxWidth={'1200px'} >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}


export default ProductGrid
