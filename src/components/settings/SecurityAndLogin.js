import React, { useState } from 'react'
import {
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Divider,
  ListItemIcon,
} from '@material-ui/core'

import useUpdateProfile from '../../hooks/useUpdateProfile'
import { Lock } from '@material-ui/icons'
import EditPassword from './SecurityAndLogin/EditPassword'
function SecurityAndLogin() {
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    showNewPassword: false,
    showCurrentPassword: false,
  })

  const { updatePassword } = useUpdateProfile()

  const handleUpdatePassword = () => {
    updatePassword({
      newPassword: password.newPassword,
      currentPassword: password.currentPassword,
    })
  }
  return (
    <div>
      <Typography
        style={{
          fontSize: '24px',
          fontWeight: '800',
          marginBottom: '16px',
          marginTop: '16px',
        }}
      >
        Security And Login
      </Typography>
      <Divider />

      <Grid container spacing={2} style={{ marginTop: '8px' }}>
        <List style={{ width: '100%' }}>
          <ListItem>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText
              primary={<Typography>Change password</Typography>}
              secondary={
                <Typography>
                  Use a strong password that you're not using elsewhere
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <EditPassword
                password={password}
                setPassword={setPassword}
                updatePassword={handleUpdatePassword}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </div>
  )
}


export default SecurityAndLogin
