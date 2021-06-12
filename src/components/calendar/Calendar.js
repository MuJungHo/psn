import React from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Cell from './Cell'
import Paper from '../material/Paper'
import ActionButton from '../material/ActionButton'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
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
export default () => {
  const classes = useStyles()
  const dt = new Date()
  const [year, setYear] = React.useState(dt.getFullYear())
  const [month, setMonth] = React.useState(dt.getMonth())
  const currMonthFirstDay = new Date(year, month, 1).getDay()
  const currMonthDays = new Date(year, (month + 1), 0).getDate()
  const lastMonthDays = new Date(year, month, 0).getDate()
  const dates = [...Array(35).keys()].map(index => {
    if (index < currMonthFirstDay) {
      return `${year}/${month === 0 ? 12 : month}/${lastMonthDays - currMonthFirstDay + index + 1}`
    } else if (index > (currMonthDays + currMonthFirstDay - 1)) {
      return `${year}/${(month + 2) === 13 ? 1 : (month + 2)}/${index - currMonthDays - currMonthFirstDay + 1}`
    } else {
      return `${year}/${(month + 1)}/${index - currMonthFirstDay + 1}`
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
  return (
    <div className={classes.root}>
      <div style={{ height: 50 }}>
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
          dates.map(date => <Cell key={date} date={date} />)
        }
      </div>
    </div>
  )
}