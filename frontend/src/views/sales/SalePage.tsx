import React from 'react'
import { Text, Flex, Box, Grid, Button, useDisclosure } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import { Link, useLocation } from 'react-router-dom'
import CartFloatButton from '../../components/CartFloatButton'
import { useGetSaleByIdQuery } from '../../services/sale.service'
import { NumericFormat } from 'react-number-format'
import ModalStepper from '../../components/salePage/ModalStepper'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'


function SalePage() {
  const dispatch = useDispatch()
  const location = useLocation()

  const { data, error, isError, isFetching } = useGetSaleByIdQuery(location.pathname.split('/')[3])

  const sale = data?.sale


  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    if (isError) {
      if ('status' in error ){
        dispatch(alertSlice.actions.setAlert({ status: 'error', title:'Error', message: JSON.stringify(error.data) }))
      }
      else{
        dispatch(alertSlice.actions.setAlert({ status: 'error', title:'Error', message: JSON.stringify(error) }))
      }
    }
  }, [isError])

  return <>
    {/* NavBar */}
    <Navbar />

    {/* Sale Info */}
    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'} background={'#e3ac49'} alignItems={'center'}>

      <Flex justifyContent={['space-between','space-between','center','center']} position={'relative'} alignItems={'center'} bg={'white'} width={'95%'} margin={'20px'} padding={'10px 20px 10px 40px'} borderRadius={10} boxShadow={'lg'}>

        <Text  textAlign={'center'} fontSize={'25px'} fontWeight={'bold'}>Sale items</Text>

        <Button onClick={onOpen} isDisabled={isFetching} isLoading={isFetching} loadingText='Loading' size={'sm'} bg={'green.600'} color={'white'} position={['static','static','absolute','absolute']} right={'30px'}>
          Check status
        </Button>
      </Flex>

      {
        sale && sale.products.map((product, index) => {
          return <Box key={index} background={'white'} borderRadius={10} marginBottom={'10px'} paddingBottom={'10px'} width={'95%'}>
            <Link to={`/products/product/${product.product._id}`}>
              <Grid
                gridTemplateColumns={['repeat(3, 1fr)','repeat(3, 1fr)','repeat(5, 1fr)','repeat(5, 1fr)']}
                justifyContent={'space-between'}
                alignItems={'center'}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                <Box borderRadius={10} overflow={'hidden'}>
                  <img src={'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png'} alt={product.name}  />
                </Box>

                <Box wordBreak={'break-word'} overflow={'hidden'} padding={'1rem'}>
                  {product.name}
                </Box>

                <Grid gridTemplateColumns={'repeat(2, 1fr)'} paddingX={[0,0,'2rem','2rem']}>
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

                <Grid gridTemplateColumns={'repeat(2, 1fr)'} gridColumnStart={[1,1,4,4]} gridColumnEnd={[4,4,6,6]} >
                  <Box width={'100%'} >
                      Quantity: {product.quantity}
                  </Box>

                  <Box width={'100%'} >
                      Sub-Total:<NumericFormat value={product.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
                  </Box>
                </Grid>
              </Grid>
            </Link>
          </Box>

        })
      }
    </Flex>

    {/* Total section */}
    <Box marginBottom={'25px'} fontSize={'20px'} fontWeight={'bold'} padding={'24px'} width={'100%'} maxWidth={'1200px'}>
      <Box>
          Total Products: {sale?.totalQuantity}
      </Box>
      <Box>
        Total Price: <NumericFormat value={sale?.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
      </Box>
    </Box>

    {/* Modal Stepper */}
    { data?.sale && <ModalStepper isOpen={isOpen} onClose={onClose} index={data.sale.status} />}

    {/* Cart Float Button */}
    <CartFloatButton />

  </>
}

export default SalePage