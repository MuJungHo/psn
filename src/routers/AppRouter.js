import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from './routes.js'

import Sidebar from '../components/Sidebar.js'
import Navbar from '../components/Navbar.js'

import PrivateRoute from './PrivateRoute.js'
// import PublicRoute from './PublicRoute.js'
export default () => {
  return (
    <BrowserRouter>
      <Switch>
        {
          routes
            .map((route, index) =>
              <PrivateRoute
                key={index}
                path={route.path}
                component={route.component}
              />
            )
        }
        <Redirect to='/program' />
      </Switch>
    </BrowserRouter>
  )
}