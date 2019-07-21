import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from './components/session/SignUp'
import Login from './components/session/Login'

function App () {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Login</Link>
      <Route path='/signup' component={SignUp} />
      <Route path='/login' component={Login} />
    </BrowserRouter>
  )
}

export default App
