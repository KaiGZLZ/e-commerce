import React from 'react'
import { Box, Image, Text, Badge, Flex, IconButton, GridItem } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'

function ProductCard({ product }: { product: Product })  {
  const [state, setState] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <GridItem
      maxWidth={'400px'}
      height={'100%'}
      marginX={'10px'}
      borderRadius="md"
      overflow="hidden"
      maxW="sm"
      cursor={'pointer'}
      _hover={{ shadow:'md' }}
      onMouseOver={() => setState(false)}
      onMouseLeave={() => setState(true)}
      onClick={() => navigate(`/products/product/${product._id}`, { state: product._id } )}
    >
      <Box position={'relative'} overflow={'hidden'}>
        <Image src={'https://pczatelca.com/images/productos/491/1686882805_Probador%20de%20Bateria%20C%201.png'} alt={product.name} objectFit="cover" rounded={20} maxHeight="300px" w="100%" />

        {/* Icon plus button */}
        <Flex
          position={'absolute'}
          justifyContent={'center'}
          bottom={state ? ['10%', '10%', '-100%', '-100%'] : '10%'}
          left={'85%'}
          transform="translateX(-50%)"
          transition="bottom 0.4s"
        >
          <IconButton
            icon={<FaCartPlus />}
            aria-label="Previous Image"
            bg={'blue.300'}
            rounded={50}
            onClick={(e) => {
              dispatch(addCartItem(product))
              e.stopPropagation()
            }}
          />
        </Flex>
      </Box>

      <Flex align="center" mt={2} paddingX={5}>
        <Badge colorScheme="teal">{product.category}</Badge>
      </Flex>

      <Text mt={2} fontWeight="semibold" fontSize="lg" noOfLines={2} paddingX={5}>
        {product.name}
      </Text>

      <Text mt={1} fontWeight="bold" paddingX={5}>
          ${product.price}
      </Text>

      <Flex align="center" mt={1} paddingX={5}>
        {[...Array(product.rating)].map((_, index) => (
          <StarIcon key={index} color="teal.500" />
        ))}
        {product.numberOfVotes ? <Text ml={2}>{product.rating}</Text> : <Text ml={2}>No reviews yet</Text>}
      </Flex>

      {/* Buttons */}
      <Flex justify="center" mt={2}>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous Image"
          variant="ghost"
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next Image"
          variant="ghost"
        />
      </Flex>
    </GridItem >
  )
}

export default ProductCard
