import React from 'react'
import convert from 'xml2js'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Paper from '../components/material/Paper'
import { getDpDetail, screen_download, getDpSoftware, getDpHardware, GetRecentClientLog } from '../utils/apis'
import { getCookie } from '../utils/libs'
import {
  Tab,
  Tabs,
  Divider,
} from '@material-ui/core'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 20
  },
  action: {
    marginTop: 0,
    marginRight: 0
  },
  title: {
    fontSize: '1.2rem'
  },
  media: {
    height: '12vh',
    margin: '0 20px',
    backgroundPosition: 'center top',
    backgroundSize: 'contain'

  },
  container: {
    padding: 20,
    display: 'flex',
    flex: 1,
    position: 'fixed'
  },
  card: {
    marginRight: '1.5%',
    marginBottom: 20,
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 3px 8px 0 rgba(141, 152, 170, .7)',
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '0 24px',
    // '& > *:nth-child(2)': {
    //   width: 250
    // }
  },
  spacer: {
    flex: 1
  }
})
const DeviceInfomation = () => {
  return (
    <>
      設備資訊
    </>
  )
}
const DeviceSnapshot = () => {
  return (
    <>
      設備快照
    </>
  )
}
const DeviceHardwareStatus = () => {
  return (
    <>
      硬體狀態
    </>
  )
}
const DeviceSoftwareStatus = () => {
  return (
    <>
      軟體狀態
    </>
  )
}
const DeviceLog = () => {
  return (
    <>
      設備日誌
    </>
  )
}
export default () => {
  const classes = useStyles();
  const { dpid } = useParams()
  const login_udid = getCookie('login_udid') || '1'
  const [tab, setTab] = React.useState(0)
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  React.useEffect(() => {
    if (tab === 0) {
      getDpDetail({ login_udid, dpid })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            console.log(result)
          })
        })
    } else if (tab === 1) {
      screen_download({ dpid })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            console.log(result)
          })
        })
    } else if (tab === 2) {
      getDpHardware({ login_udid, dpid })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            console.log(result)
          })
        })
    } else if (tab === 3) {
      getDpSoftware({ login_udid, dpid })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            console.log(result)
          })
        })
    } else {
      GetRecentClientLog({ dpid })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            console.log(result)
          })
        })
    }
  }, [tab])
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="設備資訊" />
          <Tab label="設備快照" />
          <Tab label="硬體狀態" />
          <Tab label="軟體狀態" />
          <Tab label="設備日誌" />
        </Tabs>
        <Divider />
        {
          {
            0: <DeviceInfomation />,
            1: <DeviceSnapshot />,
            2: <DeviceHardwareStatus />,
            3: <DeviceSoftwareStatus />,
            4: <DeviceLog />,
          }[tab]
        }
      </Paper>
    </div>
  )
}