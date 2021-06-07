import React from 'react'
import { v4 as uuid } from 'uuid'
import PickDialog from '../../PickDialog'
import ActionButton from '../../material/ActionButton'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
const mf = process.env.REACT_APP_DOMAIN + '/mf'

export default props => {
    const { activeLayer, layers, setLayers } = props
    const [isDialogOpen, setDialogOpen] = React.useState(false)
    const handleUpdateLayer = (e, uuid) => {
      var updatedLayers = layers.map(layer => {
        return layer.ptid === activeLayer.ptid
          ? {
            ...layer,
            layerInfos: layer.layerInfos.map((infos, i) => {
              return infos.uuid == uuid
                ? { ...infos, t: e.target.value }
                : { ...infos }
            })
          }
          : { ...layer }
      })
      setLayers([...updatedLayers])
    }
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
            layerInfos: [ ...updatedLayerInfos ]
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
      <div>
        <ActionButton onClick={handleAddLayerInfo} >
          <Add />
        </ActionButton>
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
          activeLayer.layerInfos.map(layerInfo =>
            <div key={layerInfo.uuid}>
              <img src={`${mf}/_preview/${layerInfo.mname.split('.')[0]}.jpg`} style={{ height: 30 }} />
              {layerInfo.mtitle}
              {layerInfo.t}
              {/* <TextField
                key={layerInfo.uuid}
                type="text"
                variant="outlined"
                value={layerInfo.t || ''}
                onChange={e => handleUpdateLayer(e, layerInfo.uuid)}
              /> */}
  
              <ActionButton onClick={() => handleDeleteLayerInfo(layerInfo.uuid)} >
                <Delete />
              </ActionButton>
            </div>)
        }
      </div>
    )
  }
  