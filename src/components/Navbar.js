import React from 'react'
import {
  InputAdornment,
  Snackbar,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { setDrawerStatus } from '../actions/drawer'
import IconButton from '@material-ui/core/IconButton';

import Paper from '../components/material/Paper'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard
    })
  },
  appBarShift: {
    marginLeft: 260,
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
    height: 80,
    boxShadow: 'none',
    borderBottom: '1px solid #e3e9f4',
    boxSizing: 'content-box'
  },
}))
export default () => {
  const { status } = useSelector(state => state.drawer)
  const classes = useStyles()
  const theme = useTheme();
  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    dispatch(setDrawerStatus(true))
  };

  const handleDrawerClose = () => {
    dispatch(setDrawerStatus(false))
  };
  return (
    <AppBar
      position="fixed"
      className={status ? classes.appBar : classes.appBarShift}
      style={{
        backgroundColor: '#f4f6f8',
        width: status ? 'calc(100% - 260px)' : 'calc(100% - 100px)',
        marginLeft: status ? 260 : 100,
        boxShadow: 'none',
      }}>
      <Paper className={classes.paper} >

        <IconButton onClick={status ? handleDrawerClose : handleDrawerOpen}>
          {status ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        Navbar
      </Paper>
    </AppBar>
  )
}