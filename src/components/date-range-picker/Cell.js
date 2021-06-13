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
    isPicking,
    setPicking,
    pickingRange,
    setPickingRange,
    tempEndDate,
    setTempEndDate
  } = props
  const classes = useStyles()
  const isCellActive =
    (
      (new Date(date.value) >= new Date(pickingRange[0]) && new Date(date.value) <= new Date(tempEndDate))
      || (new Date(date.value) <= new Date(pickingRange[0]) && new Date(date.value) >= new Date(tempEndDate))
    )
  const handleClickCell = () => {
    if (isPicking) {
      setPickingRange([...pickingRange, date.value])
    } else {
      setPickingRange([date.value])
      setTempEndDate(date.value)
    }
    setPicking(!isPicking)
  }
  const handleHoverCell = () => {
    if (isPicking) {
      setTempEndDate(date.value)
    }
  }
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