import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Paper from '../components/material/Paper'
import Dialog from '../components/material/Dialog'
import Calendar from '../components/calendar/Calendar'
import Button from '../components/material/Button'

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 20
  },
  action: {
    marginTop: 0,
    marginRight: 0
  },
  title: {
    fontSize: '1.2rem'
  },
  media: {
    height: '12vh',
    margin: '0 20px',
    backgroundPosition: 'center top',
    backgroundSize: 'contain'

  },
  container: {
    padding: 20,
    display: 'flex',
    flex: 1,
    position: 'fixed'
  },
  card: {
    marginRight: '1.5%',
    marginBottom: 20,
    height: 'auto',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 3px 8px 0 rgba(141, 152, 170, .7)',
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '0 24px',
    // '& > *:nth-child(2)': {
    //   width: 250
    // }
  },
  spacer: {
    flex: 1
  }
})
export default () => {
  const classes = useStyles();
  const history = useHistory();
  const [isDialogOpen, setDialogOpen] = React.useState(true)
  const pickDateRange = range => {
    console.log(range)
  }
  return (
    <Dialog
      open={isDialogOpen}
      onClose={setDialogOpen}
      fullScreen
      maxWidth="lg"
    >
      <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/newui/schedules')}
      >
        {'返回'}
      </Button>
      </div>
      <Calendar pickDateRange={pickDateRange} />
    </Dialog>)
}