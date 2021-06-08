import React from 'react'
import Layer from './Layer'
import { useSelector } from 'react-redux'
export default ({
  layers,
  setLayers,
  width,
  height,
  top,
  left,
  activeLayer,
  setActiveLayer,
  boardRef,
  board
}) => {
  const { program } = useSelector(state => state.program)
  const [fill, setFill] = React.useState('')
  React.useEffect(() => {
    setFill(`#${program.bgcolor.substring(3)}`)
  }, [program.bgcolor])
  return (
    <>
      <rect onClick={() => setActiveLayer({})} width={width} height={height} x={left} y={top} fill={fill}></rect>
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
            workSpace={board}
          />)
      }
    </>
  )
}