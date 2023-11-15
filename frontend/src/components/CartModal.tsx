
import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Icon, Flex, Box, Grid, IconButton, useDisclosure, Collapse } from '@chakra-ui/react'
import { ArrowBackIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import { NumericFormat } from 'react-number-format'
import { cartSlice } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

export function CartModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

  // Cart data
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const btnRef = React.useRef(null)

  const { isOpen: openTotals, onToggle } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior='inside'
        size={['full', 'full', 'xl', 'xl']}
      >
        <ModalOverlay />
        <ModalContent maxHeight={'95vh'} marginY={'2.5vh'}>
          <ModalCloseButton
            width={'100%'}
            position={'initial'}
            backgroundColor={'#e3ac49'}
            color={'whiteAlpha.900'}
            fontWeight={'bold'}
            padding={'20px'}
            _hover={{ backgroundColor: '#fcb941' }}
          >
            <Icon as={ArrowBackIcon} mr={2} />
              Keep buying
          </ModalCloseButton>

          <ModalBody background={'#d1a049'}>
            <ModalHeader background={'white'} textAlign={'center'} fontWeight={'bold'} marginBottom={'10px'} borderRadius={10}>Cart items</ModalHeader>
            {
              cart.products.map((product, index) => {
                return <Box key={index} background={'white'} borderRadius={10} marginBottom={'10px'} paddingBottom={'10px'}>
                  <Link to={`/products/product/${product.id}`}>
                    <Grid  gridTemplateColumns={'repeat(3, 1fr)'} justifyContent={'space-between'} alignItems={'center'} textAlign={'center'}>
                      <Box borderRadius={10} overflow={'hidden'}>
                        <img src={'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png'} alt={product.name}  />
                      </Box>
                      <Box wordBreak={'break-word'} maxHeight={'120px'} overflow={'hidden'}>
                        {product.name}
                      </Box>
                      <Box>
                        <NumericFormat value={product.price} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                      </Box>
                    </Grid>
                  </Link>
                  <Grid gridTemplateColumns={'repeat(2, 1fr)'} textAlign={'center'}>
                    <Flex fontWeight={'bold'} maxHeight={'50px'} alignItems={'center'} justifyContent={'center'}  width={'auto'}>
                      <IconButton
                        aria-label={'Remove'}
                        icon={<ArrowBackIcon />}
                        onClick={() => dispatch(cartSlice.actions.deleteCartItem(product.id))}
                        marginX={'10px'}
                      />
                        Quantity: {product.quantity}
                      <IconButton
                        aria-label={'Add'}
                        icon={(product.stock === product.quantity) ? <CloseIcon /> : <ArrowBackIcon transform={'rotate(180deg)'} />}
                        onClick={() => dispatch(cartSlice.actions.addCartItem(product))}
                        marginX={'10px'}
                      />
                    </Flex>
                    <Flex fontWeight={'bold'} maxHeight={'50px'} alignItems={'center'} justifyContent={'center'} width={'auto'} >
                      Sub-Total:<NumericFormat value={product.quantity * product.price} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                    </Flex>
                  </Grid>
                </Box>

              })
            }
          </ModalBody>

          <ModalFooter display={'block'}>
            <Flex width={'100%'} alignItems={'center'} justifyContent={'end'} height={0}>
              {
                openTotals ?
                  <IconButton
                    aria-label={'Collapse'}
                    icon={<>Hide <ChevronUpIcon /></>}
                    onClick={onToggle}
                    marginX={['0', '0', '0', '0']}
                    marginBottom={'10px'}
                    borderRadius={100}
                    padding={'10px 20px'}
                    transform= {'translateY(-20%)'}
                    background={'#e3ac49'}
                    color={'whiteAlpha.900'}
                    fontWeight={'bold'}
                    _hover={{ backgroundColor: '#fcb941' }}
                  />
                  :
                  <IconButton
                    aria-label={'Collapse'}
                    icon={<>Show totals <ChevronDownIcon /></>}
                    onClick={onToggle}
                    marginX={['0', '0', 'auto', 'auto']}
                    marginBottom={'10px'}
                    borderRadius={100}
                    padding={'10px 20px'}
                    transform= {'translateY(-20%)'}
                    background={'#e3ac49'}
                    color={'whiteAlpha.900'}
                    fontWeight={'bold'}
                    _hover={{ backgroundColor: '#fcb941' }}
                  />
              }

            </Flex>



            <Collapse startingHeight={0} in={openTotals}>
              <Flex justifyContent={'space-between'} flexDirection={'column'} marginBottom={'25px'} fontSize={'20px'} fontWeight={'bold'}>
                <Box>
                Total Products: {cart.totalQuantity}
                </Box>
                <Box>
                Total Price: <NumericFormat value={cart.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                </Box>
              </Flex>

              <Flex justifyContent={'space-between'} marginBottom={'25px'} fontWeight={'bold'}>
                <Button onClick={onClose}>Close</Button>
                <Button colorScheme={'green'}>Checkout</Button>
              </Flex>

            </Collapse>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}