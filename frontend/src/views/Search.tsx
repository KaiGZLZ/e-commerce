
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Flex, Box, Spinner } from '@chakra-ui/react'
import { useLocation, useSearchParams } from 'react-router-dom'
import CartFloatButton from '../components/CartFloatButton'
import { useGetTableProductsQuery } from '../services/product.service'
import Filter from '../components/Filter'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../redux/slices/alertSlice'
import PaginationBlock from '../components/PaginationBlock'
import FooterComponent from '../components/FooterComponent'

function Search() {

  const location = useLocation()
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const { data: products, isLoading, error } = useGetTableProductsQuery(location.search)

  React.useEffect(() => {
    if (error) {
      dispatch(alertSlice.actions.setAlert(error))
    }
  }, [error])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [products])

  return <>
    {/* Navbar */}
    <Navbar />

    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
      <Flex width={'100%'} height={['100px','100px','170px','170px']} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Box fontSize={[20,20,40,40]}>Search results for: {'"'}{searchParams.get('search') || ''}{'"'}</Box>
      </Flex>

      {/* Filter */}
      <Filter />

      {/* Total products */}
      <Flex width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'end'}>
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

export default Search