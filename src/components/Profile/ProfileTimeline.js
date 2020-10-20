import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import Photos from './Photos'
import WritePostCard from '../Post/PostForm/WritePostCard'
import { UserContext } from '../../App'

function ProfileTimeline({ user }) {
  const { userState } = useContext(UserContext)
  return (
    <Grid container style={{ marginTop: '20px' }} spacing={2}>
      <Grid item xs={12} sm={12} md={4}>
        <Paper style={{ padding: '8px' }}>
          <Typography>Edit</Typography>
          <Button
            style={{
              width: '100%',
              background: 'rgb(228,230,235)',
              marginTop: '8px',
            }}
          >
            Edit Details
          </Button>
          <Button
            style={{
              width: '100%',
              background: 'rgb(228,230,235)',
              marginTop: '8px',
            }}
          >
            Edit Hobbies
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        {userState.currentUser.id == user.id && <WritePostCard />}
      </Grid>
    </Grid>
  )
}

export default ProfileTimeline
