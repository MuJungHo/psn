import React from 'react'
export default ({ x1, y1, x2, y2, show }) => {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: '#90EE90', strokeWidth: show ? 3 : 0 }} />
  )
}