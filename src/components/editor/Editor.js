import React from 'react'
import Monitor from './Monitor'
import ToolBar from './ToolBar'
import ActionBar from './ActionBar'
import Button from '../material/Button'
import TextField from '../material/TextField'
import ActionButton from '../material/ActionButton'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import { useHistory } from "react-router-dom"
import { Backdrop, CircularProgress } from '@material-ui/core';
import { v4 as uuid } from 'uuid'

const mf = process.env.REACT_APP_MEDIA_PATH
const ProgramContent = props => {
  const { program, setProgram } = props
  return (
    <div>
      <TextField
        type="text"
        variant="outlined"
        value={program.pgname || ''}
        onChange={e => setProgram({
          ...program,
          pgname: e.target.value
        })}
      />
      <TextField
        type="text"
        variant="outlined"
        value={program.bgcolor || ''}
        onChange={e => setProgram({
          ...program,
          bgcolor: e.target.value
        })}
      />
    </div>
  )
}
const ButtonLayerContent = props => {
  const { activeLayer, layers, setLayers, program } = props
  const btnMediaPath = activeLayer.btn_bg_mid === '0'
    ? `${mf}/pg/temp/${program.tempFolderId}/${program.targetFolder}_${activeLayer.ptid}_0.png`
    : `${mf}/_preview/${activeLayer.btn_bg_mname.split('.')[0]}.jpg`
  const btnActivedMediaPath = activeLayer.btn_bg_mid === '0'
    ? `${mf}/pg/temp/${program.tempFolderId}/${program.targetFolder}_${activeLayer.ptid}_1.png`
    : `${mf}/_preview/${activeLayer.btn_bg_mname.split('.')[0]}.jpg`
  return (
    <>
      {
        activeLayer.layerInfos.map(layerInfo =>
          <div key={layerInfo.uuid}>
            <img src={btnMediaPath} style={{ height: 30 }} />
            <img src={btnActivedMediaPath} style={{ height: 30 }} />
            {/* <TextField
            key={layerInfo.uuid}
            type="text"
            variant="outlined"
            value={layerInfo.t || ''}
            onChange={e => handleUpdateLayer(e, layerInfo.uuid)}
          /> */}
          </div>)
      }
    </>
  )
}
const ImageLayerContent = props => {
  const { activeLayer, layers, setLayers } = props
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
    var updatedLayers = layers.map(layer => {
      return layer.ptid === activeLayer.ptid
        ? {
          ...layer,
          layerInfos: [...layer.layerInfos, {
            argv: "0",
            browser: "",
            filetype: "image",
            interaction_pt_name: "",
            isdefault: "",
            isenabled: "",
            margv: "",
            mdesc: "",
            mh: "1280",
            mid: "2",
            mname: "00000002.jpg",
            mtitle: "198964",
            mw: "1026",
            odr: "1",
            player: "",
            plid: "0",
            plname: "",
            rpt: "1",
            scale: "",
            t: "90",
            thumbnail_mid: "",
            uuid: uuid(),
            ytFlag: "",
          }]
        }
        : { ...layer }
    })
    setLayers([...updatedLayers])
  }
  const handleDeleteLayerInfo = (layerInfoUUID) => {
    var updatedLayers = layers.map(layer => {
      return layer.ptid === activeLayer.ptid
        ? {
          ...layer,
          layerInfos: layer.layerInfos.filter(layerInfo => layerInfo.uuid !== layerInfoUUID)
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
      {
        activeLayer.layerInfos.map(layerInfo =>
          <div key={layerInfo.uuid}>
            <img src={`${mf}/_preview/${layerInfo.mname}`} style={{ height: 30 }} />
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

const ActiveLayerContent = props => {
  const { activeLayer, layers, setLayers, program } = props
  return (
    <>
      {
        {
          'image': <ImageLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} />,
          'btn': <ButtonLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} program={program} />
        }[activeLayer.mtype]
      }
    </>
  )
}
export default ({
  layers,
  setLayers,
  monitors,
  setMonitors,
  board,
  zoom,
  setZoom,
  program,
  setProgram,
  save,
  loading
}) => {
  const boardRef = React.useRef()
  const history = useHistory();
  const mf = process.env.REACT_APP_MEDIA_PATH
  const psn = process.env.REACT_APP_PSN
  const [activeLayer, setActiveLayer] = React.useState({})
  React.useEffect(() => {
    setActiveLayer({ ...layers.find(layer => layer.ptid === activeLayer.ptid) })
  }, [layers])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', paddingRight: 300, position: 'relative' }}>
      {
        loading
          ?
          <Backdrop open style={{ color: '#fff', zIndex: 10, opacity: .3 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          :
          <>
            <ActionBar
              style={{ width: board.width, margin: '30px 0' }}
              zoom={zoom}
              layers={layers}
              setLayers={setLayers}
              activeLayer={activeLayer}
            />
            <svg id="board" xmlns="http://www.w3.org/2000/svg" version="1.1" width={board.width} height={board.height} x={board.left} y={board.top} ref={boardRef} >
              <rect
                style={{
                  fill: '#000',
                  fillOpacity: '.5'
                }}
                x={board.left}
                y={board.top}
                width={board.width}
                height={board.height}
              />
              <image
                xlinkHref={`${mf}/000/00/06/00000062.png`}
                x={board.left}
                y={board.top}
                width={board.width}
                height={board.height}
              />

              {
                monitors.map((monitor, index) =>
                  <Monitor
                    key={index}
                    layers={layers}
                    setLayers={setLayers}
                    board={board}
                    width={monitor.split(',')[2] * zoom}
                    height={monitor.split(',')[3] * zoom}
                    top={monitor.split(',')[1] * zoom}
                    left={monitor.split(',')[0] * zoom}
                    program={program}
                    activeLayer={activeLayer}
                    setActiveLayer={setActiveLayer}
                    boardRef={boardRef}
                  />)
              }
            </svg>
            <ToolBar
              save={save}
              layers={layers}
              setLayers={setLayers}
              program={program}
              setProgram={setProgram}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              content={
                JSON.stringify(activeLayer) === '{}'
                  ? <ProgramContent program={program} setProgram={setProgram} />
                  : <ActiveLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} program={program} />
              }
            />
          </>
      }
    </div>
  )
}