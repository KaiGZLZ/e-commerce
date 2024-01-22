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
import salesEnum from '../../enums/sales.enum'
import { parseLocarstorageUser } from '../../__helpers/isUser'
import userEnum from '../../enums/user.enum'
import ModalPaymentConfirmation from '../../components/salePage/ModalPaymentConfirmation'
import moment from 'moment'
import ModalSentPackage from '../../components/salePage/ModalSentPackage'
import ModalRejection from '../../components/salePage/ModalRejection'
import ModalPackageReceived from '../../components/salePage/ModalPackageReceived'
import FooterComponent from '../../components/FooterComponent'


function SalePage() {
  const dispatch = useDispatch()
  const location = useLocation()

  const user = parseLocarstorageUser()

  const { data, error, isError, isFetching, refetch } = useGetSaleByIdQuery(location.pathname.split('/')[3])

  // Modal Stepper
  const { isOpen: isOpenModalStepper, onOpen: onOpenModalStepper, onClose: onCloseModalStepper } = useDisclosure()

  // Modal payment confirmation
  const { isOpen: isOpenModalPaymentConfirmation, onOpen: onOpenModalPaymentConfirmation, onClose: onCloseModalPaymentConfirmation } = useDisclosure()

  // Modal rejection
  const { isOpen: isOpenModalRejection, onOpen: onOpenModalRejection, onClose: onCloseModalRejection } = useDisclosure()

  // Modal sent package
  const { isOpen: isOpenModalSentPackage, onOpen: onOpenModalSentPackage, onClose: onCloseModalSentPackage } = useDisclosure()

  // Modal package received
  const { isOpen: isopen, onOpen: onOpen, onClose: onClose } = useDisclosure()


  React.useEffect(() => {
    if (isError) {
      dispatch(alertSlice.actions.setAlert(error))
    }
  }, [isError])

  return <>
    {/* NavBar */}
    <Navbar />

    {/* Sale Info */}
    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'} background={'#e3ac49'} alignItems={'center'}>

      <Flex justifyContent={['space-between','space-between','center','center']} position={'relative'} alignItems={'center'} bg={'white'} width={'95%'} margin={'20px'} padding={'10px 20px 10px 40px'} borderRadius={10} boxShadow={'lg'}>

        <Text  textAlign={'center'} fontSize={'25px'} fontWeight={'bold'}>Sale items</Text>

        <Button onClick={onOpenModalStepper} isLoading={isFetching} loadingText='Loading' size={'sm'} bg={'green.600'} color={'white'} position={['static','static','absolute','absolute']} right={'30px'}>
          Check status
        </Button>
      </Flex>

      {/* Payment confirmation button */}
      {/* User Button */}
      { (user && (user.role === userEnum.role.user) && data?.sale && (data?.sale?.status <= salesEnum.status.pendingConfirmation)) || (data?.sale && !data.sale.user) ?
        <>
          <Button size={'sm'} bg={'green.600'} color={'white'} position={'relative'} marginBottom={'20px'}
            onClick={onOpenModalPaymentConfirmation}
            isLoading={isFetching} loadingText='Loading'
          >
            { data?.sale?.status === salesEnum.status.pendingPayment ? 'Confirm Payment' : 'Edit Payment'}
          </Button>
        </> : null
      }
      {/* Admin Buttons */}
      { user && (user?.role === userEnum.role.admin) && data?.sale && (data?.sale.status <= salesEnum.status.pendingConfirmation) && <>
        <Button size={'sm'} bg={'green.600'} color={'white'} position={'relative'}  marginBottom={'20px'}
          onClick={onOpenModalPaymentConfirmation}
          isLoading={isFetching} loadingText='Loading'
        >
          Confirm Payment
        </Button>
        <Button size={'sm'} bg={'green.600'} color={'white'} position={'relative'}  marginBottom={'20px'}
          onClick={onOpenModalRejection}
          isLoading={isFetching} loadingText='Loading'
        >
          Reject Payment
        </Button>
      </>}

      {/* Sent package button (Only admin) */}
      { user && (user?.role === userEnum.role.admin) && data?.sale && (data?.sale.status === salesEnum.status.preparing) && <>
        <Button size={'sm'} bg={'green.600'} color={'white'} position={'relative'}  marginBottom={'20px'}
          onClick={onOpenModalSentPackage}
          isLoading={isFetching} loadingText='Loading'
        >
          Sent Package
        </Button>
      </>}

      {/* Package received button (Only user) */}
      { user && (user?.role === userEnum.role.user) && data?.sale && (data?.sale.status === salesEnum.status.onTheRoad) && <>
        <Button size={'sm'} bg={'green.600'} color={'white'} position={'relative'}  marginBottom={'20px'}
          onClick={onOpen}
          isLoading={isFetching} loadingText='Loading'
        >
          Package Received
        </Button>
      </>}


      {/* Products */}
      {
        data?.sale && data?.sale.products.map((product, index) => {
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
    <Box fontSize={'20px'} fontWeight={'bold'} padding={'24px'} width={'100%'} maxWidth={'1200px'}>
      <Box>
          Total Products: {data?.sale?.totalQuantity}
      </Box>
      <Box>
        Total Price: <NumericFormat value={data?.sale?.total} displayType={'text'} decimalScale={2} thousandSeparator='.' decimalSeparator=',' prefix={'$'} />
      </Box>
    </Box>

    {/* Payment Data (just in case)*/}
    { data?.sale?.rejectionReason && <>
      <Box marginBottom={'25px'} color={'red'} fontSize={'20px'} fontWeight={'bold'} padding={'24px'} width={'100%'} maxWidth={'1200px'}>
        <Box>
          Rejection Reason: {data?.sale?.rejectionReason}
        </Box>
      </Box>
    </>}
    { data?.sale?.paymentReference && <>
      <Box marginBottom={'25px'} fontSize={'20px'} fontWeight={'bold'} padding={'24px'} width={'100%'} maxWidth={'1200px'}>
        <Box>
          Payment Method: { data?.sale?.paymentMethod ? salesEnum.paymentMethodDescription[data.sale.paymentMethod] : ''}
        </Box>
        <Box>
          Payment Reference: {data?.sale?.paymentReference}
        </Box>
        <Box>
          Payment Date: {moment(data?.sale?.paymentDate).format('YYYY-MM-DD HH:mm:ss')}
        </Box>
      </Box>
    </>}

    {/* Traking number */}
    { data?.sale?.trackingCode && <>
      <Box marginBottom={'25px'} fontSize={'20px'} fontWeight={'bold'} padding={'24px'} width={'100%'} maxWidth={'1200px'}>
        <Box>
          Tracking Code: {data?.sale?.trackingCode}
        </Box>
      </Box>
    </>}

    {/* Comment and rating */}
    { data?.sale?.comment && <>
      <Box marginBottom={'25px'} fontSize={'20px'} fontWeight={'bold'} padding={'24px'} width={'100%'} maxWidth={'1200px'}>
        <Box>
          Comment: {data?.sale?.comment}
        </Box>
        <Box>
          Rating: {data?.sale?.rating}
        </Box>
      </Box>
    </>}


    {/* Footer component */}
    <FooterComponent  />


    {/* Modal Stepper */}
    { data?.sale && <ModalStepper isOpen={isOpenModalStepper} onClose={onCloseModalStepper} index={data.sale.status} />}

    {/* Modal user payment confirmation */}
    { data?.sale && <ModalPaymentConfirmation isOpen={isOpenModalPaymentConfirmation} onClose={onCloseModalPaymentConfirmation} sale={data?.sale} refetch={refetch} />}

    {/* Modal rejection */}
    { data?.sale && <ModalRejection isOpen={isOpenModalRejection} onClose={onCloseModalRejection} sale={data?.sale} refetch={refetch} />}

    {/* Modal for sent package */}
    { data?.sale && <ModalSentPackage isOpen={isOpenModalSentPackage} onClose={onCloseModalSentPackage} sale={data?.sale} refetch={refetch} />}

    {/* Modal for package received */}
    { data?.sale && <ModalPackageReceived isOpen={isopen} onClose={onClose} sale={data?.sale} refetch={refetch} />}

    {/* Cart Float Button */}
    <CartFloatButton />

  </>
}

export default SalePage