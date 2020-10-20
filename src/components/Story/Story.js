import React from 'react'
import useStyles from './styles'
import {
  Card,
  CardMedia,
  Avatar,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core'
import {ChevronRightSharp as ArrowIcon} from '@material-ui/icons'
function Main() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Grid container spacing={1} alignItems="center" justify="flex-start">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <Grid item key={index} md={2} xs={2} sm={2}>
              <Card key={index} className={classes.card}>
                <CardMedia
                  image=""
                  title="Harsh Managalam"
                  className={classes.cardImg}
                />

                <div className={classes.cardAvatar}>
                  <Avatar
                    alt="Harsh Mangalam"
                    className={classes.avatarImg}
                    src=""
                  />
                </div>
                <div className={classes.cardTitle}>
                  <Typography noWrap variant="subtitle2">
                    <b>Harsh</b>
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
          <Grid item md={2} xs={2} sm={2}>
            <IconButton>
              <Avatar style={{ color: '#fff', background: 'rgb(1,133,243)' }}>
                <ArrowIcon />
              </Avatar>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Main
