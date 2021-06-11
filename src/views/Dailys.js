import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getScList } from '../utils/apis'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import Actions from '../components/Actions'
import ConfirmDialog from '../components/ConfirmDialog'
import Dialog from '../components/material/Dialog'
import Cross from '../icons/Cross'
import Button from '../components/material/Button'
import PickDialog from '../components/PickDialog'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,

  CardContent,
  CardMedia,
  CircularProgress,
} from '@material-ui/core'
import { getPgLstByUdid } from '../utils/apis'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'

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
const DailyDetailDialog = props => {
  const {
    isDialogOpen,
    setDialogOpen
  } = props
  const classes = useStyles()
  const [programs, setPrograms] = React.useState([])
  const { sel_udid } = useSelector(state => state.user)
  React.useEffect(() => {

    getPgLstByUdid({ select_udid: sel_udid }).then(response => {
      convert.parseString(response.data, { explicitArray: false }, (err, result) => {
        if (!err) {
          if (result.root.pg_info === undefined) return setPrograms([])
          if (Object.keys(result.root.pg_info)[0] === '0') {
            setPrograms([...result.root.pg_info.map(program => ({ ...program }))])
          } else {
            setPrograms([{ ...result.root.pg_info }])
          }
        }
      })
    })
  }, [isDialogOpen])
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      fullScreen
      maxWidth="lg"
    >
      <DialogTitle>
        {''}
      </DialogTitle>
      <Cross style={{ position: 'absolute', right: '1.4rem', top: '1.4rem', cursor: 'pointer' }} onClick={() => setDialogOpen(false)} />
      <Divider />
      <DialogContent style={{ height: 700 }}>
        <div style={{ display: 'flex' }}>
          {
            programs.map(program =>
              <Card
                key={program.uuid}
                className={classes.card}
                style={{
                  width: 250,
                  backgroundColor: '#fff'
                }} >
                <div style={{
                  padding: '0 10px 0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1.2rem'
                }}>
                  {program.pgname}
                  <div style={{ flex: 1 }} />
                </div>
                <CardMedia
                  className={classes.media}
                  image={`${mf}${program.preview.split('mf')[1]}?t=${moment().unix()}`}
                />
                <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                  <div className={classes.spacer}></div>
                  {moment(program.utime).format('YYYY/MM/DD HH:mm')}
                </CardContent>
              </Card>
            )
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDialogOpen(false)}
          variant="contained"
          style={{ width: 100 }}>
          {'取消'}
        </Button>
        <Button
          onClick={() => setDialogOpen(false)}
          color='primary'
          variant="contained"
          style={{ width: 100, marginLeft: '1.4rem' }}>
          {'確認'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default () => {
  const classes = useStyles()
  const history = useHistory();
  const [dailys, setDailys] = React.useState([])

  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [selected, setSelected] = React.useState({})
  const { status } = useSelector(state => state.drawer)
  const { sel_udid } = useSelector(state => state.user)
  React.useEffect(() => {
    getScList({ sel_udid, sortType: 0 })
      .then((response) => {
        convert.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            var dailys = result.root.schedule.map(daily => daily.$)
            dailys = dailys.filter(daily => daily.scid !== "0")
            setDailys([...dailys])
          }
        })
      })
  }, [sel_udid])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          dailys && dailys.map((daily, key) =>
            <Card
              key={key}
              className={classes.card}
              onClick={() => history.push(`/newui/daily/${daily.scid}`)}
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
                {daily.scname}
                <div style={{ flex: 1 }} />
                <Actions items={[]} />
              </div>
              <CardMedia
                className={classes.media}
                image={`${psn}/images/icon-schedule.png`}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {moment(daily.utime).format('YYYY/MM/DD HH:mm')}
              </CardContent>
            </Card>
          )
        }
      </div>
      <DailyDetailDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  )
}