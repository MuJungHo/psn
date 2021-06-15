import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '../components/material/Card'
import convert from 'xml2js'
import moment from 'moment'
import { getmedialist } from '../utils/apis'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import Actions from '../components/Actions'
import Add from '@material-ui/icons/Add'
import {
  CardContent,
  CardMedia,
  Divider,
} from '@material-ui/core'

import Select from '../components/Select'
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
const mediaTypes = [
  { value: 'image', name: '圖片' },
  { value: 'video', name: '影片' },
]
export default () => {
  const classes = useStyles()
  const history = useHistory();
  const [medias, setMedias] = React.useState([])
  const [filters, setFilters] = React.useState({
    mtype: ''
  })
  const { status } = useSelector(state => state.drawer)
  const { sel_udid } = useSelector(state => state.user)
  const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
  const psn = baseURL + '/psn'
  const mf = baseURL + '/mf'
  React.useEffect(() => {
    if (sel_udid) {
      getmedialist({ udid: sel_udid, foid: 0, ...filters })
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
    }
  }, [sel_udid, filters])
  const getMediaPath = media => {
    if (media.mtype === 'image') return `${mf}/_preview/${media.mname.split('.')[0]}.jpg?t=${moment().unix()}`
    if (media.mtype === 'video') return `${mf}/_preview/${media.mname.split('.')[0]}.jpg?t=${moment().unix()}`
    if (media.mtype === 'board') return `${psn}/images/preview/${media.mtype}.png`
    if (media.mtype === 'stxt') return `${psn}/images/preview/ticker.png`
    return `${psn}/images/preview/ext-${media.mtype}.png`
  }
  return (
    <div className={classes.root}>
      <Card >
        <CardContent style={{ padding: 20, display: 'flex' }}>
          <Select
            value={filters.mtype}
            onChange={e => setFilters({ ...filters, mtype: e.target.value })}
            emptyText={'全部媒體種類'}
            options={mediaTypes}
            val="value"
            name="name"
          />
          <div className={classes.spacer} />
          <Actions items={[
            { name: '上傳檔案', onClick: () => { } },
            { name: '布告欄', onClick: () => { } },
            { name: '跑馬燈', onClick: () => { } },
            { name: 'HTML', onClick: () => { } },
          ]} btnText={'新增媒體'} btnIcon={<Add />} />
        </CardContent>
      </Card>
      <Divider />
      <div className={classes.container}>
        {
          medias && medias.map((media, key) =>
            <Card
              key={key}
              className={classes.card}
            >
              <div style={{
                padding: '0 10px 0 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}>
                {media.mtitle}
                <div style={{ flex: 1 }} />
                <Actions items={[
                ]} />
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