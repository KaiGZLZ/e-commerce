import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { parseLocarstorageUser } from './isUser'

//Renderizar un componente ruta si el usuario está conectado, de lo contrario, lo redirige a la página /login.
//Verifica rol de igual forma para restringir el acceso
export const PrivateRoute = () => {

  const user = parseLocarstorageUser()

  //no logueado redireccionar al login
  if (user) {
    return <Outlet />
  }
  else {
    return <Navigate to={'/'}/>
  }
}