import React from 'react'
import Button from '../material/Button'
import TextField from '../material/TextField'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

export default ({
  style
  // layers,
}) => {
  const history = useHistory();
  const { status } = useSelector(state => state.drawer)

  return (
    <div style={{ height: 60, backgroundColor: '#FFF', ...style }}>
      <div>actions</div>
    </div>
  )
}