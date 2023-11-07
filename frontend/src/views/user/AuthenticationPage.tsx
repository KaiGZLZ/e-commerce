
import React, { useEffect } from 'react'
import { Box, Flex, Spinner } from '@chakra-ui/react'
//import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLazyAuthenticateUserQuery } from '../../services/user.service'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../../redux/slices/alertSlice'
import { isUser } from '../../__helpers/isUser'
import { userSlice } from '../../redux/slices/userSlice'


function Authentication() {

  const navigate = useNavigate() //  Hook para cambiar el path del navegador
  const location = useLocation()
  const dispatch = useDispatch()


  // RTK Query
  const [authenticateUser, { isFetching }] = useLazyAuthenticateUserQuery()


  useEffect(() => {
    // The token is in the location hash
    const token = location.hash.split('#')[1]
    const data = {
      token: token
    }
    authenticateUser(data)
      .then((response) => {
        if(response.isSuccess){

          const user = isUser(response.data.user)

          if(!user){
            dispatch(alertSlice.actions.setAlert({ status: 'error', title: 'Error', message: 'Error getting user data' }))
            navigate('/')
            return
          }
          localStorage.setItem('user', JSON.stringify(user))

          if(!response.data.token){
            dispatch(alertSlice.actions.setAlert({ status: 'error', title: 'Error', message: 'Error getting token' }))
            navigate('/')
            return
          }
          localStorage.setItem('token', response.data.token)

          dispatch(userSlice.actions.setUser(user))
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
          navigate('/login')
        }
      })
      .catch((error) =>
        console.log(error)
      )

  }, [])



  return <>
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} maxWidth={'1200px'} bg={'whiteAlpha.800'}>

      {/* Loader */}
      <Box position={'absolute'} top={5} left={5} >
        Authenticating
      </Box>
      {isFetching && <Spinner position={'absolute'} top={5} left={5} />}
    </Flex>
  </>
}

export default Authentication