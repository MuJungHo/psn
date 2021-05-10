import React from 'react'
import {  withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export default withStyles(theme => ({
    root: {
        boxShadow: theme.shadows[0],
        borderRadius: 8,
        height: 30,
        fontWeight: 400,
        // padding: '.8rem 1rem',
        fontSize: '1rem',
        '& svg': {
            fill: '#fff',
            marginRight: theme.spacing(1)
        },
        '& img': {
            marginRight: theme.spacing(1)
        }
    },
    contained: {
        color: '#fff',
    }
}))((props) => <Button {...props} disableElevation disableRipple/>)