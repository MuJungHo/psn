import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getNsList, dispatchSch, getdplist, loadNs, getScList, saveNs } from '../utils/apis'
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
  const [schDialogOpen, setSchDialogOpen] = React.useState(false)
  const [selected, setSelected] = React.useState('')
  const [dailys, setDailys] = React.useState([])
  const [params, setParams] = React.useState({})
  const { status } = useSelector(state => state.drawer)
  const { sel_udid } = useSelector(state => state.user)
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  React.useEffect(() => {
    getNsList({ sel_udid, sortType: 0 })
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
  React.useEffect(() => {
    if (schDialogOpen) {
      getScList({ sel_udid, sortType: 0 })
        .then(resSch => {
          var tempDailys = []
          convert.parseString(resSch.data, { explicitArray: false }, (err, schResult) => {
            tempDailys = schResult.root.schedule.map(daily => daily.$).filter(daily => daily.scid !== "0")
            setDailys([...tempDailys])
          })
          loadNs({ sel_udid, nsid: selected })
            .then((response) => {
              convert.parseString(response.data, { explicitArray: false }, (err, result) => {
                if (!err) {
                  const defaultDaily = tempDailys.find(daily => daily.scname === result.root.default.$.def01)
                  setParams({
                    default: defaultDaily,
                    nschedule: { ...result.root.nschedule.$ }
                  })
                }
              })

            })
        })
    }
  }, [schDialogOpen])
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
  const handleLoadSch = (schedule) => {
    setSelected(schedule.nsid)
    setSchDialogOpen(true)
  }
  const handleSaveSch = () => {
    const defRec = [params.default.scid, null, null, null, null, null, null, null, null, null]
    // console.log(selected)
    saveNs({
      nsname: params.nschedule.nsname,
      nsid: selected,
      udid: sel_udid,
      scRec: JSON.stringify([]),
      defRec: JSON.stringify(defRec)
    }).then(() => setSchDialogOpen(false))
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
              onClick={() => handleLoadSch(schedule)}
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
        isDialogOpen={schDialogOpen}
        setDialogOpen={setSchDialogOpen}
        titleText={'設定預設節目表'}
        content={
          <>
            <Select
              input={<InputGray />}
              IconComponent={Arrow}
              value={params.default && params.default.scid || ''}
              onChange={e => setDevice(e.target.value)}
              displayEmpty
            >
              {console.log(params)}
              <MenuItem value=''>{'選擇單日節目表'}</MenuItem>
              {
                dailys.map(daily => <MenuItem value={daily.scid} key={daily.scname}>{daily.scname}</MenuItem>)
              }
            </Select>
          </>
        }
        confirmText={'確認'}
        confirm={handleSaveSch}
      />
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