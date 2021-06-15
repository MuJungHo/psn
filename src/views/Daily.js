import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getScList } from '../utils/apis'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Actions from '../components/Actions'
import ConfirmDialog from '../components/ConfirmDialog'
import Dialog from '../components/material/Dialog'
import Cross from '../icons/Cross'
import Button from '../components/material/Button'
import PickDialog from '../components/PickDialog'
import { useDrag, useDrop } from "react-dnd";
import TextField from '../components/material/TextField'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,

  CardContent,
  CardMedia,
  CircularProgress,
} from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { getPgLstByUdid, loadSc, saveSc } from '../utils/apis'
import TimeLine from '../components/timeline/TimeLine'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
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
export default () => {
  const classes = useStyles()
  const history = useHistory();
  const [programs, setPrograms] = React.useState([])
  const [param, setParam] = React.useState({})
  const { sel_udid } = useSelector(state => state.user)
  const { scid } = useParams()
  const handleSaveDailySch = () => {
    const pgRec = param.programs.map(pg => [Number(pg.pgid), Number(pg.st), Number(pg.et)])
    saveSc({ scid, scname: param.name, udid: sel_udid, pgRec: JSON.stringify(pgRec) })
  }
  React.useEffect(() => {
    if (sel_udid) {
      loadSc({ scid }).then(scRes => {
        convert.parseString(scRes.data, { explicitArray: false }, (err, scResult) => {
          if (!err) {
            // console.log(scResult.root)
            if (scResult.root.program === undefined) return setParam({
              name: scResult.root.schedule.$.scname,
              programs: []
            })
            if (Object.keys(scResult.root.program)[0] === '0') {
              setParam({
                name: scResult.root.schedule.$.scname,
                programs: [...scResult.root.program.map(program => ({ ...program.$, uuid: uuid() }))]
              })
            } else {
              setParam({
                name: scResult.root.schedule.$.scname,
                programs: [{ ...scResult.root.program.$, uuid: uuid() }]
              })
            }
          }
        })
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
      })
    }
  }, [sel_udid])
  return (
    <div className={classes.root}>
      <Card >
        <CardContent style={{ padding: 20, display: 'flex' }}>
          <TextField
            type="text"
            variant="outlined"
            value={param.name || ''}
            onChange={e => setParam({
              ...param,
              name: e.target.value
            })}
          />
          <div className={classes.spacer} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveDailySch}>
            {'save'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push('/newui/dailys')}>
            {'back'}
          </Button>
        </CardContent>
      </Card>
      <div className={classes.container}>
        {
          // programs.map(program => <ProgramCard key={program.pgid} name={program.pgname} program={program} />)
        }
      </div>
      <TimeLine param={param} setParam={setParam} />
    </div>
  )
}