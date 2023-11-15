
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button, Spinner, Select, Tag, TagLabel, TagCloseButton, Textarea, IconButton } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { useGetAllCategoriesQuery } from '../../services/category.service'
import { NumericFormat } from 'react-number-format'
import { NumberFormatValues } from 'react-number-format/types/types'
import { useLazyRegisterProductsQuery } from '../../services/product.service'
import Navbar from '../../components/Navbar'
import { history } from '../../__helpers/history'

type RegisterData = {
  name: string
  price: number | undefined
  description: string
  category: string
  wholesalePrice: number | undefined
  orderMinForWholesale: number | undefined
  stock: number | undefined
}

function ProductRegisterPage() {

  const dispatch = useDispatch()

  // RTK Query
  const [registerData, { isFetching }] = useLazyRegisterProductsQuery()
  const { data: categories, isFetching: isFetchingCategories } = useGetAllCategoriesQuery()



  // Form data
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, setFocus } = useForm<RegisterData>()
  // Form for tags inputs
  const { register: registerTag, handleSubmit: handleSubmitTag, formState: { errors: errorsTag }, reset: resetTag, setError: setErrorTag } = useForm<{ tag: string }>()
  const [tagArray, setTagArray] = React.useState<string[]>([])


  const onSubmit= (data: RegisterData)  => {

    if(tagArray.length ===0){
      setErrorTag('tag', { message: 'The product tags are required' })
      return
    }

    const dataToSend = {
      ...data,
      tags: tagArray
    }

    registerData(dataToSend)
      .then((response) => {
        if(response.isSuccess){
          dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: 'Product registered successfully' }))
          // Focus on first input
          setFocus('name')
          reset({ name: '', description: '', category: '', price: undefined, wholesalePrice: undefined, orderMinForWholesale: undefined, stock: undefined })
          setTagArray([])
        }
        else{
          if (response.error){
            if ('status' in response.error) {
              const errData = 'error' in response.error ? response.error.error : JSON.stringify(response.error.data)
              dispatch(alertSlice.actions.setAlert({ status: 'error', title: 'Error', message: errData }))
            }
          }
        }
      })
      .catch((e) =>{
        console.log(e)
      })
  }

  const onSubmitTag = (data: { tag: string }) => {
    if (data.tag === '') return
    if(tagArray.includes(data.tag)) return
    setTagArray([...tagArray, data.tag])
    resetTag()
  }

  // focus on first input
  React.useEffect(() => {
    setFocus('name')
  }, [setFocus])

  return <>
    <Navbar />
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>
      {/* Form container */}
      <Flex flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} marginTop={'50px'} >
        <Flex width={'100%'} justifyContent={'initial'}>
          <Box width={'auto'} fontSize={15} textDecor={'underline'} color={'gray.600'} cursor={'pointer'} _hover={{ color:'#fcb941' }} onClick={() => history.back()}>
            {'Back'}
          </Box>
        </Flex>
        <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'20px'}>Register product</Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Product name" {...register('name', { required: 'The product name is required' })} />
            </InputGroup>
            {errors.name && <span style={{ color: 'red' }}>{errors.name?.message?.toString()}</span>}
          </Box>
          {/* Product Price */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input
                as={NumericFormat}
                id="price"
                placeholder="Price"
                prefix={'$'}
                thousandSeparator=','
                decimalSeparator='.'
                decimalScale={2}
                allowNegative={false}
                value={watch('price') || ''}
                onValueChange={(values: NumberFormatValues) => setValue('price', values.floatValue)}
                {...register('price', { required: 'The price is required' })}
              />
            </InputGroup>
            {errors.price && <span style={{ color: 'red' }}>{errors.price?.message?.toString()}</span>}
          </Box>
          {/* Product Description */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <Textarea placeholder="Product description" {...register('description', { required: 'The product description is required' })} />
            </InputGroup>
            {errors.description && <span style={{ color: 'red' }}>{errors.description?.message?.toString()}</span>}
          </Box>
          {/* Product Category */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              {
                isFetchingCategories ?
                  <Spinner /> :
                  <Select placeholder='Select a categorie'
                    {...register('category', { required: 'The product category is required' })}
                  >
                    {
                      categories ? categories?.map((category) => {
                        return <option key={category._id} value={category.name}>{category.name}</option>
                      }) : ''
                    }
                  </Select>
              }
            </InputGroup>
            {errors.category && <span style={{ color: 'red' }}>{errors.category?.message?.toString()}</span>}
          </Box>
          <input type='submit' style={{ visibility:'hidden', position: 'fixed' }} />
        </form>
        {/* Product Tags */}
        {/* Form for tags inputs */}
        <form onSubmit={handleSubmitTag(onSubmitTag)}>
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Product tags" {...registerTag('tag', { required: 'The product tags is required' })} />
              <IconButton
                aria-label={'Add tag'}
                icon={<ArrowRightIcon />}
                type='submit'
                marginX={'10px'}
              />
            </InputGroup>
            {errorsTag.tag && <span style={{ color: 'red' }}>{errorsTag.tag?.message?.toString()}</span>}
          </Box>
        </form>
        {/* Tags list */}
        <Flex flexWrap={'wrap'} maxWidth={'300px'} marginBottom={'30px'}>
          {tagArray.map((tag) => (
            <Tag
              size='md'
              key={tag}
              borderRadius='full'
              variant='solid'
              colorScheme='green'
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => setTagArray([...tagArray.filter(item => item !== tag)])} />
            </Tag>
          ))}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Product Wholesale Price */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input
                as={NumericFormat}
                id="wholesalePrice"
                placeholder="Product wholesale price"
                prefix={'$'}
                thousandSeparator=','
                decimalSeparator='.'
                decimalScale={2}
                allowNegative={false}
                value={watch('wholesalePrice') || ''}
                onValueChange={(values: NumberFormatValues) => setValue('wholesalePrice', values.floatValue)}
                {...register('wholesalePrice', { required: 'The wholesale price is required' })}
              />
            </InputGroup>
            {errors.wholesalePrice && <span style={{ color: 'red' }}>{errors.wholesalePrice?.message?.toString()}</span>}
          </Box>
          {/* Product Order Min For Wholesale */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input
                as={NumericFormat}
                id="orderMinForWholesale"
                placeholder="Min quantity for a wholesale"
                thousandSeparator=','
                decimalSeparator='.'
                decimalScale={2}
                allowNegative={false}
                value={watch('orderMinForWholesale') || ''}
                onValueChange={(values: NumberFormatValues) => setValue('orderMinForWholesale', values.floatValue)}
                {...register('orderMinForWholesale', { required: 'The min quantity is required' })}
              />
            </InputGroup>
            {errors.orderMinForWholesale && <span style={{ color: 'red' }}>{errors.orderMinForWholesale?.message?.toString()}</span>}
          </Box>
          {/* Product Stock */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input
                as={NumericFormat}
                id="stock"
                placeholder="Product stock"
                thousandSeparator=','
                decimalSeparator='.'
                decimalScale={2}
                allowNegative={false}
                value={watch('stock') || ''}
                onValueChange={(values: NumberFormatValues) => setValue('stock', values.floatValue)}
                {...register('stock', { required: 'The stock is required' })}
              />
            </InputGroup>
            {errors.stock && <span style={{ color: 'red' }}>{errors.stock?.message?.toString()}</span>}
          </Box>

          {/* Submit button */}
          <Flex justifyContent={'space-between'}>
            <Button disabled={isFetching || isFetchingCategories} type='submit' colorScheme="teal" size="sm">
              { isFetching ? <Spinner /> : ''} Register
            </Button>
            <Button disabled={isFetching || isFetchingCategories} colorScheme={'gray'} size="sm" onClick={() => { history.back() }} >
              { isFetching ? <Spinner /> : ''} Cancel
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  </>
}

export default ProductRegisterPage