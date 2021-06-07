import React from 'react'
import Monitor from './Monitor'
import Content from './Content'
import ActionBar from './ActionBar'
import { useHistory } from "react-router-dom"
import { Backdrop, CircularProgress } from '@material-ui/core';
import TextField from '../material/TextField'
import ImageLayerContent from './contents/ImageLayerContent'
const mf = process.env.REACT_APP_DOMAIN + '/mf'
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
  const mf = process.env.REACT_APP_DOMAIN + '/mf'
  const psn = process.env.REACT_APP_DOMAIN + '/psn'
  const [activeLayer, setActiveLayer] = React.useState({})
  const [bgImage, setBgImage] = React.useState('')
  const [content, setContent] = React.useState()
  React.useEffect(() => {
    toDataURL(`${mf}/000/00/06/00000062.png`, (dataUrl) => {
      setBgImage(dataUrl)
    })
  }, [])

  React.useEffect(() => {
    setContent(
      JSON.stringify(activeLayer) === '{}'
        ? <ProgramContent program={program} setProgram={setProgram} />
        : <ActiveLayerContent activeLayer={activeLayer} layers={layers} setLayers={setLayers} program={program} />)
  }, [activeLayer])

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
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
              setContent={setContent}
            />
            <svg id="board" xmlns="http://www.w3.org/2000/svg" version="1.1" width={board.width} height={board.height} x={board.left} y={board.top} ref={boardRef} >

              <image
                xlinkHref={bgImage}
                x={board.left}
                y={board.top}
                width={board.width}
                height={board.height}
              />
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
            <Content
              save={save}
              layers={layers}
              setLayers={setLayers}
              program={program}
              setProgram={setProgram}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              content={content}
            />
          </>
      }
    </div>
  )
}