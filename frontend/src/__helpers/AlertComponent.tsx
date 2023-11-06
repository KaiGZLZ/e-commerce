
import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { alertSlice } from '../redux/slices/alertSlice'
import { RootState } from '../redux/store/store'



export const AlertComponent = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state: RootState) => state.alert)
  //const [alertActive, setAlertActive] = useState(false)


  useEffect(() => {
    if (alert.status && alert.message){
      //setAlertActive(true)
      setTimeout(() => {
        dispatch(alertSlice.actions.clearAlert())
      }, 3000)
    }
  }, [alert])

  if (!alert.status || !alert.message) {
    return <></>
  }

  return <>
    <Alert status={alert.status} width={'100%'} maxWidth={'1200px'} >
      <AlertIcon />
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.message}</AlertDescription>
    </Alert>
  </>

}