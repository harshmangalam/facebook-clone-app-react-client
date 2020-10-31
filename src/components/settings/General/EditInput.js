import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core'

function EditInput({ label, input, setInput, editAction, loading }) {
  const [dialog, setDialog] = useState(false)
  const handleChange = (value) => {
    setInput(value)
  }

  const handleUpdate = () => {
    setDialog(false)
    editAction()
  }
  return (
    <div>
      <Button disabled={loading} onClick={() => setDialog(true)} color="secondary" variant="contained">
        {loading ? '...' : 'Edit'}
      </Button>

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update {label}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ width: '100%' }}
            variant="outlined"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditInput
