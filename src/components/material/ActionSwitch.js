import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

export default withStyles(theme => ({
  root: {
    padding: '13px 10px'
  },
  switchBase: {
    color: '#fff',
    '&$checked': {
      color: '#fff',
    },
    '&$checked + $track': {
      backgroundColor: theme.blue.light,
      opacity: 1
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3)',
      backgroundImage: 'linear-gradient(to bottom, #ffffff, #edecec)'
    },
  },
  checked: {},
  track: {},
}))((props) => <Switch {...props} />)