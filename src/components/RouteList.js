import React from 'react';
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import RouteParent from './RouteParent'
import { useLocation } from "react-router";
import message from '../i18n'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 10px',
    '& > *:not(:first-child)': {
      marginTop: 10
    },
    '& * > li': {
      borderRadius: 10
    },
    '& * > li:hover span': {
      color: '#fff'
    },
    '& * > svg': {
      marginRight: 20
    },
    '& a.active > li': {
      backgroundColor: '#5295FF'
    },
    '& a.active > li span': {
      color: '#fff'
    }
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  node: {
    color: '#bebebe',
    // transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(82, 149, 255, 0.4)'
    }
  }
}));

export default () => {
  const classes = useStyles();
  let location = useLocation();
  const [pathname, setPathname] = React.useState(null)
  React.useEffect(() => {
    setPathname(location.pathname)
  }, [location])
  const routes = [
    {
      to: '/newui/medias',
      icon: <></>,
      name: '媒體'
    },
    {
      to: '/newui/programs',
      icon: <></>,
      name: '節目'
    },
    {
      name: '排程',
      icon: <></>,
      childs: [
        { value: '/newui/daily', name: '單日節目表' },
        { value: '/newui/schedule', name: '排程' }
      ]
    },
    {
      name: '腳本',
      icon: <></>,
      childs: [
        { value: '/newui/interaction', name: '互動' },
        { value: '/newui/event', name: '事件' }
      ]
    },
    {
      name: '派送',
      icon: <></>,
      childs: [
        { value: '/newui/dispatch', name: '派送' },
        { value: '/newui/status', name: '狀態' },
        { value: '/newui/history', name: '歷史' }
      ]
    },
    {
      to: '/newui/device',
      icon: <></>,
      name: '設備'
    }
  ]
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
      style={{
        width: 'calc(100% - 42px)',
        marginLeft: 20,
        backgroundColor: 'transparent',
        overflow: 'auto',
        marginTop: 10
      }}
    >
      {
        routes.map(route =>
          route.childs && route.childs.length > 0
            ?
            <RouteParent
              key={route.name}
              pathname={pathname}
              name={route.name}
              icon={route.icon}
              routes={route.childs}
            />
            :
            <div key={route.name}>
              <NavLink to={route.to}>
                <ListItem className={classes.node}>
                  {route.icon}
                  <ListItemText primary={route.name} />
                </ListItem>
              </NavLink>
            </div>
        )
      }
    </List>
  );
}