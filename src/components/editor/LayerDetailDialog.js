import React from "react"
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '../material/Dialog'
import Card from '../material/Card'
import Button from '../material/Button'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,

  CardContent,
  CardMedia,
} from '@material-ui/core'
import message from '../../i18n'
import CircularProgress from '@material-ui/core/CircularProgress';
import Warning from '../../icons/Warning'
import Cross from '../../icons/Cross'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import PickDialog from '../PickDialog'
import ActionButton from '../material/ActionButton'
import Delete from '@material-ui/icons/Delete'

const baseURL = process.env.REACT_APP_DOMAIN || 'http://127.0.0.1'
const psn = baseURL + '/psn'
const mf = baseURL + '/mf'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
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
    display: 'flex',
    paddingTop: '1.5rem',
    flexWrap: 'wrap'
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

export default props => {
  const {
    target,
    mtype,
    titleText,
    isDialogOpen,
    setDialogOpen,
    confirm,
    cancel,
    close,
    confirmText,
    cancelText,
    activeLayer,
    mutiple
  } = props
  const [isPickDialogOpen, setPickDialogOpen] = React.useState(false)
  const [layerDetail, setLayerDetail] = React.useState({ ...activeLayer })
  React.useEffect(() => {
    setLayerDetail({ ...activeLayer })
  }, [activeLayer])
  React.useEffect(() => {
    if (isDialogOpen) {
      if (target === 'media') {
      }
    }
  }, [isDialogOpen])

  const handleCancel = () => {
    if (typeof cancel === 'function') cancel()
    setDialogOpen(false)
  }
  const handleClose = () => {
    if (typeof close === 'function') close()
    setDialogOpen(false)
  }
  const handleConfirm = () => {
    if (typeof confirm === 'function') confirm(layerDetail)
    setDialogOpen(false)
  }
  const handleAddLayerInfo = () => {
    setPickDialogOpen(true)
  }
  const doAddLayerInfo = layerInfos => {
    var updatedLayerInfos = [
      ...layerDetail.layerInfos,
      ...layerInfos
    ]

    setLayerDetail({
      ...layerDetail,
      file: updatedLayerInfos.length > 0 ? updatedLayerInfos[0].mname : '',
      layerInfos: [
        ...updatedLayerInfos
      ]
    })
  }
  const handleDeleteLayerInfo = deleteInfo => {
    var updatedLayerInfos = layerDetail.layerInfos.filter(layerInfo => layerInfo.uuid !== deleteInfo.uuid)

    setLayerDetail({
      ...layerDetail,
      file: updatedLayerInfos.length > 0 ? updatedLayerInfos[0].mname : '',
      layerInfos: [
        ...updatedLayerInfos
      ]
    })
  }
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      fullScreen
      maxWidth="lg"
    >
      <DialogTitle>
        {titleText}
      </DialogTitle>
      <Cross style={{ position: 'absolute', right: '1.4rem', top: '1.4rem', cursor: 'pointer' }} onClick={handleClose} />
      <Divider />
      <DialogContent style={{ height: 700 }}>
        <Button
          onClick={handleAddLayerInfo}
          color='primary'
          variant="contained"
          style={{ width: 100, marginLeft: '1.4rem' }}>
          {'新增媒體'}
        </Button>
        {
          layerDetail.layerInfos.map(layerInfo =>
            <div key={layerInfo.uuid}>
              <img src={`${mf}/_preview/${layerInfo.mname.split('.')[0]}.jpg`} style={{ height: 30 }} />
              {layerInfo.mtitle}
              {layerInfo.t}
              <ActionButton onClick={() => handleDeleteLayerInfo(layerInfo)}>
                <Delete />
              </ActionButton>
            </div>)
        }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="contained"
          style={{ width: 100 }}>
          {cancelText ? cancelText : '取消'}
        </Button>
        <Button
          onClick={handleConfirm}
          color='primary'
          variant="contained"
          style={{ width: 100, marginLeft: '1.4rem' }}>
          {confirmText ? confirmText : '確認'}
        </Button>
      </DialogActions>
      <PickDialog
        isDialogOpen={isPickDialogOpen}
        setDialogOpen={setPickDialogOpen}
        titleText={'pick media'}
        mtype={activeLayer.mtype}
        mutiple
        confirmText={'確認'}
        confirm={doAddLayerInfo}
      />
    </Dialog>
  )
}