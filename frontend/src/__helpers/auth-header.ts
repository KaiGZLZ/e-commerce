
import CryptoJS from 'crypto-js'
import { passphrase } from '../config/config'
import { history } from './history'

interface user {
  token: string
}

export default function authHeader(){
  //  Retorna el header de autorización con el token jwt
  const user = localStorage.getItem('user')

  let parsedUser: user | null = null

  if(user){
    try{
      const bytes  = CryptoJS.AES.decrypt(user, passphrase)
      const originalData = bytes.toString(CryptoJS.enc.Utf8)
      parsedUser = JSON.parse(originalData)
    }catch(err){
      history.push('/login')
    }
  }

  if (parsedUser && parsedUser.token) {
    return 'Bearer ' + parsedUser.token
  } else {
    return ''
  }
}
