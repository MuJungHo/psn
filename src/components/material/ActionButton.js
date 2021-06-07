import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

export default withStyles(theme => ({
  root: {
    '& svg': {
      fill: 'inherit',
      width: 20,
      height: 20
    },
    backgroundColor: theme.grey.light,
    borderRadius: 8,
    width: 28,
    height: 28,
    padding: 0,
    '& .MuiTouchRipple-child': {
      backgroundColor: '#5295FF',
      borderRadius: 8,
      width: 28,
      height: 28,
    },
    '&:hover': {
      backgroundColor: 'rgba(82, 149, 255, 0.1)',
    }
  }
}))((props) => <IconButton {...props} />)