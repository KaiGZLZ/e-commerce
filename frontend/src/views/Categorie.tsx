
import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Flex, Box } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import CartFloatButton from '../components/CartFloatButton'

function Categorie() {

  const location = useLocation()
  const categorieName = location.pathname.split('/')[2]

  return <>
    {/* Navbar */}
    <Navbar />
    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
      <Flex width={'100%'} height={'170px'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Box fontSize={40}>{categorieName}</Box>
        <Box fontSize={20}>Tienda</Box>
      </Flex>
      <Flex width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'initial'}>
        <Box fontSize={15} pl={'20px'}>
          <Link to={'/'}>Inicio</Link> <ChevronRightIcon /> {categorieName}
        </Box>
      </Flex>
      <Flex width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'end'}>
        <Box fontSize={15} pr={'20px'}>Total de productos: 6 </Box>
      </Flex>

      {/* Product Grid */}
      <ProductGrid />
    </Flex>

    {/* Cart Float Button */}
    <CartFloatButton />
  </>
}

export default Categorie