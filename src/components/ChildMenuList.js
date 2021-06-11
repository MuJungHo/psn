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
    '& a.active > li': {
      backgroundColor: '#f31d65'
    }
  },
  node: {
    width: 100,
    height: 70,
    padding: 0,
    borderTop: '1px solid #393b4c',
    '& svg': {
      margin: 'auto'
    },
    '&:hover': {
      backgroundColor: 'rgba(243, 29, 101, 0.4)!important'
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
      to: '/newui/dispatch',
      name: '派送',
      icon: <Setting/>
    },
    {
      to: '/newui/devices',
      icon: <Pad/>,
      name: '設備'
    },
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