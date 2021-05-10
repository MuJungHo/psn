import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex'
  },
  content: {
    backgroundColor: '#f4f6f8',
    position: 'relative',
    overflow: 'auto',
    boxSizing: 'border-box',
    marginTop: 80,
    minHeight: 'calc(100vh - 90px)',
    display: 'flex',
    flex: 1,
    transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
  }
}))

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const { status } = useSelector(state => state.drawer)
  const classes = useStyles()
  return (

    <div id="content" className={classes.content} style={{
      marginLeft: status ? 260 : 100
    }}>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} {...rest} /> : <Redirect to='/' />
        }
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: true
})

export default connect(mapStateToProps)(PrivateRoute)