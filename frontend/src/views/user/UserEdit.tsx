
import React from 'react'
import { Box, Flex, Input, InputGroup, InputLeftElement,Button, Select } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
//import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm  } from 'react-hook-form'
import { useGetUserByUsernameQuery, useUpdateUserMutation } from '../../services/user.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { parseLocarstorageUser } from '../../__helpers/isUser'
import Navbar from '../../components/Navbar'
import userEnum from '../../enums/user.enum'
import FooterComponent from '../../components/FooterComponent'

type UpdateData = {
  username: string
  firstname: string
  lastname: string
  email: string
  role: number | undefined
  userId: string
}

function UserEdit() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const user = parseLocarstorageUser()


  if (!user) {
    navigate('/login')
  }

  // RTK Query
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  // Form data
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateData>()

  // Get user data
  const { data: userData, isFetching, isSuccess, error } = useGetUserByUsernameQuery(location.state || user?.username)

  React.useEffect(() => {
    if (isSuccess && userData) {
      reset({
        username: userData.result.username,
        firstname: userData.result.firstname,
        lastname: userData.result.lastname,
        email: userData.result.email,
        role: userData.result.role
      })
    }
  }, [userData, isSuccess])

  React.useEffect(() => {
    if (error) {
      dispatch(alertSlice.actions.setAlert(error))
    }
  }, [error])


  const onSubmit= (data: UpdateData)  => {

    if (!userData) return

    data.userId = userData?.result._id

    updateUser(data)
      .unwrap()
      .then((response) => {
        dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: response.message }))
      })
      .catch((e) =>{
        dispatch(alertSlice.actions.setAlert(e))
      })
  }

  return <>
    <Navbar />
    <Flex marginTop={'4rem'} justifyContent={'center'} width={'100%'}  maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Form container */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={'column'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'1200px'} border={'1px'} padding={'20px'} color={'gray.600'} rounded={10} bg={'gray.50'} >
          <Box fontSize={30} fontWeight={'bold'} textAlign={'center'} marginBottom={'20px'}>Update user</Box>
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
          {/* Role */}.
          <Box marginBottom={'20px'}>
            <InputGroup width={['20rem', '20rem', '20rem', '20rem']}  color={'black'}>
              <Select placeholder="Select role" {...register('role', { required: 'The role is required' })}>
                {
                  Object.keys(userEnum.roleDescription).map((key) => {
                    return <option key={Number(key)} value={Number(key)}>{userEnum.roleDescription[Number(key)]}</option>
                  })
                }
              </Select>
            </InputGroup>
            {errors.role && <span style={{ color: 'red' }}>{errors.role?.message?.toString()}</span>}
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
          <Button type='submit' colorScheme="teal" size="sm"
            isDisabled={!userData}
            isLoading={isFetching || isLoading}
            loadingText='Updating'
          >
            Update
          </Button>
        </Flex>
      </form>
    </Flex>

    {/* Footer component */}
    <Flex flexDirection={'column'} width={'100%'} maxWidth={'1200px'}>
      <FooterComponent  />
    </Flex>
  </>
}

export default UserEdit