import React from 'react'

export default ({ y, element, offset }) => {
  const [isMoving, setMoving] = React.useState(false)
  const startDrag = () => {
    setMoving(true)
    element.addEventListener('mousemove', drag)
    element.addEventListener('mouseup', endDrag)
  }
  const endDrag = () => {
    element.removeEventListener('mousemove', drag)
    if (isMoving) setMoving(false)
  }
  const drag = e => {
    offset(e.offsetY)
    if (e.offsetY <= 0 || e.offsetY >= 1440) {
      endDrag()
    }
  }
  return (
    <rect
      onMouseDown={startDrag}
      y={y}
      width={700}
      height={10}
      x={5}
      style={{
        fillOpacity: 0,
        cursor: 's-resize'
      }}
    />
  )
}