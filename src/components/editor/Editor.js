import React from 'react'
import Monitor from './Monitor'
import ToolBar from './ToolBar'
import ActionBar from './ActionBar'
import Button from '../material/Button'
import { useHistory } from "react-router-dom"
import { Backdrop, CircularProgress } from '@material-ui/core';

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
  console.log(loading)
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
            <ActionBar style={{ width: board.width, margin: '30px 0' }} />
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
              program={program}
              setProgram={setProgram}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer} />
          </>
      }
    </div>
  )
}