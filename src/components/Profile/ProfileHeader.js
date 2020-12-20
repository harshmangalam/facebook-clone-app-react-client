import React, { useContext } from 'react'
import { Paper, Typography, makeStyles, Grid, Button } from '@material-ui/core'
import UpdateProfileImage from './UpdateProfileImage'
import UpdateCoverImage from './UpdateCoverImage'
import { UserContext } from '../../App'
const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '40vh',
    marginTop: '60px',
    position: 'relative',
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
  const { userState } = useContext(UserContext)
  const classes = useStyles()
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            elevation={10}
            className={classes.paper}
            style={{
              backgroundImage: user.cover_image
                ? 'url(' + user.cover_image + ')'
                : null,
            }}
          >
            <UpdateProfileImage user={user} type="profile" />
            {userState.currentUser.id == user.id && (
              <>
                <UpdateCoverImage />
              </>
            )}
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
        
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfileHeader
