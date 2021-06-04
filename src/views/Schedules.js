import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getNsList, dispatchSch, getdplist } from '../utils/apis'
import Select from '../components/material/Select'
import InputGray from '../components/material/InputGray'
import Arrow from "../icons/Arrow"
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import Actions from '../components/Actions'
import {
  CardContent,
  CardMedia,
  MenuItem,
} from '@material-ui/core'

import ConfirmDialog from '../components/ConfirmDialog'
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { DatePicker } from 'rsuite'
const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
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
    display: 'flex',
    paddingTop: '1.5rem',
    flexWrap: 'wrap'
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
export default () => {
  const classes = useStyles()
  const history = useHistory();
  const [schedule, setSchedule] = React.useState('')
  const [schedules, setSchedules] = React.useState([])
  const [devices, setDevices] = React.useState([])
  const [device, setDevice] = React.useState('')
  const [dispatchTime, setDispatchTime] = React.useState(0)
  const [dispatchDate, setDispatchDate] = React.useState(new Date())
  const [dispatchDialogOpen, setDispatchDialogOpen] = React.useState(false)
  const { status } = useSelector(state => state.drawer)
  const mf = process.env.REACT_APP_DOMAIN + '/mf'
  const psn = process.env.REACT_APP_DOMAIN + '/psn'
  React.useEffect(() => {
    getNsList({ sel_udid: 1, sortType: 0 })
      .then((response) => {
        convert.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            var schedules = result.root.nschedule.map(schedule => schedule.$)
            setSchedules([...schedules])
          }
        })
        getdplist()
          .then(response => {
            convert.parseString(response.data, { explicitArray: false }, (err, result) => {
              if (!err) {
                var tempDevices = result.root.dp_info.map(dp => ({ dpid: dp.dpid, dpname: dp.dpname }))
                setDevices([...tempDevices])
              }
            })
          })
      })
  }, [])
  
  const handleSetDispatchDialogOpen = (sch) => {
    setSchedule(sch)
    setDispatchDialogOpen(true)
  }
  const handleDispatch = () => {
    var date = moment(dispatchDate).format('YYYYMMDD')
    var time = moment(dispatchTime).format('HHmm')
    dispatchSch({ dph_time: `${date}${time}`, start_time: '000101010000', dplst: device, uid: 1, nsid: schedule })
      .then(res => console.log(res))
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          schedules && schedules.map((schedule, key) =>
            <Card
              key={key}
              className={classes.card}
              style={{
                width: status ? '15.1%' : '12.7%'
              }}
            >
              <div style={{
                padding: '0 10px 0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}>
                {schedule.nsname}
                <div style={{ flex: 1 }} />
                <Actions items={[
                  { icon: <AddToQueueIcon />, name: '派送', onClick: () => handleSetDispatchDialogOpen(schedule.nsid) }]} />
              </div>
              <CardMedia
                className={classes.media}
                image={`${psn}/images/icon-net-schedule.png`}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {moment(schedule.utime).format('YYYY/MM/DD HH:mm')}
              </CardContent>
            </Card>
          )
        }
      </div>
      <ConfirmDialog
        isDialogOpen={dispatchDialogOpen}
        setDialogOpen={setDispatchDialogOpen}
        titleText={'派送排程'}
        content={
          <>
            <Select
              input={<InputGray />}
              IconComponent={Arrow}
              value={device}
              onChange={e => setDevice(e.target.value)}
              displayEmpty
            >
              <MenuItem value=''>{'選擇播放器'}</MenuItem>
              {
                devices.map(device => <MenuItem value={device.dpid} key={device.dpid}>{device.dpname}</MenuItem>)
              }
            </Select>
            <DatePicker value={dispatchDate} format="YYYY-MM-DD" onChange={e => setDispatchDate(e)} />
            <DatePicker format="HH:mm" onChange={e => setDispatchTime(e)} />
          </>
        }
        confirmText={'確認'}
        confirm={handleDispatch}
      />
    </div>
  )
}