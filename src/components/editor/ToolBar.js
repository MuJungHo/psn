import React from 'react'
import Button from '../material/Button'
import TextField from '../material/TextField'
import { useHistory } from "react-router-dom"

const ProgramContent = props => {
  const { program, setProgram } = props
  return (
    <div>
      <TextField
        type="text"
        variant="outlined"
        value={program.pgname || ''}
        onChange={e => setProgram({
          ...program,
          pgname: e.target.value
        })}
      />
      <TextField
        type="text"
        variant="outlined"
        value={program.bgcolor || ''}
        onChange={e => setProgram({
          ...program,
          bgcolor: e.target.value
        })}
      />
      {/* {JSON.stringify(program)} */}
    </div>
  )
}

const ActiveLayerContent = props => {
  const { activeLayer } = props
  return (
    <div>{JSON.stringify(activeLayer)}</div>
  )
}

export default ({
  // layers,
  activeLayer,
  // setActiveLayer,
  program,
  setProgram,
  save
}) => {
  const history = useHistory();

  return (

    <div style={{ position: 'absolute', width: 300, wordWrap: 'break-word', right: 0, top: 0, height: '100%', backgroundColor: '#fff' }}>
      <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={save} >save</Button>
      <Button variant="contained" color="secondary" style={{ marginRight: '1rem' }} onClick={() => history.push(`/newui/programs`)}>back</Button>


      {
        JSON.stringify(activeLayer) === '{}'
          ? <ProgramContent program={program} setProgram={setProgram} />
          : <ActiveLayerContent activeLayer={activeLayer} />
      }
    </div>
  )
}