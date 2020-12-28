import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import Home from './Home.jsx'

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
