
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button, Spinner } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm  } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import Navbar from '../../components/Navbar'
import { useLazyRegisterCategoryQuery } from '../../services/category.service'

type RegisterData = {
  name: string
  description: string
}

function RegisterCategorie() {

  const dispatch = useDispatch()

  // RTK Query
  const [registerData, { isFetching }] = useLazyRegisterCategoryQuery()


  // Form data
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm<RegisterData>()

  const onSubmit= (data: RegisterData)  => {
    registerData(data)
      .then((response) => {
        if(response.isSuccess){
          setFocus('name')
          reset()
          dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: 'Category registered successfully' }))

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

  React.useEffect(() => {
    setFocus('name')
  }, [setFocus])

  return <>
    <Navbar />
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} marginTop={'50px'} >
          <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'20px'}>Register category</Box>
          {/* Categorie Name */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'} >
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Name" {...register('name', { required: 'The name is required' })} />
            </InputGroup>
            {errors.name && <span style={{ color: 'red' }}>{errors.name?.message?.toString()}</span>}
          </Box>
          {/* Description */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Description" {...register('description', { required: 'The description is required' })} />
            </InputGroup>
            {errors.description && <span style={{ color: 'red' }}>{errors.description?.message?.toString()}</span>}
          </Box>
          {/* Login page */}
          <Flex marginBottom={'20px'} width={'100%'} flexDir={['column', 'column', 'row', 'row']} justifyContent={['','', 'space-between','space-between']} paddingX={'20px'}>
            <Link to={'/login'}>
              <Box  fontSize={15} textDecor={'underline'} color={'gray.600'} _hover={{ color:'#fcb941' }}>
                {'Go to Login'}
              </Box>
            </Link>
            <Link to={'/'}>
              <Box fontSize={15} textDecor={'underline'} color={'gray.600'} _hover={{ color:'#fcb941' }}>
                {'Homepage'}
              </Box>
            </Link>
          </Flex>
          {/* Login button */}
          <Button disabled={isFetching} type='submit' colorScheme="teal" size="sm">
            { isFetching ? <Spinner /> : ''} Register
          </Button>
        </Flex>
      </form>
    </Flex>
  </>
}

export default RegisterCategorie