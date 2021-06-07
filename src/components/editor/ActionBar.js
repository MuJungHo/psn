import React from 'react'
import Button from '../material/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '../material/TextField'
import ActionButton from '../material/ActionButton'
import Card from '../material/Card'
import { useHistory } from "react-router-dom"
import {
  CardContent,
  CardMedia,
  CircularProgress,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    padding: '0 20px',
    boxShadow: 'none'
  },
  media: {
    height: '100%',
    backgroundPosition: 'center top',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'

  },
  container: {
    display: 'flex',
    paddingTop: '1.5rem',
    flexWrap: 'wrap'
  },
  card: {
    marginBottom: 20,
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 3px 8px 0 rgba(141, 152, 170, .7)',
    },
  },
  spacer: {
    flex: 1
  }
})
const LayerPicker = props => {
  const { classes, layers, setLayers, zoom } = props
  const layerTypes = [
    { image: 'pix', mtype: 'image' },
    { image: 'film', mtype: 'video' },
    { image: 'stream', mtype: 'stream' },
    { image: 'ie', mtype: 'url' },
    { image: 'clock', mtype: 'time' },
    { image: 'pdf', mtype: 'pdf' },
    { image: 'ppt', mtype: 'ppt' },
    { image: 'youtube', mtype: 'youtube' }
  ]
  const psn = process.env.REACT_APP_DOMAIN + '/psn'
  const doAddLayer = mtype => {

    var ptids = layers.map(layer => Number(layer.ptid))
    var newPtid = Math.max(...ptids) + 1
    setLayers([
      ...layers,
      {
        ptid: newPtid,
        width: 100 * zoom,
        height: 100 * zoom,
        left: 0,
        top: 0,
        mtype,
        layerInfos: []
      }
    ])
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          layerTypes.map(layer =>
            <Card
              key={layer.mtype}
              className={classes.card}
              style={{ width: 100, height: 100, background: '#bebebe', margin: 'auto', marginBottom: 20 }}
              onClick={() => doAddLayer(layer.mtype)}
            >
              <CardMedia
                className={classes.media}
                image={`${psn}/images/module/ico-${layer.image}.svg`}
              />
            </Card>
          )
        }
      </div>
    </div>
  )
}
export default ({
  style,
  zoom,
  setLayers,
  layers,
  activeLayer,
  setContent
}) => {
  const history = useHistory();
  const classes = useStyles()
  const { status } = useSelector(state => state.drawer)
  const handleAddLayer = () => {
    setContent(<LayerPicker classes={classes} layers={layers} setLayers={setLayers} zoom={zoom} />)
  }
  const handleDeleteLayer = () => {
    var tempLayers = layers.filter(layer => layer.ptid !== activeLayer.ptid)
    setLayers([
      ...tempLayers
    ])
  }
  return (
    <div style={{ height: 60, backgroundColor: '#FFF', ...style }}>
      <ActionButton onClick={handleAddLayer} >
        <Add />
      </ActionButton>
      <ActionButton onClick={handleDeleteLayer} >
        <Delete />
      </ActionButton>
    </div>
  )
}