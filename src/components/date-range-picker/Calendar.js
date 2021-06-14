import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Cell from './Cell'
import ActionButton from '../material/ActionButton'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Paper } from '@material-ui/core';
const useStyles = makeStyles({
  date_picker_root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  date_picker_actions: {

  },
  date_picker_action: {

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    flex: '1 1 auto'
  },
  spacer: {
    flex: 1
  }
})
export default props => {
  const {
    year,
    month,
    setYear,
    setMonth,
    isPickingRange,
    isPicking,
    setPicking,
    tempEndDate,
    setTempEndDate,
    pickingRange,
    setPickingRange,
    pickingDate,
    setPickingDate
  } = props
  const classes = useStyles()
  const currMonthFirstDay = new Date(year, month, 1).getDay()
  const currMonthDays = new Date(year, (month + 1), 0).getDate()
  const lastMonthDays = new Date(year, month, 0).getDate()
  const dates = [...Array(35).keys()].map(index => {
    if (index < currMonthFirstDay) {
      return {
        value: `${year}/${month === 0 ? 12 : month}/${lastMonthDays - currMonthFirstDay + index + 1}`,
        year,
        month: month === 0 ? 12 : month,
        day: lastMonthDays - currMonthFirstDay + index + 1
      }
    } else if (index > (currMonthDays + currMonthFirstDay - 1)) {
      return {
        value: `${year}/${(month + 2) === 13 ? 1 : (month + 2)}/${index - currMonthDays - currMonthFirstDay + 1}`,
        year,
        month: (month + 2) === 13 ? 1 : (month + 2),
        day: index - currMonthDays - currMonthFirstDay + 1
      }
    } else {
      return {
        value: `${year}/${(month + 1)}/${index - currMonthFirstDay + 1}`,
        year,
        month: (month + 1),
        day: index - currMonthFirstDay + 1
      }
    }
  })
  const handleLowerMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }
  const handleHigherMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const handleClickCell = value => {
    if (isPickingRange) {
      if (isPicking) {
        setPickingRange([...pickingRange, value])
      } else {
        setPickingRange([value])
        setTempEndDate(value)
      }
      setPicking(!isPicking)
    } else {
      setPickingDate(value)
    }
  }

  const handleHoverCell = value => {
    if (isPickingRange) {
      if (isPicking) {
        setTempEndDate(value)
      }
    }
  }
  return (
    <div className={classes.date_picker_root}>
      <div style={{ height: 50 }} className={classes.date_picker_actions}>
        <ActionButton onClick={handleLowerMonth}>
          <KeyboardArrowLeftIcon />
        </ActionButton>
        <ActionButton onClick={handleHigherMonth}>
          <ChevronRightIcon />
        </ActionButton>
        {`${year}/${month + 1}`}
      </div>
      <div className={classes.container}>
        {
          dates.map(date => {
            const isCellActive = isPickingRange
              ?
              (
                (new Date(date.value) >= new Date(pickingRange[0]) && new Date(date.value) <= new Date(tempEndDate))
                || (new Date(date.value) <= new Date(pickingRange[0]) && new Date(date.value) >= new Date(tempEndDate))
              )
              : date.value === pickingDate
            
            return <Cell
              key={date.value}
              date={date}
              isCellActive={isCellActive}
              handleClickCell={() => handleClickCell(date.value)}
              handleHoverCell={() => handleHoverCell(date.value)}
            />
          })
        }
      </div>
    </div>
  )
}