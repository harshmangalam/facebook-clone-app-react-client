import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '250px',
    borderRadius:'20px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100% 250px',
  },
  paperContent: {
    position: 'absolute',
    width: '100%',
    paddingLeft: '8px',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },

  overlay: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '30px',
    bottom: 0,
  },
}))
function CategoryCard({ category }) {
  const classes = useStyles()
  return (
    <div>
      <Paper
        elevation={10}
        className={classes.paper}
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className={classes.paperContent}>
          <Typography
            style={{ fontSize: '16px', fontWeight: '900', color: 'white' }}
          >
            {category.name}
          </Typography>
        </div>
        <div className={classes.overlay}></div>
      </Paper>
    </div>
  )
}

export default CategoryCard
