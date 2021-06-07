import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getPgLstByUdid } from '../utils/apis'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import Actions from '../components/Actions'

import {
  CardContent,
  CardMedia,
  CircularProgress,
} from '@material-ui/core'
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
  const [programs, setPrograms] = React.useState([])
  const { status } = useSelector(state => state.drawer)
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  React.useEffect(() => {
    getPgLstByUdid({}).then(response => {
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
  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          programs && programs.map((program, key) =>
            <Card
              key={key}
              className={classes.card}
              style={{
                width: status ? '15.1%': '12.7%'
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