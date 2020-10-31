import React, { useState } from 'react'
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Divider,
  ListItemIcon,
  Button,
} from '@material-ui/core'

import useUpdateProfile from '../../hooks/useUpdateProfile'
import { Computer, ExitToApp, Lock } from '@material-ui/icons'
import EditPassword from './SecurityAndLogin/EditPassword'
function SecurityAndLogin() {
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    showNewPassword: false,
    showCurrentPassword: false,
  })

  const { updatePassword, loading } = useUpdateProfile()

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
      <Grid container style={{ marginTop: '8px' }}>
        <Grid item xs={12} md={12} sm={12}>
          <List>
            {loginInfo.map((info) => (
              <ListItem>
                <ListItemIcon>
                  <Computer />
                </ListItemIcon>
                <ListItemText
                  primary={`${info.device} . ${info.location}`}
                  secondary={`${info.browser} . ${
                    info.activeState ? 'Active Now' : info.lastLogin
                  }`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <ExitToApp />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
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

const loginInfo = [
  {
    device: 'Linux',
    location: 'Patna,Bihar',
    browser: 'Chrome',
    activeState: true,
  },
  {
    device: 'Linux',
    location: 'Patna,Bihar',
    browser: 'Chrome',
    activeState: false,
    lastLogin: '22 Dec, 2020',
  },
  {
    device: 'Linux',
    location: 'Patna,Bihar',
    browser: 'Chrome',
    activeState: false,
    lastLogin: '24 Dec, 2020',
  },
]

export default SecurityAndLogin
