import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { passphrase } from '../config/config'
import CryptoJS from 'crypto-js'

//Renderizar un componente ruta si el usuario está conectado, de lo contrario, lo redirige a la página /login.
//Verifica rol de igual forma para restringir el acceso
export const PrivateRoute = () => {

  const currentUser = localStorage.getItem('user')

  //no logueado redireccionar al login
  if (!currentUser) {
    return  <Navigate to={'/'}/>
  }

  //Obtener data de usuario
  try{
    const bytes  = CryptoJS.AES.decrypt(currentUser, passphrase)
    const originalData = bytes.toString(CryptoJS.enc.Utf8)
    JSON.parse(originalData)
    return <Outlet />

  }catch(err){
    //  The user is not authorized
    return <Navigate to={'/'}/>
  }
}