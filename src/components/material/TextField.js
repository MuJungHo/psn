import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(theme => ({
    root: {
        "& .MuiInput-underline:before": {
            borderBottomColor: 'rgba(190, 190, 190, 0.4)'
        },
        "& .MuiInput-underline:hover:before": {
            borderWidth: 1,
            borderBottomColor: 'rgba(190, 190, 190, 0.4)'
        },
        '& .MuiInput-underline.Mui-error:after': {
            borderBottomColor: '#f57182'
        },
        "& .MuiInput-underline:after": {
            // borderBottomColor: '#5295ff'
        },
        "& .Mui-error": {
            borderWidth: 1,
            borderBottomColor: '#f57182'
        },
        '& .MuiFormHelperText-root': {
            color: '#f57182'
        },
        '&::placeholder': {
            fontSize: '1rem'
        },
        flex: '1 1 auto'
    }
}))((props) => <TextField {...props} inputProps={{
    style: {
        fontSize: '1rem',
        height: 'unset',
        fontWeight: 400,
        padding: '.5rem 0 .5rem',
    }
}} />)