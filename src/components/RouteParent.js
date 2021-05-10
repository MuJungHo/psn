import React from 'react';
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: '1px solid #393b4c',
    '& a.active li div:nth-child(1)': {
      backgroundColor: '#f31d65'
    },
    '& a.active span': {
      color: '#f31d65'
    }
  },
  nested: {
    paddingLeft: 20,
    '& span': {
      fontSize: '.8rem',
      color: '#a0a4ad',
    },
    '& div:nth-child(1)': {
      backgroundColor: '#bebebe'
    },
    '&:hover': {
      backgroundColor: 'rgba(243, 29, 101, 0.1)',
      '& div:nth-child(1)': {
        backgroundColor: '#f31d65'
      },
      '& div:nth-child(2) span': {
        color: '#f31d65'
      }
    }
  },
  node: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(243, 29, 101, 0.4)!important'
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
        color: '#fff',
        backgroundColor: isActive ? '#f31d65' : 'transparent'
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