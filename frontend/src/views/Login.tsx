
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button, Spinner } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm  } from 'react-hook-form'
import { useLazyLoginUserQuery } from '../services/user.service'
import { passphrase } from '../config/config'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../redux/slices/alertSlice'
import CryptoJS from 'crypto-js'

type LoginData = {
  username: string
  password: string
}


function Login() {

  const navigate = useNavigate() //  Hook para cambiar el path del navegador
  const dispatch = useDispatch()

  // RTK Query
  const [loginUser, { isFetching }] = useLazyLoginUserQuery()

  // form data
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()

  const onSubmit= (data: LoginData)  => {
    console.log(data)


    loginUser(data)
      .then((response) => {
        if(response.isSuccess){
          const cryptUser = CryptoJS.AES.encrypt(JSON.stringify(response.data.user), passphrase).toString()
          localStorage.setItem('user', cryptUser)
          dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: 'User logged successfully' }))
          navigate('/')
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
      .catch((error) =>
        console.log(error)
      )
  }

  return <>
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex position={'relative'} flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} >
          <Box position={'absolute'} top={5} left={5} >
            <Link to={'/'}>
              <Box fontSize={15} textDecor={'underline'} color={'gray.600'} _hover={{ color:'#fcb941' }}>
                {'Back'}
              </Box>
            </Link>
          </Box>
          <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'45px'}>Login</Box>
          {/* Username */}
          <Box marginBottom={'45px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']} color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="text" placeholder="Username" {...register('username', { required: 'The username is required' })} />
            </InputGroup>
            {errors.username && <span style={{ color: 'red' }}>{errors.username?.message?.toString()}</span>}
          </Box>
          {/* Password */}
          <Box marginBottom={'45px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']}  color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="password" placeholder="Password" {...register('password', { required: 'The password is required' })} />
            </InputGroup>
            {errors.password && <span style={{ color: 'red' }}>{errors.password?.message?.toString()}</span>}
          </Box>
          {/* Forgot password and register */}
          <Flex marginBottom={'45px'} width={'100%'} flexDir={['column', 'column', 'row', 'row']} justifyContent={['','', 'space-between','space-between']} paddingX={'20px'}>
            <Link to={'/register'}>
              <Box  fontSize={15} textDecor={'underline'} color={'gray.600'} _hover={{ color:'#fcb941' }}>
                {'Register'}
              </Box>
            </Link>
            <Link to={'/forgotten-password'}>
              <Box fontSize={15} textDecor={'underline'} color={'gray.600'} _hover={{ color:'#fcb941' }}>
                {'Forgotten password?'}
              </Box>
            </Link>
          </Flex>
          {/* Login button */}
          <Button disabled={isFetching} type='submit' colorScheme="teal" size="sm">
            { isFetching ? <Spinner /> : ''} Login
          </Button>
        </Flex>
      </form>
    </Flex>
  </>
}

export default Login