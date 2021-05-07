import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import Button from '../components/material/Button'
import More from "../icons/More"
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
export default ({ items, open, btnText }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    if (typeof open === 'function') open()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleItemClick = item => {
    setAnchorEl(null)
    item.onClick()
  }
  return (
    <div onClick={e => e.stopPropagation()}>
      {
        btnText
          ?
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
          >{btnText}</Button>
          :
          <IconButton
            onClick={handleClick}
            classes={{ root: classes.button }}
            aria-controls='id'>
            <More />
          </IconButton>
      }
      <Menu
        open={Boolean(anchorEl)}
        classes={{ list: classes.menu }}
        anchorEl={anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {
          items.map(item =>
            <MenuItem
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={classes.item}
            >
              {item.icon ? item.icon : null}
              <Typography color="textSecondary" variant="caption">{item.name}</Typography>
            </MenuItem>
          )
        }

      </Menu>
    </div>
  )
}