import React from 'react';
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    '& a.active li div:nth-child(1)': {
      backgroundColor: '#5295FF'
    },
    '& a.active span': {
      color: '#5295FF'
    }
  },
  nested: {
    paddingLeft: 20,
    '& span': {
      fontSize: '.8rem',
      color: '#bebebe',
    },
    '& div:nth-child(1)': {
      backgroundColor: '#bebebe'
    },
    '&:hover': {
      '& div:nth-child(1)': {
        backgroundColor: '#5295FF'
      },
      '& div:nth-child(2) span': {
        color: '#5295FF'
      }
    }
  },
  node: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(82, 149, 255, 0.4)!important'
    }
  },

}));

export default props => {
  const classes = useStyles();
  const { name, routes, pathname, icon } = props
  const [open, setOpen] = React.useState(false);
  const [isActive, setActive] = React.useState(routes.some(route => route.value === pathname));
  React.useEffect(() => {
    setOpen(routes.some(route => route.value === pathname))
    setActive(routes.some(route => route.value === pathname))
  }, [pathname])
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <ListItem onClick={handleClick} className={classes.node} style={{
        color: isActive ? '#fff' : '#bebebe',
        backgroundColor: isActive ? '#5295FF' : 'transparent'
      }}>
        {icon}
        <ListItemText primary={name} />
      </ListItem>
      <Collapse in={open} timeout={1000} unmountOnExit>
        {
          routes.map(route => {
            return (
              <NavLink key={route.value} to={route.value}>
                <List component="div" disablePadding>
                  <ListItem className={classes.nested}>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      marginRight: 27
                    }} />
                    <ListItemText primary={route.name} />
                  </ListItem>
                </List>
              </NavLink>
            )
          })
        }
      </Collapse>
    </div>
  );
}