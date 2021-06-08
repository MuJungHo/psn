import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Monitor from './Monitor'
import Content from './Content'
import ActionBar from './ActionBar'
import { useHistory } from "react-router-dom"
import { Backdrop, CircularProgress } from '@material-ui/core';
import { setProgram } from '../../actions/program'
import TextField from '../material/TextField'
import ActiveLayerContent from './contents/ActiveLayerContent'
const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'
const ProgramContent = () => {
  const dispatch = useDispatch()
  const { program } = useSelector(state => state.program)
  return (
    <div>
      <TextField
        type="text"
        variant="outlined"
        value={program.pgname || ''}
        onChange={e => dispatch(setProgram({
          ...program,
          pgname: e.target.value
        }))}
      />
      <TextField
        type="text"
        variant="outlined"
        value={program.bgcolor || ''}
        onChange={e => dispatch(setProgram({
          ...program,
          bgcolor: e.target.value
        }))}
      />
    </div>
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
  save,
  loading
}) => {
  const { program } = useSelector(state => state.program)
  const boardRef = React.useRef()
  const history = useHistory();
  const [activeLayer, setActiveLayer] = React.useState({})
  const [bgImage, setBgImage] = React.useState('')
  const [fill, setFill] = React.useState('')
  const [content, setContent] = React.useState()
  React.useEffect(() => {
    if (program.bgimage !== '0') {
      toDataURL(`${mf}/000/00/06/00000062.png`, (dataUrl) => {
        setBgImage(dataUrl)
      })
    }
  }, [program.bgimage])

  React.useEffect(() => {
    setFill(`#${program.bgcolor.substring(3)}`)
  }, [program.bgcolor])

  React.useEffect(() => {
    setContent(
      JSON.stringify(activeLayer) === '{}'
        ? <ProgramContent />
        : <ActiveLayerContent setActiveLayer={setActiveLayer} activeLayer={activeLayer} layers={layers} setLayers={setLayers} />)
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
              setActiveLayer={setActiveLayer}
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
                  fill
                }}
                x={board.left}
                y={board.top}
                width={board.width}
                height={board.height}
              />
              {
                monitors.length > 0
                  ?
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
                      activeLayer={activeLayer}
                      setActiveLayer={setActiveLayer}
                      boardRef={boardRef}
                    />)
                  :
                  <Monitor
                    layers={layers}
                    setLayers={setLayers}
                    board={board}
                    width={board.width * zoom}
                    height={board.height * zoom}
                    top={board.top * zoom}
                    left={board.left * zoom}
                    activeLayer={activeLayer}
                    setActiveLayer={setActiveLayer}
                    boardRef={boardRef}
                  />
              }
            </svg>
            <Content
              save={save}
              layers={layers}
              setLayers={setLayers}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              content={content}
            />
          </>
      }
    </div>
  )
}