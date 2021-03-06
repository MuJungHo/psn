import React from 'react'
import {  withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

export default withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
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
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))((props) => <InputBase {...props} />)