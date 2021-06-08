import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { setDrawerStatus } from '../actions/drawer'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import RouteList from './RouteList'
import ChildMenuList from './ChildMenuList'
import Select from '../components/material/Select'
import InputGray from '../components/material/InputGray'
import Arrow from "../icons/Arrow"
import {
  MenuItem,
} from '@material-ui/core'
import { getCookie } from '../utils/libs'
import { getscriptlist } from '../utils/apis'
import convert from 'xml2js'
import { updateUserSelUdid } from '../actions/user'

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 100 + 1,
    // [theme.breakpoints.up('sm')]: {
    //   width: theme.spacing(9) + 1,
    // },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    background: '#222538'
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.drawer)
  const { sel_udid } = useSelector(state => state.user)
  const assets = process.env.REACT_APP_ASSETS
  const login_udid = getCookie('login_udid') || '1'
  const [stores, setStores] = React.useState([])
  const brand = login_udid
  const handleChangeSelUdid = e => {
    dispatch(updateUserSelUdid(e.target.value))
  }
  React.useEffect(() => {
    getscriptlist({ login_udid, flag: 0 })
      .then(response =>
        convert.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            var departments = [...result.root.department]
              .map(dep => ({
                udid: dep.$.udid,
                udname: dep.$.udname
              }))
              .filter(dep => dep.udid !== '-1')
            var defaultUd = departments.find(dep => dep.udname === 'Public') || { udid: '1', udname: 'admin' }
            var defaultUdid = defaultUd.udid

            setStores([...departments])
            dispatch(updateUserSelUdid(defaultUdid))

          }
        }))
  }, [])
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: status,
          [classes.drawerClose]: !status,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: status,
            [classes.drawerClose]: !status,
          }),
        }}
      >
        {
          status
            ? <img src={`${assets}/logo.png`} style={{ height: 20, margin: 'auto', marginTop: 30, marginBottom: 30 }} />
            : <img src={`${assets}/SV.svg`} style={{ height: 32, margin: '24px auto' }} />
        }
        <Divider style={{ background: '#393b4c' }} />
        <p style={{ color: '#a0a4ad', paddingLeft: 20, marginTop: 20 }}>{`品牌ID: ${brand}`}</p>
        <Select
          input={<InputGray />}
          IconComponent={Arrow}
          value={sel_udid}
          onChange={handleChangeSelUdid}
          style={{ margin: 20 }}
        >
          {
            stores.map(store => <MenuItem value={store.udid} key={store.udid}>{store.udname}</MenuItem>)
          }
        </Select>
        {status ? <RouteList /> : <ChildMenuList />}
      </Drawer>
    </div>
  );
}