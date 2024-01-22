
import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Flex, Box, Spinner } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import CartFloatButton from '../components/CartFloatButton'
import { useGetTableProductsQuery } from '../services/product.service'
import Filter from '../components/Filter'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../redux/slices/alertSlice'
import PaginationBlock from '../components/PaginationBlock'
import FooterComponent from '../components/FooterComponent'

function Categorie() {

  const location = useLocation()
  const dispatch = useDispatch()
  const categoryName = location.pathname.split('/')[3]

  const { data: products, isLoading, error } = useGetTableProductsQuery(location.search ? location.search + `&category=${categoryName}` : `?category=${categoryName}`)

  React.useEffect(() => {
    if (error) {
      dispatch(alertSlice.actions.setAlert(error))
    }
  }, [error])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [products])

  return <>
    {/* Navbar */}
    <Navbar />
    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
      <Flex width={'100%'} height={'170px'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}  bg="blackAlpha.200"
      >
        <Box fontSize={40} color={'blackAlpha.900'} fontWeight={'bold'} opacity={1} zIndex={1}>{categoryName}</Box>
        <Box fontSize={20}>Store</Box>
      </Flex>

      {/* Filter */}
      <Filter />

      {/* Total products */}
      <Flex width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'end'} mt={'20px'}>
        <Box fontSize={15} pr={'20px'}>Total products: {products?.total } </Box>
      </Flex>

      {/* Product Grid */}
      {
        isLoading ?
          <Spinner /> :
          products ? <ProductGrid devCondition={true} products={products.result} /> : null
      }

      {/* Pagination component */}
      <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
        <PaginationBlock totalPages={products?.totalPages} />
      </Flex>
    </Flex>

    {/* Footer component */}
    <FooterComponent  />

    {/* Cart Float Button */}
    <CartFloatButton />
  </>
}

export default Categorie