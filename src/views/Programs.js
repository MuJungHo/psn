import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getPgLstByUdid } from '../utils/apis'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import Actions from '../components/Actions'
import Add from '@material-ui/icons/Add'
import {
  CardContent,
  CardMedia,
  CircularProgress,
  MenuItem,
  Divider,
} from '@material-ui/core'

import Select from '../components/material/Select'
import InputGray from '../components/material/InputGray'
import Arrow from "../icons/Arrow"
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
  const [programs, setPrograms] = React.useState([])
  const [filters, setFilters] = React.useState({
    ios: ''
  })
  const { status } = useSelector(state => state.drawer)
  const { sel_udid } = useSelector(state => state.user)
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  React.useEffect(() => {
    if (sel_udid) {
      getPgLstByUdid({ select_udid: sel_udid }).then(response => {
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
    }
  }, [sel_udid])
  return (
    <div className={classes.root}>
      <Card >
        <CardContent style={{ padding: 20, display: 'flex' }}>
          <Select
            input={<InputGray />}
            IconComponent={Arrow}
            value={filters.ios}
            onChange={e => setFilters({ ...filters, ios: e.target.value })}
            displayEmpty
          >
            <MenuItem value={''} >{'全部節目種類'}</MenuItem>
            {
              programTypes.map(pgType => <MenuItem value={pgType.value} key={pgType.value}>{pgType.name}</MenuItem>)
            }
          </Select>
          <div className={classes.spacer} />
          <Actions items={[
            { name: 'Windows', onClick: () => history.push(`/newui/program/0`) },
            { name: 'Android', onClick: () => { } },
          ]} btnText={'新增節目'} btnIcon={<Add />} />
        </CardContent>
      </Card>
      <div className={classes.container}>
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
                <Actions items={[]} />
              </div>
              <CardMedia
                className={classes.media}
                image={`${mf}${program.preview.split('mf')[1]}?t=${moment().unix()}`}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {/* {message(locale, 'lastModifyTime')}&nbsp; */}
                {moment(program.utime).format('YYYY/MM/DD HH:mm')}
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>
  )
}