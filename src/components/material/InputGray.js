import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

export default withStyles(theme => ({
  root: {
    borderRadius: 4,
    backgroundColor: '#f8f9fb'
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: '7px 26px 7px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto',
      'PingFang TC',
      'Noto Sans TC',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    '&::placeholder': {
      fontSize: 12,
    }
  },
}))((props) => <InputBase {...props} />)