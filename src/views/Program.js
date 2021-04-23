import React from 'react'
import Board from '../components/editor/Board'
export default () => {
  const [layers, setLayers] = React.useState([
    { width: 100, height: 100, top: 0, left: 0, id: 1 },
    { width: 100, height: 100, top: 200, left: 200, id: 2 },
    { width: 100, height: 100, top: 400, left: 400, id: 3 },
  ])
  return (
    <Board layers={layers} setLayers={setLayers} />
  )
}