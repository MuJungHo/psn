import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  date_picker_cell: {
    width: '14%'
  },
  spacer: {
    flex: 1
  }
})
export default props => {
  const {
    date,
    isCellActive,
    handleClickCell,
    handleHoverCell
  } = props
  const classes = useStyles()
  return (
    <div
      className={classes.date_picker_cell}
      onClick={handleClickCell}
      onMouseEnter={handleHoverCell}
      style={{ backgroundColor: isCellActive ? '#bebebe' : '#fff' }}
    >
      {date.day}
    </div>
  )
}