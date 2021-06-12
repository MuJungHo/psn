import React from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  cell: {
    width: '14%'
  },
  spacer: {
    flex: 1
  }
})
export default props => {
  const { date } = props
  const classes = useStyles()
  return (
    <div className={classes.cell}>
      {date}
    </div>
  )
}