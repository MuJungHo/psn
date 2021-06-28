import React from 'react'

export default ({ x, element, offset }) => {
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
    offset(e.offsetX)
    if (e.offsetX <= 0 || e.offsetX >= 1440) {
      endDrag()
    }
  }
  return (
    <rect
      onMouseDown={startDrag}
      x={x}
      width={10}
      height={150}
      y={20}
      style={{
        fillOpacity: 0,
        cursor: 'col-resize'
      }}
    />
  )
}