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
import { getPgLstByUdid, loadSc, saveSc, getscriptlist } from '../utils/apis'
import TimeLine from '../components/timeline/TimeLine'
import { getCookie } from '../utils/libs'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'
const assets = process.env.NODE_ENV === 'development' ? '/assets' : process.env.REACT_APP_ASSETS
const login_udid = getCookie('login_udid') || '1'

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
    flex: 1
  },
  card: {
    marginRight: 20,
    marginBottom: 20,
    width: 180,
    height: 150,
    padding: 10,
    cursor: 'pointer',
    backgroundColor: '#fff',
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
const ProgramCard = props => {
  const classes = useStyles()
  const { program } = props
  const [, drag] = useDrag({
    item: { type: "Card", ...program }
  });
  return <div className={classes.card} ref={drag}>
    {program.pgname}
    <img
      style={{ width: 100 }}
      src={`${mf}${program.preview.split('mf')[1]}`}
    />
    {moment(program.utime).format('YYYY/MM/DD HH:mm')}
  </div>
}
const FolderCard = props => {
  const classes = useStyles()
  const { folder, onClick } = props
  const [, drag] = useDrag({
    item: { type: "Card", ...folder }
  });
  return <div className={classes.card} ref={drag} onClick={onClick}>
    {'-'}
    <img
      style={{ width: 100 }}
      src={`${assets}/folder.svg`}
    />
    {'-'}
  </div>
}
export default () => {
  const classes = useStyles()
  const history = useHistory();
  const [programs, setPrograms] = React.useState([])
  const [folders, setFolders] = React.useState([])
  const [param, setParam] = React.useState({})
  const { sel_udid } = useSelector(state => state.user)
  const [parentFolder, setParentFolder] = React.useState([])
  const [select_scpid, setSelFolder] = React.useState('0')
  const { scid } = useParams()
  const handleSaveDailySch = () => {
    const pgRec = param.programs.map(pg => [Number(pg.pgid), Number(pg.st), Number(pg.et)])
    saveSc({ scid, scname: param.name, udid: sel_udid, pgRec: JSON.stringify(pgRec) })
  }
  
  const handleToLastFolder = () => {
    var tempParFolders = parentFolder
    var last = tempParFolders.pop()

    setParentFolder([...tempParFolders])
    setSelFolder(last)
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
      })
    }
  }, [sel_udid])

  React.useEffect(() => {
    if (sel_udid) {
      getscriptlist({ login_udid })
        .then(res => {
          convert.parseString(res.data, { explicitArray: false }, (err, scrResult) => {
            if (!err) {
              if (scrResult.root.department === undefined) return setFolders([])
              const tempDep = scrResult.root.department.find(dep => dep.$.udid === sel_udid)
              if (!tempDep.script) return setFolders([])
              var tempFolders = Object.keys(tempDep.script)[0] === '0'
                ? [...tempDep.script.map(folder => ({ ...folder.$ }))]
                : [{ ...tempDep.script.$ }]
              tempFolders = tempFolders.filter(folder => folder.par_foid === select_scpid)
              setFolders(tempFolders)
            }
          })
          getPgLstByUdid({ select_udid: sel_udid, select_scpid })
            .then(response => {
              convert.parseString(response.data, { explicitArray: false }, (err, result) => {
                if (!err) {
                  if (result.root.pg_info === undefined) return setPrograms([])
                  if (Object.keys(result.root.pg_info)[0] === '0') {
                    setPrograms([...result.root.pg_info])
                  } else {
                    setPrograms([{ ...result.root.pg_info }])
                  }
                }
              })
            })
        })
    }
  }, [sel_udid, select_scpid])
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
      <TimeLine param={param} setParam={setParam} />
      <div className={classes.container}>
        {
          select_scpid === '0'
            ? null
            :
            <div
              className={classes.card}
              onClick={handleToLastFolder}
            >
              {'-'}
              <img
                style={{ width: 100 }}
                src={`${assets}/folder-back.svg`}
              />
              {'-'}
            </div>
        }
        {
          folders && folders.map(folder =>
            <FolderCard key={folder.scpid} onClick={() => {
              setParentFolder([
                ...parentFolder,
                folder.par_foid])
              setSelFolder(folder.scpid)
            }} />
          )
        }
        {
          programs.map(program => <ProgramCard key={program.pgid} name={program.pgname} program={program} />)
        }
      </div>
    </div>
  )
}