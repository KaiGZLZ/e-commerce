
import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Flex, Box, Spinner } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import PaginationBlock from '../../components/PaginationBlock'
import FooterComponent from '../../components/FooterComponent'
import { useGetSalesTableQuery } from '../../services/sale.service'
import SalesList from '../../components/SalesList'
import FilterSales from '../../components/FilterSales'

function SalesTable() {

  const location = useLocation()
  const dispatch = useDispatch()

  const { data, isLoading, error } = useGetSalesTableQuery(location.search)

  React.useEffect(() => {
    if (error) {
      dispatch(alertSlice.actions.setAlert(error))
    }
  }, [error])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [data])

  return <>
    {/* Navbar */}
    <Navbar />

    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
      <Flex width={'100%'} height={['100px','100px','170px','170px']} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Box fontSize={[20,20,40,40]}>Sales Table</Box>

      </Flex>

      {/* Filter */}
      <FilterSales />

      {/* Total sales */}
      <Flex width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'end'}>
        <Box fontSize={15} pr={'20px'}>Total purchases: {data?.total } </Box>
      </Flex>

      {/* Sales list */}
      {
        isLoading ?
          <Spinner /> :
          data ? <SalesList sales={data.result} /> : null
      }

      {/* Pagination component */}
      <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
        <PaginationBlock totalPages={data?.totalPages} />
      </Flex>
    </Flex>

    {/* Footer component */}
    <FooterComponent  />
  </>
}

export default SalesTable