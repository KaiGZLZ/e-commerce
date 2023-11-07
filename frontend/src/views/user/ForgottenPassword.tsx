
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button, Spinner } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm  } from 'react-hook-form'
import { useLazyForgottenPasswordUserQuery } from '../../services/user.service'

type Data = {
  email: string
}


function ForgottenPassword() {

  const navigate = useNavigate()

  const [sendData, { isFetching }] = useLazyForgottenPasswordUserQuery()

  const { register, handleSubmit, formState: { errors } } = useForm<Data>()

  const onSubmit= (data: Data)  => {

    sendData({ data })
      .then((response) => {

        if(response.isSuccess){
          console.log('The email was send')
          navigate('/')
        }
        else{
          console.error(response.error)
        }
      })
  }

  return <>
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} >
          <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'45px'}>Forgotten password</Box>
          {/* Email */}
          <Box marginBottom={'45px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']}  color={'black'}>
              <InputLeftElement pointerEvents='none'>
                <ArrowRightIcon color='gray.300' />
              </InputLeftElement>
              <Input type="email" placeholder="Insert your email" {...register('email', { required: 'The email is required' })} />
            </InputGroup>
            {errors.email && <span style={{ color: 'red' }}>{errors.email?.message?.toString()}</span>}
          </Box>
          {/* Login page */}
          <Flex marginBottom={'45px'} width={'100%'} flexDir={['column', 'column', 'row', 'row']} justifyContent={['','', 'space-between','space-between']} paddingX={'20px'}>
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

export default ForgottenPassword