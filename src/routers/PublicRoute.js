import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default ({
  component: Component,
  ...rest
}) => {
  const { userToken } = useSelector(state => state.auth)
  const isRoot = localStorage.getItem('rl') && localStorage.getItem('rl') === '9999'

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          userToken ? <Redirect to={isRoot ? '/root' : '/formlist'} /> : <Component {...props} />
        }
      />
    </div>
  )
}