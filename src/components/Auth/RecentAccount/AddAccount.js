import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import React from 'react'
import LoginForm from '../LoginForm'

function AddAccount() {
  const [addAccount, handleAddAccount] = React.useState(false)
  return (
    <>
      <Card>
        <CardActionArea onClick={() => handleAddAccount(true)}>
          <CardMedia
            style={{
              height: '150px',
              background: 'rgb(245,246,247)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              style={{
                background: 'rgb(24,119,242)',
                color: '#fff',
                width: '50px',
                height: '50px',
              }}
            >
              <Add />
            </Avatar>
          </CardMedia>
          <CardContent>
            <Typography style={{ fontWeight: '600' }}>Add Account</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {addAccount && (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          scroll="body"
          maxWidth="sm"
          open={addAccount}
          onClose={() => handleAddAccount(false)}
          style={{ width: '100%' }}
        >
          <Card style={{ width: '100%' }}>
            <CardHeader
              subheader={
                <Typography style={{ fontWeight: '700', fontSize: '20px' }}>
                  Add Accounts
                </Typography>
              }
              action={
                <IconButton
                  style={{ background: 'rgb(240,242,245)' }}
                  onClick={() => handleAddAccount(false)}
                >
                  <Close />
                </IconButton>
              }
            />

            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </Dialog>
      )}


    </>
  )
}

export default AddAccount
