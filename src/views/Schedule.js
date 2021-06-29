import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import convert from 'xml2js'
import moment from 'moment'
import Paper from '../components/material/Paper'
import Dialog from '../components/material/Dialog'
import Calendar from '../components/calendar/Calendar'
import Button from '../components/material/Button'
import Card from '../components/material/Card'
import {
  CardContent,
} from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { loadNs, saveNs, getScList } from '../utils/apis'
import { useDrag, useDrop } from "react-dnd";

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
    marginRight: 20,
    marginBottom: 20,
    width: 100,
    height: 100,
    padding: 10,
    cursor: 'pointer',
    backgroundColor: '#eff8ff',
    borderRadius: 5,
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

const DailyCard = props => {
  const classes = useStyles()
  const { daily } = props
  const [, drag] = useDrag({
    item: { type: "Card", ...daily }
  });
  return <div className={classes.card} ref={drag}>
    {daily.scname}
    <img
      style={{ width: 50 }}
      src={`${psn}/images/icon-schedule.png`}
    />
  </div>
}

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const { sel_udid } = useSelector(state => state.user)
  const { nsid } = useParams()
  const [param, setParam] = React.useState({})
  const [dailys, setDailys] = React.useState([])
  const [isDialogOpen, setDialogOpen] = React.useState(true)
  const pickDateRange = range => {
    console.log(range)
  }

  React.useEffect(() => {
    if (sel_udid) {
      loadNs({ nsid }).then(scRes => {
        convert.parseString(scRes.data, { explicitArray: false }, (err, scResult) => {
          if (!err) {
            if (scResult.root.schedule === undefined) return setParam({
              name: scResult.root.nschedule.$.nsname,
              default: { ...scResult.root.default.$ },
              schedules: []
            })
            if (scResult.root.schedule && Object.keys(scResult.root.schedule)[0] === '0') {
              setParam({
                name: scResult.root.nschedule.$.nsname,
                default: { ...scResult.root.default.$ },
                schedules: [...scResult.root.schedule.map(schedule => ({ ...schedule.$, uuid: uuid() }))]
              })
            } else {
              setParam({
                name: scResult.root.nschedule.$.nsname,
                default: { ...scResult.root.default.$ },
                schedules: [{ ...scResult.root.schedule.$, uuid: uuid() }]
              })
            }
          }
        })
      })
      getScList({ sel_udid, sortType: 0 })
        .then((response) => {
          convert.parseString(response.data, { explicitArray: false }, (err, result) => {
            if (!err) {
              var tempDailys = []
              if (result.root.schedule === undefined) return tempDailys = []
              if (Object.keys(result.root.schedule)[0] === '0') {
                tempDailys = [...result.root.schedule.map(daily => ({ ...daily.$ }))]
              } else {
                tempDailys = [{ ...result.root.schedule.$ }]
              }
              tempDailys = tempDailys.filter(daily => daily.scid !== "0")
              setDailys([...tempDailys])
            }
          })
        })
    }
  }, [sel_udid])
  return (
    <div className={classes.root}>
      <Card style={{ height: '100%' }}>
        <CardContent style={{ padding: 20, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/newui/schedules')}
            >
              {'返回'}
            </Button>
          </div>
          <div style={{ display: 'flex' }}>
            {
              dailys.map(daily => <DailyCard key={daily.scid} daily={daily} />)
            }
          </div>
          <Calendar pickDateRange={pickDateRange} />
        </CardContent>
      </Card>
    </div>)
}