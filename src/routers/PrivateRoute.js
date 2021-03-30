import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to='/' />
      }
    />
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: true
})

export default connect(mapStateToProps)(PrivateRoute)