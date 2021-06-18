import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getPgLstByUdid, delpg, getscriptlist } from '../utils/apis'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import Actions from '../components/Actions'
import Add from '@material-ui/icons/Add'
import {
  CardContent,
  CardMedia,
} from '@material-ui/core'

import ConfirmDialog from '../components/ConfirmDialog'
import Select from '../components/Select'
import { getCookie } from '../utils/libs'
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
    backgroundSize: 'contain',
  },
  container: {
    display: 'flex',
    paddingTop: '1.5rem',
    flexWrap: 'wrap',
    paddingLeft: 20
  },
  card: {
    marginRight: 20,
    marginBottom: 20,
    height: 'auto',
    cursor: 'pointer',
    width: 'calc((100% - 120px) / 6)',
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

const programTypes = [
  { value: 'windows', name: 'Windows' },
  { value: 'android', name: 'Android' },
]
export default () => {
  const classes = useStyles()
  const history = useHistory();
  const [parentFolder, setParentFolder] = React.useState([])
  const [select_scpid, setSelFolder] = React.useState('0')
  const [folders, setFolders] = React.useState([])
  const [programs, setPrograms] = React.useState([])
  const [selected, setSelected] = React.useState({})
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [filters, setFilters] = React.useState({
    ios: ''
  })
  const { status } = useSelector(state => state.drawer)
  const { sel_udid } = useSelector(state => state.user)
  const uid = getCookie('login_uid') || 1
  const login_udid = getCookie('login_udid') || '1'
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const assets = process.env.REACT_APP_ASSETS
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  React.useEffect(() => {
    if (sel_udid) {
      getscriptlist({ login_udid })
        .then(res => {
          convert.parseString(res.data, { explicitArray: false }, (err, scrResult) => {
            if (!err) {
              const tempDep = scrResult.root.department.find(dep => dep.$.udid === sel_udid)
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
  const handleDeleteProgram = program => {
    setDeleteDialogOpen(true)
    setSelected({ ...program })
  }
  const doDeleteProgram = () => {
    delpg({ sel_udid, uid, PgidList: selected.pgid })
      .then(() => {
        getPgLstByUdid({ select_udid: sel_udid }).then(response => {
          setDeleteDialogOpen(false)
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

  const handleToLastFolder = () => {
    var tempParFolders = parentFolder
    var last = tempParFolders.pop()

    setParentFolder([...tempParFolders])
    setSelFolder(last)
  }
  return (
    <div className={classes.root}>
      <Card >
        <CardContent style={{ padding: 20, display: 'flex' }}>
          <Select
            value={filters.ios}
            onChange={e => setFilters({ ...filters, ios: e.target.value })}
            emptyText={'全部節目種類'}
            options={programTypes}
            val="value"
            name="name"
          />
          <div className={classes.spacer} />
          <Actions items={[
            { name: 'Windows', onClick: () => history.push(`/newui/program/0`) },
            { name: 'Android', onClick: () => { } },
          ]} btnText={'新增節目'} btnIcon={<Add />} />
        </CardContent>
      </Card>
      <div style={{ marginLeft: 20, marginTop: 20, height: 20 }}>{parentFolder.join('>')}</div>
      <div className={classes.container}>

        {
          select_scpid === '0'
            ? null
            :
            <Card
              className={classes.card}
              style={{
                width: status ? '15.1%' : '12.7%'
              }}
              onClick={handleToLastFolder}
            >
              <div style={{
                padding: '0 10px 0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}>
                {'-'}
                <div style={{ flex: 1 }} />
                <Actions items={[]} />
              </div>
              <CardMedia
                className={classes.media}
                image={`../assets/folder-back.svg`}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {'-'}
              </CardContent>
            </Card>
        }
        {
          folders && folders.map(folder =>
            <Card
              key={folder.scpid}
              className={classes.card}
              style={{
                width: status ? '15.1%' : '12.7%'
              }}
              onClick={() => {
                setParentFolder([
                  ...parentFolder,
                  folder.par_foid])
                setSelFolder(folder.scpid)
              }}
            >
              <div style={{
                padding: '0 10px 0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}>
                {folder.scpname}
                <div style={{ flex: 1 }} />
                <Actions items={[]} />
              </div>
              <CardMedia
                className={classes.media}
                image={`../assets/folder.svg`}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {'-'}
              </CardContent>
            </Card>
          )
        }
        {
          programs && programs.map((program, key) =>
            <Card
              key={key}
              className={classes.card}
              style={{
                width: status ? '15.1%' : '12.7%'
              }}
              onClick={() => history.push(`/newui/program/${program.pgid}`)}
            >
              <div style={{
                padding: '0 10px 0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}>
                {program.pgname}
                <div style={{ flex: 1 }} />
                <Actions items={[
                  { name: '刪除', onClick: () => handleDeleteProgram(program) },
                ]} />
              </div>
              <CardMedia
                className={classes.media}
                image={`${mf}${program.preview.split('mf')[1]}`}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {moment(program.utime).format('YYYY/MM/DD HH:mm')}
              </CardContent>
            </Card>
          )
        }
      </div>

      <ConfirmDialog
        isDialogOpen={isDeleteDialogOpen}
        setDialogOpen={setDeleteDialogOpen}
        titleText={'刪除節目'}
        content={`確認刪除${selected.pgname}嗎`}
        confirmText={'刪除'}
        confirm={doDeleteProgram}
        warning
      />
    </div>
  )
}