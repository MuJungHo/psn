import React from 'react'
import Button from '../material/Button'
import TextField from '../material/TextField'
import { useHistory } from "react-router-dom"

export default ({
  layers,
  setLayers,
  activeLayer,
  // setActiveLayer,
  program,
  setProgram,
  save,
  content
}) => {
  const history = useHistory();

  return (

    <div style={{ position: 'absolute', width: 300, wordWrap: 'break-word', right: 0, top: 0, height: '100%', backgroundColor: '#fff' }}>
      <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={save} >save</Button>
      <Button variant="contained" color="secondary" style={{ marginRight: '1rem' }} onClick={() => history.push(`/newui/programs`)}>back</Button>
      {content}
    </div>
  )
}