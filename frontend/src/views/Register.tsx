
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button, Spinner } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm  } from 'react-hook-form'
import { useLazyRegisterUserQuery } from '../services/user.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../redux/slices/alertSlice'

type RegisterData = {
  username: string
  firstname: string
  lastname: string
  password: string
  passwordConfirmation: string
  email: string
}

function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // RTK Query
  const [registerUser, { isFetching }] = useLazyRegisterUserQuery()

  // Form data
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterData>()

  const onSubmit= (data: RegisterData)  => {
    registerUser(data)
      .then((response) => {
        if(response.isSuccess){
          reset()
          dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: 'User registered successfully' }))
          navigate('/login')
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

  return <>
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} >
          <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'20px'}>Register user</Box>
          {/* Username */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Username" {...register('username', { required: 'The username is required' })} />
            </InputGroup>
            {errors.username && <span style={{ color: 'red' }}>{errors.username?.message?.toString()}</span>}
          </Box>
          {/* Firstname */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Firstname" {...register('firstname', { required: 'The firstname is required' })} />
            </InputGroup>
            {errors.firstname && <span style={{ color: 'red' }}>{errors.firstname?.message?.toString()}</span>}
          </Box>
          {/* Lastname */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Lastname" {...register('lastname', { required: 'The lastname is required' })} />
            </InputGroup>
            {errors.lastname && <span style={{ color: 'red' }}>{errors.lastname?.message?.toString()}</span>}
          </Box>
          {/* Email */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']}  color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="email" placeholder="Email" {...register('email', { required: 'The email is required' })} />
            </InputGroup>
            {errors.email && <span style={{ color: 'red' }}>{errors.email?.message?.toString()}</span>}
          </Box>
          {/* Password */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']}  color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="password" placeholder="Password" {...register('password', { required: 'The password is required' })} />
            </InputGroup>
            {errors.password && <span style={{ color: 'red' }}>{errors.password?.message?.toString()}</span>}
          </Box>
          { /* Password confirmation */}
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']}  color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="password" placeholder="Password confirmation" {...register('passwordConfirmation', { required: 'The password confirmation is required' })} />
            </InputGroup>
            {errors.passwordConfirmation && <span style={{ color: 'red' }}>{errors.passwordConfirmation?.message?.toString()}</span>}
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

export default Register