import React from 'react'
import Layer from './Layer'
export default ({
  layers,
  setLayers,
  boardWidth,
  boardHeight,
  program
}) => {
  const board = React.useRef()
  const fill = program.bgcolor ? `#${program.bgcolor.substring(3, 9)}` : '#ffffff'
  const [activeLayer, setActiveLayer] = React.useState({})
  return (
    <svg id="board" xmlns="http://www.w3.org/2000/svg" version="1.1" width={boardWidth} height={boardHeight} ref={board} style={{ margin: 20 }} >
      <rect width={boardWidth} height={boardHeight} x="0" y="0" fill={fill}></rect>
      {
        layers.map(layer =>
          <Layer
            key={layer.ptid}
            layer={layer}
            layers={layers}
            setLayers={setLayers}
            board={board}
            program={program}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
          />)
      }
    </svg>
  )
}