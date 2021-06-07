import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getmedialist } from '../utils/apis'
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
  const [medias, setMedias] = React.useState([])
  const { status } = useSelector(state => state.drawer)
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  React.useEffect(() => {
    getmedialist({ udid: 1, foid: 0, mtype: '' })
      .then((response) => {
        convert.parseString(response.data, { explicitArray: false }, (err, result) => {
          if (!err) {
            if (result.root.media_info === undefined) return setMedias([])
            if (Object.keys(result.root.media_info)[0] === '0') {
              setMedias([...result.root.media_info])
            } else {
              setMedias([{ ...result.root.media_info }])
            }
          }
        })
      })
  }, [])
  const getMediaPath = media => {
    if (media.mtype === 'image') return `${mf}/_preview/${media.mname.split('.')[0]}.jpg?t=${moment().unix()}`
    if (media.mtype === 'video') return `${mf}/_preview/${media.mname.split('.')[0]}.jpg?t=${moment().unix()}`
    if (media.mtype === 'board') return `${psn}/images/preview/${media.mtype}.png`
    if (media.mtype === 'stxt') return `${psn}/images/preview/ticker.png`
    return `${psn}/images/preview/ext-${media.mtype}.png`
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          medias && medias.map((media, key) =>
            <Card
              key={key}
              className={classes.card}
              style={{
                width: status ? '15.1%': '12.7%'
              }}
            >
              <div style={{
                padding: '0 10px 0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}>
                {media.mtitle}
                <div style={{ flex: 1 }} />
                <Actions items={[]} />
              </div>
              <CardMedia
                className={classes.media}
                image={getMediaPath(media)}
              />
              <CardContent style={{ padding: '.8rem 8px', display: 'flex' }}>
                <div className={classes.spacer}></div>
                {moment(media.utime).format('YYYY/MM/DD HH:mm')}
              </CardContent>
            </Card>
          )
        }
      </div>
    </div>
  )
}