import React from 'react'
import { v4 as uuid } from 'uuid'
import PickDialog from '../../PickDialog'
import LayerDetailDialog from '../../editor/LayerDetailDialog'
import ActionButton from '../../material/ActionButton'
import TextField from '../../material/TextField'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import ImageLayerContent from './ImageLayerContent'
import VideoLayerContent from './VideoLayerContent'

const mf = process.env.REACT_APP_DOMAIN + '/mf'

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
    console.log(updatedLayer)
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
      <LayerDetailDialog
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