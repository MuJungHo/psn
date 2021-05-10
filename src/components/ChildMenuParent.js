import React from 'react';
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'

import {
  List,
  ListItem,
  ListItemText,
  Card
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    width: 100,
    cursor: 'pointer',
  },
  node: {
    height: 70,
    padding: 0,
    borderTop: '1px solid #393b4c',
    '& svg': {
      margin: 'auto'
    },
    '&:hover': {
      backgroundColor: 'rgba(243, 29, 101, 0.4)!important'
    }
  },
  title: {
    '& span': {
      fontSize: 12,
      textAlign: 'center'
    }
  },
  nested: {
    '&:hover': {
      backgroundColor: 'rgba(243, 29, 101, 0.4)!important',
      '& span': {
        color: '#fff'
      }
    },

  },
}))
export default props => {
  const classes = useStyles();
  const [isHover, setHover] = React.useState(false);
  const [top, setTop] = React.useState(0);
  const { name, routes, pathname, icon } = props
  const isActive = routes.some(route => route.value === pathname)

  const handleMouseEnter = (event) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect()
    setTop(currentTargetRect.top)
    setHover(true)
  };
  const handleClose = () => {
    setHover(false)
  };
  return (
    <div
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleClose}
    >
      <ListItem
        className={classes.node} style={{
          backgroundColor: isActive ? '#f31d65' : 'transparent'
        }}
      >
        {icon}
      </ListItem>
      {
        isHover
          ?
          <Card
            style={{
              position: 'fixed',
              backgroundColor: '#21223f',
              color: '#fff',
              left: 95,
              top: top,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleClose}
          >
            <List component="div" disablePadding>
              <ListItem className={classes.title}>
                <ListItemText primary={name} />
              </ListItem>
            </List>
            {
              routes.map(route =>
                <NavLink key={route.value} to={route.value}>
                  <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                      <ListItemText primary={route.name} style={{
                        color: pathname === route.value ? '#5295FF' : '#bebebe',
                      }} />
                    </ListItem>
                  </List>
                </NavLink>
              )}
          </Card>
          : null
      }

    </div>
  )
}