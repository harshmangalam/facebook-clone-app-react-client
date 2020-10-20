import React from 'react'
import useStyles from './styles'
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@material-ui/core'

import {
  MoreHoriz as MoreHorizIcon,
  PeopleAlt as PeopleAltIcon,
} from '@material-ui/icons'
function PeopleYouMayKnow() {
  const classes = useStyles()
  return (
    <Paper style={{ marginTop: '20px', padding: '8px' }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography
            variant="h6"
            style={{
              color: 'rgb(101,110,119)',
              fontWeight: '800',
            }}
          >
            People You may Know
          </Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        spacing={1}
        style={{ marginTop: '16px' }}
      >
        {[0, 1, 2].map((_, i) => (
          <Grid item md={4} xs={4} sm={4} key={i}>
            <Card elevation={0}>
              <CardMedia
                style={{ width: '100%', height: '200px' }}
                image=""
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography style={{ fontWeight: '700' }}>
                  Harsh Mangalam
                </Typography>
                <div style={{ display: 'flex' }}>
                  <Avatar
                    style={{ width: '20px', height: '20px' }}
                    alt="Remy Sharp"
                    src=""
                  />
                  <Avatar
                    style={{ width: '20px', height: '20px' }}
                    alt="Travis Howard"
                    src=""
                  />
                  <Typography
                    style={{
                      marginLeft: '10px',
                      color: 'rgb(101,110,119)',
                    }}
                  >
                    8 mutual friends
                  </Typography>
                </div>
              </CardContent>
              <div style={{ padding: '10px' }}>
                <Button
                  variant="contained"
                  style={{
                    width: '100%',
                    background: '#e7f3ff',
                    color: '#0570e7',

                    boxShadow: 'none',
                  }}
                  startIcon={<PeopleAltIcon />}
                >
                  Add Friend
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button style={{ marginTop: '8px', marginBottom: '8px' }}>See All</Button>
    </Paper>
  )
}

export default PeopleYouMayKnow
