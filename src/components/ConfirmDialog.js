import React from "react"
import { useSelector } from 'react-redux'
import Dialog from './material/Dialog'
import Button from '../components/material/Button'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@material-ui/core'
import message from '../i18n'
import CircularProgress from '@material-ui/core/CircularProgress';
import Warning from '../icons/Warning'
import Cross from '../icons/Cross'
export default props => {
  const {
    titleText,
    content,
    isDialogOpen,
    setDialogOpen,
    confirm,
    cancel,
    close,
    warning,
    confirmText,
    cancelText,
    isLoading,
    noCancelButton
  } = props
  // const { locale } = useSelector(state => state.locale)

  const handleCancel = () => {
    if (typeof cancel === 'function') cancel()
    setDialogOpen(false)
  }
  const handleClose = () => {
    if (typeof close === 'function') close()
    setDialogOpen(false)
  }
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {titleText}
      </DialogTitle>

      <Cross style={{ position: 'absolute', right: '1.4rem', top: '1.4rem', cursor: 'pointer' }} onClick={handleClose} />
      <Divider />
      <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
        {warning ? <Warning style={{ marginRight: 20 }} /> : null}
        {
          isLoading
            ? <CircularProgress style={{ margin: 'auto' }} />
            : content
        }
      </DialogContent>
      <DialogActions>
        {
          noCancelButton ? null : <Button
            onClick={handleCancel}
            variant="contained"
            style={{ width: 100 }}>
            {cancelText ? cancelText : '取消'}
          </Button>
        }

        <Button
          disabled={isLoading}
          onClick={confirm}
          color={warning ? 'secondary' : 'primary'}
          variant="contained"
          style={{ width: 100, marginLeft: '1.4rem' }}>
          {confirmText ? confirmText : '確認'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}