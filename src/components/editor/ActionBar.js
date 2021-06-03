import React from 'react'
import Button from '../material/Button'
import TextField from '../material/TextField'
import ActionButton from '../material/ActionButton'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
export default ({
  style,
  zoom,
  setLayers,
  layers,
  activeLayer,
}) => {
  const history = useHistory();
  const { status } = useSelector(state => state.drawer)
  const handleAddLayer = () => {

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
        mtype: 'image',
        layerInfos: []
      }
    ])
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