import React from 'react'

export default ({ cx, cy, board, position, layer, offset }) => {
  const [isMoving, setMoving] = React.useState(false)
  const startDrag = () => {
    setMoving(true)
    board.current.addEventListener('mousemove', drag)
    board.current.addEventListener('mouseup', endDrag)
  }
  const endDrag = () => {
    board.current.removeEventListener('mousemove', drag)
    if (isMoving) setMoving(false)
  }
  const drag = e => {
    offset({ position, x: e.offsetX - cx, y: e.offsetY - cy })
  }
  return (
    <circle
      onMouseDown={startDrag}
      cx={cx}
      cy={cy}
      r="4"
      stroke="#1592E6"
      fill="#FFFFFF"
    />
  )
}