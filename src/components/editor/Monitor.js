import React from 'react'
import Layer from './Layer'
export default ({
  layers,
  setLayers,
  width,
  height,
  top,
  left,
  program,
  activeLayer,
  setActiveLayer,
  boardRef
}) => {
  const fill = program.bgcolor ? `#${program.bgcolor.substring(3, 9)}` : '#ffffff'
  return (
    <>
      <rect width={width} height={height} x={left} y={top} fill={fill} fillOpacity={program.bgimage ? 0 : 1}></rect>
      {
        layers.map(layer =>
          <Layer
            key={layer.ptid}
            layer={layer}
            layers={layers}
            setLayers={setLayers}
            board={boardRef}
            program={program}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
          />)
      }
    </>
  )
}