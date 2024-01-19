import React from 'react'
import { Image, Text, Flex, Tabs, TabList, Tab, TabPanels, TabPanel, Button } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import { AtSignIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../../redux/slices/cartSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CartFloatButton from '../../components/CartFloatButton'
import { useGetProductQuery } from '../../services/product.service'
import { parseLocarstorageUser } from '../../__helpers/isUser'
import userEnum from '../../enums/user.enum'
import { alertSlice } from '../../redux/slices/alertSlice'
import FooterComponent from '../../components/FooterComponent'


function ProductPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const user = parseLocarstorageUser()

  const { data, error } = useGetProductQuery(location.pathname.split('/')[3])

  const product = data?.result

  React.useEffect(() => {
    if (error) {
      dispatch(alertSlice.actions.setAlert(error))
    }
  }, [error])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return <>
    {/* NavBar */}
    <Navbar />

    {/* Upper indications:  Homepage > Category > ProductName */}
    <Flex marginY={'20px'} width={'100%'} height={'50px'} alignItems={'center'} justifyContent={'initial'} maxWidth={'1200px'}>
      <Flex fontSize={15} pl={'20px'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
        <Link to={'/'}>
          <Text marginX={'5px'} _hover={{ color:'#fcb941' }}>
            Homepage
          </Text>
        </Link>
        <ChevronRightIcon />
        <Link to={`/products/category/${product?.category}`}>
          <Text marginX={'5px'} _hover={{ color:'#fcb941' }}>
            {product?.category}</Text>
        </Link>
        <ChevronRightIcon />
        <Text marginX={'5px'}>
          {product?.name}
        </Text>
      </Flex>
    </Flex>

    {/* Image and data container */}
    <Flex width={'100%'} maxWidth={'1200px'} flexDirection={['column', 'column', 'row', 'row']} >
      {/* Image container */}
      <Flex width={['100%', '100%', '50%', '50%']} justifyContent={'center'}>
        <Image src={'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png'} alt={product?.name} objectFit="cover" rounded={20} maxHeight="300px" w="100%" />
      </Flex>
      {/* Data container */}
      <Flex width={['100%', '100%', '50%', '50%']} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} padding={'20px'}>
        <Text fontSize={'40px'} fontWeight={'bold'} textAlign={'center'}>{product?.name}</Text>
        <Text fontSize={'20px'} fontWeight={'bold'} color={'#fcb941'}>Price: ${product?.price}</Text>
        {product?.stock ? <Text fontSize={'20px'} fontWeight={'bold'}>Stock: {product?.stock}</Text> : <Text fontSize={'20px'} fontWeight={'bold'} color={'red'}>Out of stock</Text>}


        {/* Edit product button (only admin) */}
        { (user && user.role === userEnum.role.admin) ? <>
          <Button colorScheme="teal" variant="outline" marginY={'10px'}
            onClick={() => navigate('/products/edit/' + product?._id)}
          >
            Edit product
          </Button>
        </> : <>
          {/* Add to cart button (only users)*/}
          <Flex
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={'20px'}
          >
            {/* Add to cart icon */}
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              border={'2px solid #fcb941'}
              color={'#fcb941'}
              fontSize={'20px'}
              fontWeight={'bold'}
              padding={'5px 10px'}
              onClick={() => {
                dispatch(addCartItem(product))
              }}
              _hover={{
                backgroundColor: '#fcb941',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.4s'
              }}
            >
            Add to cart
              <AtSignIcon margin={'0 10px'} />
            </Flex>
          </Flex>
        </>}

        { (product?.orderMinForWholesale && product?.wholesalePrice && product?.price) && <>
          <Text fontSize={'15px'} fontWeight={'bold'}>If you buy {product?.orderMinForWholesale} units or more, you will get a discount! of {((1-product?.wholesalePrice/product?.price) * 100).toFixed(2)}% </Text>
        </>
        }
      </Flex>
    </Flex>

    {/* Description */}
    <Flex marginY={'40px'} flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
      <Tabs variant='unstyled'>
        <TabList justifyContent={'center'}>
          <Tab
            fontSize={'30px'}
            fontWeight={'bold'}
            _hover={{ color: '#fcb941' }}
            color={'blackAlpha.800'}
            rounded={'20%'}
            _active={{ background: 'rgba(0, 0, 0, 0.05)' }}
            _selected={{ boxShadow: 'md', color: '#e3ac49' }}
          >
          Description
          </Tab>
          <Tab
            fontSize={'30px'}
            fontWeight={'bold'}
            _hover={{ color: '#fcb941' }}
            color={'blackAlpha.800'}
            rounded={'20%'}
            _active={{ background: 'rgba(0, 0, 0, 0.05)' }}
            _selected={{ boxShadow: 'md', color: '#e3ac49' }}
          >
          Shipment details
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              border={'1px solid black'}
              padding={'20px 30px'}
              justifyContent={'space-between'}
              minHeight={'100px'}
            >
              {product?.description}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              border={'1px solid black'}
              padding={'20px 30px'}
              justifyContent={'space-between'}
              minHeight={'100px'}
            >
              Hola que tal
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>

    {/* Footer component */}
    <FooterComponent  />

    {/* Cart Button */}
    <CartFloatButton />

  </>
}

export default ProductPage