import React from 'react'
import {
  InputAdornment,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Paper from '../components/material/Paper'
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from 'react-redux'
const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard
    })
  },
  appBarShift: {
    marginLeft: 240,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard
    }),
  },
  toolbar: {
    padding: 20,
    minHeight: 'unset'
  },
  paper: {
    flexGrow: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    boxShadow: 'none',
  },
}))
export default () => {
  const { status } = useSelector(state => state.drawer)
  const classes = useStyles()
  return (
    <AppBar
      position="fixed"
      className={status ? classes.appBar : classes.appBarShift}
      style={{
        backgroundColor: '#f4f6f8',
        width: status ? 'calc(100% - 240px)' : 'calc(100% - 73px)',
        marginLeft: status ? 240 : 73,
        boxShadow: 'none',
      }}>
      <Paper className={classes.paper} >
        Navbar
      </Paper>
    </AppBar>
  )
}