
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { useForm  } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import Navbar from '../../components/Navbar'
import { useRegisterCategoryMutation } from '../../services/category.service'
import { useNavigate } from 'react-router-dom'

type RegisterData = {
  name: string
  description: string
}

function RegisterCategorie() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // RTK Query
  const [registerData, { isLoading }] = useRegisterCategoryMutation()


  // Form data
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm<RegisterData>()

  const onSubmit= (data: RegisterData)  => {
    registerData(data)
      .unwrap()
      .then((response) => {
        setFocus('name')
        reset()
        dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: response.message }))
      })
      .catch((e) =>{
        dispatch(alertSlice.actions.setAlert(e))
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
          <Flex width={'100%'} justifyContent={'initial'}>
            <Box width={'auto'} fontSize={15} textDecor={'underline'} color={'gray.600'} cursor={'pointer'} _hover={{ color:'#fcb941' }} onClick={() => history.back()}>
              {'Back'}
            </Box>
          </Flex>
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
          {/* Submit button */}
          <Flex justifyContent={'space-between'}>
            <Button type='submit' colorScheme="teal" size="sm"
              isLoading={isLoading}
              loadingText='Registering'
            >
              Register
            </Button>
            <Button  colorScheme={'gray'} size="sm"
              isDisabled={isLoading}
              onClick={() => { navigate(-1) }}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  </>
}

export default RegisterCategorie