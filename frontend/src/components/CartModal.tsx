
import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Icon, Text, Flex, Box, Grid, IconButton, useDisclosure, Collapse, Input, FormLabel, FormControl } from '@chakra-ui/react'
import { ArrowBackIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import { NumericFormat } from 'react-number-format'
import { cartSlice } from '../redux/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { parseLocarstorageUser } from '../__helpers/isUser'
import { useRegisterSaleMutation } from '../services/sale.service'
import { alertSlice } from '../redux/slices/alertSlice'

export function CartModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

  // Cart data
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const btnRef = React.useRef(null)
  const user = parseLocarstorageUser()

  const { isOpen: openTotals, onToggle } = useDisclosure({ defaultIsOpen: true })

  const { isOpen: isOpenConfirmation, onClose: onCloseConfirmation, onToggle: onToggleConfirmation } = useDisclosure()

  const [email, setEmail] = React.useState('')
  const [errorEmailMessage, setErrorEmailMessage] = React.useState('')

  const [registerSale, { isLoading }] = useRegisterSaleMutation()

  const confirmCheckout = () => {

    // If not user, validate email
    if(!user){
      if (!email) {
        setErrorEmailMessage('The email is required')
        return
      }
      // Pattern email
      if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        setErrorEmailMessage('The email is not valid')
        return
      }
      setErrorEmailMessage('')
    }

    const dataToSend = {
      token: user ? localStorage.getItem('token') : null,
      products: cart.products,
      total: cart.total,
      totalQuantity: cart.totalQuantity,
      email: user ? user.email : email
    }


    registerSale(dataToSend)
      .unwrap()
      .then((res) => {
        dispatch(cartSlice.actions.clearCart())
        dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: 'Sale registered' }))
        navigate(`/sales/sale/${res.saleId}`)
      })
      .catch((err) => {
        setErrorEmailMessage(err.data.message)
      })
  }

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

          {/* Cart Body */}
          <ModalBody background={'#d1a049'}>
            <ModalHeader background={'white'} textAlign={'center'} fontWeight={'bold'} marginBottom={'10px'} borderRadius={10}>Cart items</ModalHeader>
            {
              cart.products.map((product, index) => {
                return <Box key={index} background={'white'} borderRadius={10} marginBottom={'10px'} paddingBottom={'10px'}>
                  <Link to={`/products/product/${product._id}`}>
                    <Grid  gridTemplateColumns={'repeat(3, 1fr)'} justifyContent={'space-between'} alignItems={'center'} textAlign={'center'}>
                      <Box borderRadius={10} overflow={'hidden'}>
                        <img src={'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png'} alt={product.name}  />
                      </Box>
                      <Box wordBreak={'break-word'} maxHeight={'120px'} overflow={'hidden'} padding={'1rem'}>
                        {product.name}
                      </Box>
                      <Grid gridTemplateColumns={'repeat(2, 1fr)'} alignItems={'center'} textAlign={'center'} fontWeight={'bold'}>

                        { (product.quantity < product.orderMinForWholesale)  ? <>
                          <Text>Price:</Text>
                          <NumericFormat value={product.price} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                        </> : <>
                          <Text color={'red'} textDecorationLine={'line-through'}>Price:</Text>
                          <NumericFormat style={{ color: 'red', textDecorationLine: 'line-through' }} value={product.price} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />

                          <Text>Wholesale Price </Text>
                          <NumericFormat value={product.wholesalePrice} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                        </>}
                      </Grid>
                    </Grid>
                  </Link>
                  <Grid gridTemplateColumns={'repeat(2, 1fr)'} textAlign={'center'}>
                    <Flex fontWeight={'bold'} maxHeight={'50px'} alignItems={'center'} justifyContent={'center'}  width={'auto'}>
                      <IconButton
                        aria-label={'Remove'}
                        icon={<ArrowBackIcon />}
                        onClick={() => dispatch(cartSlice.actions.deleteCartItem(product._id))}
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
                      Sub-Total:<NumericFormat value={product.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                    </Flex>
                  </Grid>
                </Box>

              })
            }
          </ModalBody>

          {/* Totals and button section */}
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
                <Button
                  colorScheme={'green'}
                  onClick={onToggleConfirmation}
                  isLoading={isLoading}
                  loadingText='Registering'
                >
                  Checkout
                </Button>
              </Flex>

            </Collapse>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {
        user ?
          <>
            {/* Modal confirmation WITH an user Logged in */}
            <Modal isCentered isOpen={isOpenConfirmation} onClose={onCloseConfirmation} size={'xl'}>
              <ModalOverlay
                bg='blackAlpha.500'
              />
              <ModalContent>
                <ModalHeader>Final confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text> Hi <b>{user.firstname}</b>!. Please confirm your sale</Text>
                </ModalBody>
                <ModalFooter>
                  <Button bg={'green'} color={'white'}
                    onClick={confirmCheckout}
                    isLoading={isLoading}
                    loadingText='Registering...'
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          :
          <>
            {/* Modal confirmation WITHOUT an user logged in */}
            <Modal isCentered isOpen={isOpenConfirmation} onClose={() => {setErrorEmailMessage(''); onCloseConfirmation()}} size={'xl'}>
              <ModalOverlay
                bg='blackAlpha.500'
              />
              <ModalContent>
                <ModalHeader>
                  <Icon
                    marginRight={'10px'}
                    as={WarningIcon}
                    cursor={'pointer'}
                  />
                  You are not logged in
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Oh! It seems that you are not logged in. Please enter your email to sent you all the sale information</Text>
                  &nbsp;
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' />
                  </FormControl>
                  {!!errorEmailMessage && <span style={{ color: 'red' }}>{errorEmailMessage}</span>}
                </ModalBody>
                <ModalFooter>
                  <Button bg={'green'} color={'white'}
                    onClick={confirmCheckout}
                    isLoading={isLoading}
                    loadingText='Registering...'
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
      }
    </>
  )
}