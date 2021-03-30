import React from 'react'
import {  withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

export default withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: ' 5px center',
    backgroundSize: 15
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: '5px 26px 5px 26px',
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
  },
}))((props) => <InputBase {...props} />)