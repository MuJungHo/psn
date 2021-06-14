import React from "react"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Arrow from '../icons/Arrow'
import { Select, InputBase } from '@material-ui/core'
const InputGray = withStyles(theme => ({
  root: {
    borderRadius: 4,
    backgroundColor: '#f8f9fb'
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: '7px 26px 7px 12px',
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
    '&::placeholder': {
      fontSize: 12,
    }
  },
}))((props) => <InputBase {...props} />)

const useStyles = makeStyles(theme => ({
  button: {
    padding: '.7rem'
  },
  menu: {
    padding: 5
  },
  item: {
    height: 40,
    paddingLeft: theme.spacing(1),
    '& > *:not(:first-child)': {
      marginLeft: 20
    },
    '& svg': {
      fill: theme.grey.medium
    }
  },
}))
export default ({ value, onChange, options, style, emptyText }) => {
  console.log(options)
  return (
    <Select
      style={{ ...style }}
      input={<InputGray />}
      IconComponent={Arrow}
      value={value}
      onChange={onChange}
      displayEmpty
    >
      {emptyText ? <MenuItem value={''}>{emptyText}</MenuItem> : null}

      {
        options.map(option => <MenuItem value={option.value} key={option.key}>{option.name}</MenuItem>)
      }
    </Select>
  )
}