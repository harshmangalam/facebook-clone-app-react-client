import React,{Fragment} from 'react'
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  Button,
  Avatar,
} from '@material-ui/core'
import { Movie as MovieIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '60vh',
    marginTop: '60px',
    position: 'relative',
    backgroundImage: `url(${require('../../assets/shows.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100% 60vh',
  },
  paperContent: {
    position: 'absolute',
    width: '100%',
    padding: '16px',
    bottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },

  overlay: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '60vh',
  },
  Avatar: { width: '170px', height: '170px', borderRadius: '10px' },
  image: {
    transition: '0.7s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))
function Shows() {
  const classes = useStyles()
  return (
    <Fragment>
      <Grid container justify="center" alignItems="center">
       <Grid item xs={12} sm={12}  md={10}>
       <Paper elevation={10} className={classes.paper}>
          <div className={classes.paperContent}>
            <div>
              <Typography
                style={{ fontSize: '22px', fontWeight: '700', color: 'white' }}
              >
                Featured Shows
              </Typography>
              <Typography
                style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}
              >
                Curse of Akakor
              </Typography>
            </div>

            <div>
              <Button
                startIcon={<MovieIcon />}
                style={{
                  background: 'tomato',
                  color: 'white',
                  fontWeight: '700',
                  padding: '16px',
                  fontSize: '16px',
                }}
              >
                See All Episodes
              </Button>
            </div>
          </div>
          <div className={classes.overlay}></div>
        </Paper>
       </Grid>
      </Grid>

      <Grid container style={{ marginTop: '20px' }}>
        <Typography
          style={{ fontSize: '20px', fontWeight: '700', padding: '8px 16px' }}
        >
          Facebook Originals
        </Typography>
      </Grid>
      <Grid
        container
        spacing={1}
        style={{ marginTop: '20px'}}
        justify="center"
        alignItems="center"
      >
        {shows.map((show) => (
          <Grid item >
            <Avatar variant="square" className={classes.Avatar}>
              <img
                src={show.image}
                width="100%"
                height="100%"
                className={classes.image}
              />
            </Avatar>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

const shows = [
  { image: require('../../assets/shows1.jpg') },
  { image: require('../../assets/shows2.jpg') },
  { image: require('../../assets/shows3.jpg') },
  { image: require('../../assets/shows4.png') },
  { image: require('../../assets/shows5.jpg') },
  { image: require('../../assets/shows6.jpg') },
  { image: require('../../assets/shows1.jpg') },
  { image: require('../../assets/shows2.jpg') },
  { image: require('../../assets/shows3.jpg') },
  { image: require('../../assets/shows4.png') },
  { image: require('../../assets/shows5.jpg') },
  { image: require('../../assets/shows6.jpg') },
]

export default Shows
