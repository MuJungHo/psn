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
    marginLeft: 5,
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
  const { locale } = useSelector(state => state.locale)
  const isComOwner = localStorage.getItem('rl') === '5000'

  const routes = [
    {
      to: '/dashboard',
      icon: <Analysis />,
      name: message(locale, 'siderAnalysis')
    },
    {
      name: message(locale, 'siderRegister'),
      icon: <Form />,
      childs: [
        { value: '/formlist', name: message(locale, 'siderForm') },
        { value: '/reviews', name: message(locale, 'siderReview') }
      ]
    },
    {
      to: '/visitors',
      icon: <Checkin />,
      name: message(locale, 'siderVisitor')
    },
    {
      name: message(locale, 'siderCheckin'),
      icon: <Pad />,
      childs: [
        { value: '/layout', name: message(locale, 'siderLayout') },
        { value: '/device', name: message(locale, 'siderDevice') }
      ]
    },
    {
      name: message(locale, 'siderSetting'),
      icon: <Setting />,
      childs: isComOwner
        ? [
          { value: '/departments', name: message(locale, 'siderDepartment') },
          { value: '/users', name: message(locale, 'siderUser') },
          { value: '/billing', name: message(locale, 'siderBilling') }
        ]
        : [
          { value: '/users', name: message(locale, 'siderUser') },
          { value: '/billing', name: message(locale, 'siderBilling') }
        ]
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