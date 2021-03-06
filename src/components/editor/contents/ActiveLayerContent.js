import React from 'react'
import { v4 as uuid } from 'uuid'
import LayerDetail from '../LayerDetail'
import ActionButton from '../../material/ActionButton'
import TextField from '../../material/TextField'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import ImageLayerContent from './ImageLayerContent'
import VideoLayerContent from './VideoLayerContent'

const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'

export default props => {
  const { activeLayer, layers, setLayers, program, setActiveLayer } = props
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const handleAddLayerInfo = () => {
    setDialogOpen(true)
  }

  const handleUpdateLayerInfo = updatedLayer => {
    var updatedLayers = layers.map(layer => {
      return layer.ptid == updatedLayer.ptid
        ? { ...updatedLayer }
        : { ...layer }
    })
    setLayers([...updatedLayers])
    setActiveLayer({ ...updatedLayer })
  }
  return (
    <>
      <ActionButton onClick={handleAddLayerInfo} >
        <Edit />
      </ActionButton>
      <input type="text" value={activeLayer.top} onChange={() => { }} />
      <input type="text" value={activeLayer.left} onChange={() => { }} />
      <input type="text" value={activeLayer.width} onChange={() => { }} />
      <input type="text" value={activeLayer.height} onChange={() => { }} />
      <LayerDetail
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        confirmText={'確認'}
        activeLayer={activeLayer}
        confirm={handleUpdateLayerInfo}
      />

      {
        {
          'image': <ImageLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} />,
          'video': <VideoLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} />,
        }[activeLayer.mtype]
      }
    </>
  )
}