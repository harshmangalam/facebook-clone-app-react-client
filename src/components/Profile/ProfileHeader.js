import React from 'react'
import AvatarText from '../UI/AvartarText'
import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  Avatar,
  Badge,
  IconButton,
  Button,
  Divider,
} from '@material-ui/core'
import { CameraAlt as CameraIcon } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '40vh',
    marginTop: '60px',
    position: 'relative',
    backgroundImage: `url(${require('../../assets/background.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100% 40vh',
  },

  overlay: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '40vh',
    top: 0,
  },
}))
function ProfileHeader({ user }) {
  const classes = useStyles()
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={10} className={classes.paper}>
            <Badge
              badgeContent={
                <IconButton style={{ bottom: -140, left: -20 }}>
                  <Avatar>
                    <CameraIcon style={{ color: 'black' }} />
                  </Avatar>
                </IconButton>
              }
              style={{
                position: 'absolute',
                bottom: -30,
                width: '170px',
                height: '170px',
                zIndex: 2,
                left: '40%',
              }}
            >
              {user.profile_pic ? (
                <Avatar
                  style={{
                    width: '60px',
                    height: '60px',
                  }}
                >
                  <img src={user.profile_pic} width="100%" height="100%" />
                </Avatar>
              ) : (
                <AvatarText
                  text={user.name}
                  bg={user.active ? 'seagreen' : 'tomato'}
                  fontSize="40px"
                  size="170px"
                />
              )}
            </Badge>
            <IconButton
              style={{ position: 'absolute', bottom: 30, left: 20, zIndex: 2 }}
            >
              <Avatar>
                <CameraIcon style={{ color: 'blue' }} />
              </Avatar>
            </IconButton>
            <div className={classes.overlay}></div>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: '30px' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Typography style={{ fontSize: '30px', fontWeight: '800' }}>
            {user.name}
          </Typography>
          <Button>Add Bio</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfileHeader
