import React from 'react'
import {  withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'

export default withStyles(theme => ({
    root: {
        backgroundColor: 'transparent',
        height: '.875rem'
    }
}))((props) => <BottomNavigation {...props} />)