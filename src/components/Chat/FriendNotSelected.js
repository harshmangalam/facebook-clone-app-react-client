import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'

function FriendNotSelected() {
  return (
    <Grid
      item
      md={8}
      xs={12}
      sm={12}
      style={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar style={{ width: '100px', height: '100px' }}>
        <img
          src={require('../../assets/selectFriends.svg')}
          style={{ width: '100%', height: '100%' }}
        />
      </Avatar>

      <Typography style={{ marginTop: '16px', fontWeight: '800' }}>
        Select friends from friend lists to start chat
      </Typography>
    </Grid>
  )
}

export default FriendNotSelected
