import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
export default withStyles(() => ({
  root: {      
    boxShadow: '0 2px 6px 0 rgba(141, 152, 170, .08)',
    height: '100%'
  }
}))((props) => <Paper {...props} />)