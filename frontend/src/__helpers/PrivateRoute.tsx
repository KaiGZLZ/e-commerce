import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { parseLocarstorageUser } from './isUser'

interface PrivateRouteProps {
  allowedRoles: number[];
}

//Render a route component if the user is logged in, otherwise redirect them to the /login page.
//Check role in the same way to restrict access
export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {

  const user = parseLocarstorageUser()

  if (!user) {
    return <Navigate to={'/login'} />
  }

  if (allowedRoles.length === 0) {
    return <Outlet />
  }

  if (allowedRoles.includes(user.role)) {
    return <Outlet />
  }

  return <Navigate to={'/'} />

}