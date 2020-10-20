import React from 'react'
import { Paper, Grid, Typography, Button, Avatar } from '@material-ui/core'

function Friends() {
  return (
    <Paper style={{ padding: '8px' }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography>Friends</Typography>
          <Typography>40</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" size="small">
            See all
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {[...new Array(4)].map((friend) => (
          <Grid item md={6} sm={6} xs={6}>
            <Avatar variant="square" style={{ width: '100%', height: '80%'}}>
              <img
                src={require('../../assets/ankit.jpg')}
                width="100%"
                height="100%"
              />
            </Avatar>
            <Typography variant="body2" style={{marginBottom:'32px'}} >Ankit Kumar</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Friends
