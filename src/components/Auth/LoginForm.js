import React, { Fragment, useEffect } from 'react'

import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from '@material-ui/core'

import useLoginUser from './hooks/useLoginUser'

function LoginForm() {
  const {
    loading,
    error,
    handleLoginUser,
    handlePasswordChange,
    handleEmailChange,
  } = useLoginUser()

  return (
    <Fragment>
      <form onSubmit={handleLoginUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            onChange={handleEmailChange}
            label="Email"
            variant="outlined"
            error={error && error.email ? true : false}
            helperText={error && error.email ? error.email : null}
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
            ' Log In'
          )}
        </Button>
      </form>
    </Fragment>
  )
}

export default LoginForm
