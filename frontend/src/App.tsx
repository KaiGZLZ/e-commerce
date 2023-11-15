import React, { useEffect } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'

// import Dashboard from './views/Dashboard'
// import ForgottenPasswordForm from './views/ForgotenPasswordForm'
// import ChangePasswordForm from './views/ChangePasswordForm'

import { PrivateRoute } from './__helpers/PrivateRoute'
import HomePage from './views/Homepage'
import Categorie from './views/Categorie'
import ProductPage from './views/products/ProductPage'
import Login from './views/user/Login'
import Register from './views/user/Register'
import ForgottenPassword from './views/user/ForgottenPassword'
import { AlertComponent } from './__helpers/AlertComponent'
import AuthenticationPage from './views/user/AuthenticationPage'
import { userSlice } from './redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { parseLocarstorageUser } from './__helpers/isUser'
import ProductRegisterPage from './views/products/ProductRegisterPage'
import userEnum from './enums/user.enum'
import RegisterCategorie from './views/categories/RegisterCategorie'

function App() {

  const dispatch = useDispatch()

  // If user is logged in, set user in redux store
  useEffect(() => {
    const user = parseLocarstorageUser()
    if (user) {
      dispatch(userSlice.actions.setUser(user))
    }
  }, [])

  return(
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', overflow: 'hidden' }}>
        <AlertComponent />
        {/* <CustomAlert state={alertActive} severity={alert.type} message={alert.message} /> */}
        <Router>
          <Switch>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            <Route element={<PrivateRoute allowedRoles={[userEnum.role.admin]} />} ><Route path="/categories/register" element={<RegisterCategorie />} /></Route>


            <Route path='/register' element={<Register />} />
            <Route path="/authenticate" element={<AuthenticationPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotten-password' element={<ForgottenPassword />} />
            {/* <Route path='/change-password' element={<ForgottenPassword />} /> */}


            {/* Products section */}
            <Route path="/products/product/:productId" element={<ProductPage />} />
            <Route path="/products/category/:categorie" element={<Categorie />} />
            <Route element={<PrivateRoute allowedRoles={[userEnum.role.admin]} />} ><Route path="/products/register" element={<ProductRegisterPage />} /></Route>

          </Switch>
        </Router>
      </div>
    </>
  )
}


export default App
