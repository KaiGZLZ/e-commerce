import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from 'react-router-dom'

// import Dashboard from './views/Dashboard'
// import AuthenticatingPage from './views/AuthenticatingPage'
// import ForgottenPasswordForm from './views/ForgotenPasswordForm'
// import ChangePasswordForm from './views/ChangePasswordForm'

import { PrivateRoute } from './__helpers/PrivateRoute'
import HomePage from './views/Homepage'
import CartFloatButton from './views/Categorie'
import ProductPage from './views/ProductPage'
import Login from './views/Login'
import Register from './views/Register'
import ForgottenPassword from './views/ForgottenPassword'
import { AlertComponent } from './__helpers/AlertComponent'
import AuthenticationPage from './views/AuthenticationPage'

function App() {

  return(
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', overflow: 'hidden' }}>
        <AlertComponent />
        {/* <CustomAlert state={alertActive} severity={alert.type} message={alert.message} /> */}
        <Router>
          <Switch>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories/:categorie" element={<CartFloatButton />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotten-password' element={<ForgottenPassword />} />
            <Route path="/authenticate" element={<AuthenticationPage />} />
            {/* <Route path="/login" element={<HomePage />} />
            <Route path="/authenticate" element={<AuthenticatingPage />} />
            <Route path="/forgotten-password" element={<ForgottenPasswordForm />} />
            <Route path="/change-password" element={<ChangePasswordForm />} /> */}

            {/* Routes that require authentication token */}
            <Route element={<PrivateRoute />}>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  )
}


export default App
