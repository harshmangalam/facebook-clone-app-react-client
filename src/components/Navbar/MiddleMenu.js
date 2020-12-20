import React, { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'

import useStyles from './styles'

import { Home, HomeOutlined, Person, PersonOutlined } from '@material-ui/icons'

function MiddleMenu() {
  const classes = useStyles()
  const location = useLocation()

  return (
    <Fragment>
      <Button
        component={NavLink}
        activeClassName={classes.activeBtn}
        to="/home"
        className={classes.buttonItemMiddle}
      >
        {location.pathname == '/home' ? (
          <Home
            fontSize="large"
            style={{
              color: 'rgb(0,133,243)',
            }}
          />
        ) : (
          <HomeOutlined fontSize="large" />
        )}
      </Button>
      <Button
        component={NavLink}
        activeClassName={classes.activeBtn}
        to="/friends"
        className={classes.buttonItemMiddle}
      >
        {location.pathname == '/friends' ? (
          <Person fontSize="large" style={{ color: 'rgb(0,133,243)' }} />
        ) : (
          <PersonOutlined fontSize="large" />
        )}
      </Button>
    </Fragment>
  )
}

export default MiddleMenu
