import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

export default withStyles(theme => ({
    root: {
        '& svg': {
            fill: theme.blue.light,
            width: 20,
            height: 20
        },
        backgroundColor: 'transparent',
        borderRadius: 8,
        width: 30,
        height: 30,
        padding: 0,
        '& .MuiTouchRipple-child': {
            backgroundColor: '#bebebe',
            borderRadius: 8,
            width: 30,
            height: 30,
        },
        '&:hover': {
            backgroundColor: '#f4f6f8',
        }
    }
}))((props) => <IconButton {...props} />)