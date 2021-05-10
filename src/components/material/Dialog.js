import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'

export default withStyles(theme => ({
    root: {
        '& .MuiDialog-paperWidthSm': {
            width: 562
        },
        '& .MuiDialogTitle-root': {
            padding: '1.2rem 0 .7rem 2.1rem'
        },
        '& .MuiTypography-root.MuiTypography-h6': {
            fontSize: '1.1rem',
            fontWeight: 'normal'
        },
        '& .MuiDialogContent-root': {
            padding: '1.2rem 2.1rem .7rem 2.1rem'
        },
        '& .MuiFormControl-root': {
            width: '100%'
        },
        '& .MuiTypography-body1': {
            // color: '#888'
        },
        '& .react-share__ShareButton:focus': {
            outline: 'none'
        },
        '& .react-share__ShareButton:hover': {
            opacity: .8
        },
        '& .react-share__ShareButton:active': {
            opacity: 1
        },
        '& .MuiDialogActions-root': {
            padding: '2.1rem'
        }
    }
}))((props) => <Dialog {...props} />)