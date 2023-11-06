
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { Flex, IconButton, Box } from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import { setCart } from '../redux/slices/cartSlice'
import { Link, useLocation } from 'react-router-dom'

function Categorie() {

  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const location = useLocation()
  const categorieName = location.pathname.split('/')[2]


  useEffect(() => {
    const cart = localStorage.getItem('cart')

    if (cart) {
      const newCart = JSON.parse(cart)
      dispatch(setCart(newCart))
    }
  }, [])

  return <>
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
      <ProductGrid />
    </Flex>


    {/* Cart Button */}
    {cart.totalQuantity > 0 && <>
      <Flex
        position={'fixed'}
        bottom={10}
        right={20}
        transform="translateX(-100%)"
        justifyContent={'center'}
        alignItems={'center'}
        _after={{
          content: `'${cart.totalQuantity}'`,
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        <IconButton
          icon={<AddIcon />}
          aria-label="Previous Image"
          bg={'blue.300'}
          rounded={50}
        />
      </Flex>
    </>}
  </>
}

export default Categorie