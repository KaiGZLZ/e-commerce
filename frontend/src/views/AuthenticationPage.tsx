
import React, { useEffect } from 'react'
import { Box, Flex, Spinner } from '@chakra-ui/react'
//import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLazyAuthenticateUserQuery } from '../services/user.service'
import { passphrase } from '../config/config'
import { useDispatch } from 'react-redux'
import { alertSlice } from '../redux/slices/alertSlice'
import CryptoJS from 'crypto-js'


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
          const cryptUser = CryptoJS.AES.encrypt(JSON.stringify(response.data.user), passphrase).toString()
          localStorage.setItem('user', cryptUser)
          console.log(localStorage.getItem('user'))
          dispatch(alertSlice.actions.setAlert({ status: 'success', title: 'Success', message: 'User logged successfully' }))
          navigate('/dashboard')
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