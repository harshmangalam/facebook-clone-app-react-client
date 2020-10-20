import React from 'react'
import { Paper, Grid, Avatar, Typography, Button } from '@material-ui/core'

function Photos() {
  return (
    <Paper style={{ padding: '8px' }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography>Photos</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" size="small">See all</Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify="flex-start"
        style={{ marginTop: '16px' }}
      >
        {[...new Array(6)].map((photo) => (
          <Grid item xs={6} sm={6} md={6}>
            <Avatar variant="square" style={{width:'100%',height:'100%'}}>
              <img
                src=""
                width="100%"
                height="100%"
              />
            </Avatar>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Photos
