import React from 'react'
import useStyles from './styles'
import {
  Paper,
  Avatar,
  Badge,
  Typography,
  Button,
  Grid,
  IconButton,
} from '@material-ui/core'

import { Videocam as VideoIcon } from '@material-ui/icons'
function Room() {
  const classes = useStyles()
  return (
    <Paper style={{ width: '100%',marginTop:'20px',padding:"16px 8px" }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid
          item
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px 8px',
          }}
        >
          <VideoIcon style={{ color: 'rgb(1,133,243)' }} />
          <Typography>
            <b>Rooms</b>
          </Typography>
        </Grid>
        <Grid item>
          <Button className={classes.createBtn}>Create</Button>
        </Grid>
      </Grid>
      <Grid container justify="flex-start" alignItems="center">
        {[0, 1, 2, 3, 4,].map((_, i) => (
          <Grid item md={2} xs={2} sm={2} key={i}>
            <IconButton className={classes.actionBtn}>
              <Badge
                color="secondary"
                overlap="circle"
                badgeContent=" "
                variant="dot"
              >
                <Avatar>
                  <img
                    src=""
                    style={{ width: '100%', height: '100%' }}
                  />
                </Avatar>
              </Badge>
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Room
