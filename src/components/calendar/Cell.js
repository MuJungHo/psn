import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  cell: {
    width: '14%',
    minHeight: 60
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
  const isCellActive = isPicking
    && (
      (new Date(date) >= new Date(pickingRange[0]) && new Date(date) <= new Date(tempEndDate))
      || (new Date(date) <= new Date(pickingRange[0]) && new Date(date) >= new Date(tempEndDate))
    )
  const handleClickCell = () => {
    if (isPicking) {
      setPickingRange([...pickingRange, date])
      setTempEndDate('')
    } else {
      setPickingRange([date])
      setTempEndDate(date)
    }
    setPicking(!isPicking)
  }
  const handleHoverCell = () => {
    if (isPicking) {
      setTempEndDate(date)
    }
  }
  return (
    <div
      className={classes.cell}
      onClick={handleClickCell}
      onMouseEnter={handleHoverCell}
      style={{ backgroundColor: isCellActive ? '#bebebe' : '#fff' }}
    >
      {date}
    </div>
  )
}