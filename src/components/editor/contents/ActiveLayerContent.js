import React from 'react'
import { v4 as uuid } from 'uuid'
import PickDialog from '../../PickDialog'
import ActionButton from '../../material/ActionButton'
import TextField from '../../material/TextField'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import ImageLayerContent from './ImageLayerContent'

const mf = process.env.REACT_APP_DOMAIN + '/mf'
// const ButtonLayerContent = props => {
//   const { activeLayer, layers, setLayers, program } = props
//   const btnMediaPath = activeLayer.btn_bg_mid === '0'
//     ? `${mf}/pg/temp/${program.tempFolderId}/${program.targetFolder}_${activeLayer.ptid}_0.png`
//     : `${mf}/_preview/${activeLayer.btn_bg_mname.split('.')[0]}.jpg`
//   const btnActivedMediaPath = activeLayer.btn_bg_mid === '0'
//     ? `${mf}/pg/temp/${program.tempFolderId}/${program.targetFolder}_${activeLayer.ptid}_1.png`
//     : `${mf}/_preview/${activeLayer.btn_bg_mname.split('.')[0]}.jpg`
//   return (
//     <>
//       {
//         activeLayer.layerInfos.map(layerInfo =>
//           <div key={layerInfo.uuid}>
//             <img src={btnMediaPath} style={{ height: 30 }} />
//             <img src={btnActivedMediaPath} style={{ height: 30 }} />
//           </div>)
//       }
//     </>
//   )
// }
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
  return (
    <>
      <ActionButton onClick={handleAddLayerInfo} >
        <Edit />
      </ActionButton>
      <input type="text" value={activeLayer.top} />
      <input type="text" value={activeLayer.left} />
      <input type="text" value={activeLayer.width} />
      <input type="text" value={activeLayer.height} />
      <PickDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        titleText={'pick media'}
        target="media"
        mtype="image"
        mutiple
        confirmText={'確認'}
        confirm={doAddLayerInfo}
      />

      {
        {
          'image': <ImageLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} />,
        }[activeLayer.mtype]
      }
    </>
  )
}