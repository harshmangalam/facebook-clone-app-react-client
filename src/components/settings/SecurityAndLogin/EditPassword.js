import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@material-ui/core'

import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState } from 'react'

function EditPassword({ password, setPassword, updatePassword }) {
  const [dialog, setDialog] = useState(false)

  const handleChangeCurrentPassword = (e) => {
    setPassword({ ...password, currentPassword: e.target.value })
  }
  const handleChangeNewPassword = (e) => {
    setPassword({ ...password, newPassword: e.target.value })
  }

  const handleUpdatePassword = () => {
    setDialog(false)
    updatePassword()
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialog(true)}
      >
        Edit
      </Button>

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          {/* {error && <Alert severity="error">{error}</Alert>} */}

          <OutlinedInput
            type={password.showCurrentPassword ? 'text' : 'password'}
            value={password.currentPassword}
            placeholder="Current Password"
            onChange={handleChangeCurrentPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setPassword({
                      ...password,
                      showCurrentPassword: !password.showCurrentPassword,
                    })
                  }
                  edge="end"
                >
                  {password.showCurrentPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            style={{ width: '100%', marginBottom: '8px' }}
          />
          <OutlinedInput
            type={password.showNewPassword ? 'text' : 'password'}
            value={password.newPassword}
            placeholder="New Password"
            onChange={handleChangeNewPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setPassword({
                      ...password,
                      showNewPassword: !password.showNewPassword,
                    })
                  }
                  edge="end"
                >
                  {password.showNewPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdatePassword}>Change</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditPassword
