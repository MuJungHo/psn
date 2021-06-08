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
import FileCopyIcon from '@material-ui/icons/FileCopy';

const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'

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
const LayerTypePicker = props => {
  const { classes, layers, setLayers, zoom, setActiveLayer } = props
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
  const doAddLayer = mtype => {

    var ptids = layers.map(layer => Number(layer.ptid))
    var newPtid = ptids.length > 0 ? String(Math.max(...ptids) + 1) : '1'
    var newLayer = {
      ptid: newPtid,
      width: Math.round(100 * zoom),
      height: Math.round(100 * zoom),
      left: 0,
      top: 0,
      mtype,
      argv: '0',
      file: '',
      layerInfos: []
    }
    setLayers([
      ...layers,
      { ...newLayer }
    ])
    setActiveLayer({ ...newLayer })
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
  setContent,
  setActiveLayer
}) => {
  const history = useHistory();
  const classes = useStyles()
  const { status } = useSelector(state => state.drawer)
  const disabled = JSON.stringify(activeLayer) === '{}'
  const handleAddLayer = () => {
    setContent(<LayerTypePicker classes={classes} layers={layers} setLayers={setLayers} zoom={zoom} setActiveLayer={setActiveLayer} />)
  }
  const handleDeleteLayer = () => {
    var tempLayers = layers.filter(layer => layer.ptid !== activeLayer.ptid)
    setLayers([
      ...tempLayers
    ])
  }
  const handleDuplicateLayer = () => {
    var ptids = layers.map(layer => Number(layer.ptid))
    var newPtid = String(Math.max(...ptids) + 1)
    var newLayer = { ...activeLayer, ptid: newPtid }
    setLayers([
      ...layers,
      { ...newLayer }
    ])
    setActiveLayer({ ...newLayer })
  }
  return (
    <div style={{ height: 60, backgroundColor: '#FFF', display: 'flex', alignItems: 'center', ...style }}>
      <Button
        onClick={handleAddLayer}
        variant="contained"
        color="primary">
        <Add />
        {'新增區塊'}
      </Button>
      <ActionButton onClick={handleDeleteLayer} disabled={disabled} style={{ fill: disabled ? '#bebebe' : '#5295FF' }}>
        <Delete />
      </ActionButton>
      <ActionButton onClick={handleDuplicateLayer} disabled={disabled} style={{ fill: disabled ? '#bebebe' : '#5295FF' }}>
        <FileCopyIcon />
      </ActionButton>
    </div>
  )
}