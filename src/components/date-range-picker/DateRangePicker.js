import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Calendar from './Calendar'
const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  spacer: {
    flex: 1
  },
  date_picker_container: {

  },
  date_picker_confirm: {

  }
})
export default props => {
  const { onChange, value } = props
  const classes = useStyles()
  const dt = new Date()
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [isPicking, setPicking] = React.useState(false)
  const [pickingRange, setPickingRange] = React.useState(value)
  const [tempEndDate, setTempEndDate] = React.useState(value[1])
  const [startYear, setStartYear] = React.useState(dt.getFullYear())
  const [endYear, setEndYear] = React.useState(dt.getFullYear())
  const [startMonth, setStartMonth] = React.useState(dt.getMonth())
  const [endMonth, setEndMonth] = React.useState(dt.getMonth() + 1)
  const handleOKClick = () => {
    onChange(pickingRange)
    setDialogOpen(false)
  }
  const onDialogClose = event => {
    if (typeof event.target.className === 'string' && event.target.className.indexOf('date_picker') === -1) {
      setDialogOpen(false)
    }
  }
  React.useEffect(() => {
    if (isDialogOpen) {
      setPickingRange(value)
      window.addEventListener('click', onDialogClose)
    }
    return () => { window.removeEventListener('click', onDialogClose) }
  }, [isDialogOpen])
  return (
    <div
      className={classes.root}
    >
      <div style={{ display: 'flex' }}>
        <div onClick={() => setDialogOpen(!isDialogOpen)} >
          {
            value.length === 2
              ?
              `${value[0]}~${value[1]}`
              :
              `請選擇日期區間`
          }
        </div>
        {
          value.length === 2
            ?
            <div onClick={() => onChange([])}>x</div>
            :
            null
        }

      </div>
      <div
        className={classes.date_picker_container}
        style={{
          position: 'fixed',
          boxShadow: '0 0 10px 1px rgb(0 0 0 / 20%), 0 4px 4px 3px rgb(0 0 0 / 24%)',
          borderRadius: 6,
          zIndex: 10,
          display: isDialogOpen ? 'flex' : 'none',
          height: 310,
          width: 510,
          backgroundColor: '#fff'
        }}>
        <Calendar
          isPicking={isPicking}
          setPicking={setPicking}
          tempEndDate={tempEndDate}
          setTempEndDate={setTempEndDate}
          pickingRange={pickingRange}
          setPickingRange={setPickingRange}
          year={startYear}
          setYear={setStartYear}
          month={startMonth}
          setMonth={setStartMonth}
        />
        <Calendar
          isPicking={isPicking}
          setPicking={setPicking}
          tempEndDate={tempEndDate}
          setTempEndDate={setTempEndDate}
          pickingRange={pickingRange}
          setPickingRange={setPickingRange}
          year={endYear}
          setYear={setEndYear}
          month={endMonth}
          setMonth={setEndMonth}
        />
        <button
          className={classes.date_picker_confirm}
          onClick={handleOKClick}>
          {'OK'}
        </button>
      </div>
    </div>
  )
}