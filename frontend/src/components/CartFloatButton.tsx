
import React, { useEffect, useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import { setCart } from '../redux/slices/cartSlice'
import { CartModal } from './CartModal'
import { FaCartPlus } from 'react-icons/fa'

function CartFloatButton() {

  // Modal section
  const [isOpen, setIsOpen] = useState(false)

  // Button section
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    const cartStoraged = localStorage.getItem('cart')
    if (cartStoraged) {
      const newCart = JSON.parse(cartStoraged)
      dispatch(setCart(newCart))
    }
  }, [])

  return <>

    {/* Cart Modal */}
    <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

    {/* Cart Float Button */}
    {cart.totalQuantity > 0 && <>
      <Flex
        position={'fixed'}
        bottom={10}
        right={[0, 0, 10, 10]}
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
          icon={<FaCartPlus />}
          aria-label="Previous Image"
          bg={'blue.300'}
          rounded={50}
          onClick={() => setIsOpen(true)}
        />
      </Flex>
    </>}
  </>
}

export default CartFloatButton