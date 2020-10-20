import React, { useState } from 'react'
import RecentAccounts from '../components/Auth/RecentAccount/RecentAccounts'
import LoginForm from '../components/Auth/LoginForm'
import SignupForm from '../components/Auth/SignupForm'
import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'

const Auth = () => {
  const [toggleLoginForm, setToggleLoginForm] = useState(true)
  return (
    <div style={{ marginBottom: '100px' }}>
      <Container>
        <Grid
          container
         
          justify="center"
          alignItems="flex-start"
          direction="column"
          style={{ marginTop: '30px' }}
        >
          <Typography variant="h4" style={{ fontWeight: 800 }} color="primary">
            Facebook
          </Typography>
          <Typography variant="h6">Recents Login</Typography>
          <Typography style={{ marginTop: '16px' }} variant="body2">
            click your picture or add an account
          </Typography>
        </Grid>

        <Grid container  spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={8}>
          <RecentAccounts />
          </Grid>
         <Grid item xs={12} sm={6} md={4}>
         <Paper
            elevation={8}
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {toggleLoginForm ? <LoginForm /> : <SignupForm />}

            <Divider />
            <Button
              onClick={() => setToggleLoginForm(!toggleLoginForm)}
              style={{
                marginTop: '32px',
                background: 'rgb(74,183,43)',
                color: '#fff',
              }}
            >
              {toggleLoginForm
                ? 'Create New Account'
                : ' Already have an Account'}
            </Button>
          </Paper>
         </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Auth
