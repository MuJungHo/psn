import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export default withStyles(theme => {
  console.log(theme)
  return ({
  root: {
    // color: theme.blue.light,
    boxShadow: theme.shadows[0],
    borderRadius: 8,
    height: 30,
    // border: '1px solid' + theme.blue.light,
    // backgroundColor: 'rgba(82, 149, 255, 0.1)',
    fontSize: '1rem',
    fontWeight: 'normal'
  }
})}
)((props) => <Button {...props} variant="outlined" />)