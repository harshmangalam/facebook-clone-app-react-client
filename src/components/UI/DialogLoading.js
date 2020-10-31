import { Dialog, LinearProgress, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'

function DialogLoading({ loading, text }) {
  const [open, setOpen] = useState(loading)
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      scroll="body"
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      style={{ width: '100%' }}
    >
      <Paper
        style={{
          width: '100%',
          height: '100%',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        elevation={15}
      >
        <Typography
          style={{
            fontSize: '20px',
            fontWeight: '800',
            marginBottom: '16px',
          }}
        >
          {text}
        </Typography>
        <LinearProgress color="secondary" style={{ width: '50%' }} />
      </Paper>
    </Dialog>
  )
}

export default DialogLoading
