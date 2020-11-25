import React from 'react'
import { Paper, Grid, Typography, Button, Avatar } from '@material-ui/core'
import AvartarText from '../UI/AvartarText'

function Friends({ user }) {
  return (
    <Grid container spacing={2}>
      {user.friends.length &&
        user.friends.map((friend) => (
          <Grid item xs={6} sm={6} md={6}>
            <Paper
              style={{ padding: '16px', display: 'flex', alignItems: 'center' }}
            >
              {friend.profile_pic ? (
                <Avatar src={friend.profile_pic} variant="square" />
              ) : (
                <AvartarText
                  bg={friend.active ? 'seagreen' : 'tomato'}
                  text={friend.name}
                />
              )}
              <Typography
                style={{ marginLeft: '16px',flexGrow:1 }}
                variant="h6"
                color="inherit"
              >
                {friend.name}
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: 'tomato', color: '#fff' }}
              >
                Unfriend
              </Button>
            </Paper>
          </Grid>
        ))}
    </Grid>
  )
}

export default Friends
