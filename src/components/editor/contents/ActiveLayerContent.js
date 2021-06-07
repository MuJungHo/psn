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

const mf = process.env.REACT_APP_DOMAIN + '/mf'

export default props => {
  const { activeLayer, layers, setLayers, program } = props
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const handleAddLayerInfo = () => {
    setDialogOpen(true)
  }
  const doAddLayerInfo = medias => {
    var newMediaInfos = medias.map(media => ({
      argv: "0",
      browser: "",
      filetype: "image",
      interaction_pt_name: "",
      isdefault: "",
      isenabled: "",
      margv: "",
      mdesc: "",
      mh: media.mh,
      mid: media.mid,
      mname: media.mname,
      mtitle: media.mtitle,
      mw: media.mw,
      odr: "1",
      player: "",
      plid: "0",
      plname: "",
      rpt: "1",
      scale: "",
      t: "90",
      thumbnail_mid: `../mf/_preview/${media.mname.split('.')[0]}.jpg`,
      uuid: uuid(),
      ytFlag: "",
    }))
    var updatedLayers = layers.map(layer => {
      var updatedLayerInfos = [
        ...layer.layerInfos,
        ...newMediaInfos
      ]
      return layer.ptid === activeLayer.ptid
        ? {
          ...layer,
          file: updatedLayerInfos.length > 0 ? updatedLayerInfos[0].mname : '',
          layerInfos: [...updatedLayerInfos]
        }
        : { ...layer }
    })
    setLayers([...updatedLayers])
  }
  const handleDeleteLayerInfo = (layerInfoUUID) => {
    var updatedLayers = layers.map(layer => {
      var updatedLayerInfos = layer.layerInfos.filter(layerInfo => layerInfo.uuid !== layerInfoUUID)
      return layer.ptid === activeLayer.ptid
        ? {
          ...layer,
          file: updatedLayerInfos.length > 0 ? updatedLayerInfos[0].mname : '',
          layerInfos: [...updatedLayerInfos]
        }
        : { ...layer }
    })
    setLayers([...updatedLayers])
  }
  const handleUpdateLayerInfo = updatedLayer => {
    var updatedLayers = layers.map(layer => {
      return layer.ptid === updatedLayer.ptid
        ? { ...updatedLayer }
        : { ...layer }
    })
    setLayers([...updatedLayers])
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
        }[activeLayer.mtype]
      }
    </>
  )
}