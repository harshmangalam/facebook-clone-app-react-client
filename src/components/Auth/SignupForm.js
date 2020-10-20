import React, { Fragment, useEffect } from 'react'

import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from '@material-ui/core'

import useSignupUser from './hooks/useSignupUser'

function LoginForm() {
  const {
    loading,
    error,
    handleSignupUser,
    handleNameChange,
    handlePasswordChange,
    handleEmailChange,
  } = useSignupUser()

  return (
    <Fragment>
      <form onSubmit={handleSignupUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            error={error && error.name ? true : false}
            helperText={error && error.name ? error.name : null}
            onChange={handleNameChange}
            label="Name"
            variant="outlined"
            style={{ marginTop: '16px' }}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            onChange={handleEmailChange}
            label="Email"
            variant="outlined"
            error={error && error.email ? true : false}
            helperText={error && error.email ? error.email : null}
            style={{ marginTop: '16px' }}

          />
        </FormControl>

        <FormControl style={{ width: '100%' }}>
          <TextField
            error={error && error.password ? true : false}
            helperText={error && error.password ? error.password : null}
            onChange={handlePasswordChange}
            label="Password"
            variant="outlined"
            style={{ marginTop: '16px' }}
            type="password"
          />
        </FormControl>
        <Button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: 'rgb(24,119,242)',
            color: '#fff',
            marginTop: '16px',
          }}
          variant="contained"
        >
          {loading ? (
            <CircularProgress
              variant="indeterminate"
              size={25}
              style={{ color: '#fff' }}
            />
          ) : (
            ' Sign up'
          )}
        </Button>
      </form>
    </Fragment>
  )
}

export default LoginForm
