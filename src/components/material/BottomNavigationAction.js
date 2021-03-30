import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

export default withStyles(theme => ({
  root: {
    padding: 0,
    paddingTop: 0,
    fontSize: 'inherit',
    '& .MuiBottomNavigationAction-label.Mui-selected': {
      fontSize: 'inherit'
    },
    '& .MuiBottomNavigationAction-label': {
      fontSize: 'inherit'
    }
  },
  selected: {
    padding: 0,
    paddingTop: '0px !important'
  }
}))((props) => <BottomNavigationAction {...props} />)