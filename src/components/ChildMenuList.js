import React from 'react';
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { useLocation } from "react-router"
import Analysis from "../icons/Analysis"
import Form from "../icons/Form"
import Checkin from "../icons/Checkin"
import Pad from "../icons/Pad"
import Setting from "../icons/Setting"
import ChildMenuParent from './ChildMenuParent'
import message from '../i18n'

import {
  ListItem
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    marginLeft: 14,
    '& a.active > li': {
      backgroundColor: '#5295FF'
    }
  },
  node: {
    width: 42,
    height: 45,
    padding: 0,
    '& svg': {
      margin: 'auto'
    },
    '&:hover': {
      backgroundColor: 'rgba(82, 149, 255, 0.4)!important'
    }
  }
}))
export default () => {
  const classes = useStyles();
  let location = useLocation();
  const [pathname, setPathname] = React.useState(null)

  const routes = [
    {
      to: '/newui/medias',
      icon: <Analysis/>,
      name: '媒體'
    },
    {
      to: '/newui/programs',
      icon: <Form/>,
      name: '節目'
    },
    {
      name: '排程',
      icon: <Checkin/>,
      childs: [
        { value: '/newui/dailys', name: '單日節目表' },
        { value: '/newui/schedules', name: '排程' }
      ]
    },
    {
      name: '派送',
      icon: <Pad/>,
      childs: [
        { value: '/newui/dispatch', name: '派送' },
        { value: '/newui/status', name: '狀態' },
        { value: '/newui/history', name: '歷史' }
      ]
    },
    {
      to: '/newui/device',
      icon: <Setting/>,
      name: '設備'
    }
  ]
  React.useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  return (
    <div className={classes.root}>
      {
        routes.map(route =>
          route.childs && route.childs.length > 0
            ?
            <ChildMenuParent
              key={route.name}
              pathname={pathname}
              name={route.name}
              icon={route.icon}
              routes={route.childs}
            />
            :
            <NavLink key={route.to} to={route.to}>
              <ListItem className={classes.node}>
                {route.icon}
              </ListItem>
            </NavLink>
        )
      }
    </div>
  )
}