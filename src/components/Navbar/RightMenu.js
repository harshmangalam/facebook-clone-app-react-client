import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UIContext, UserContext } from '../../App'

import {
  Button,
  Chip,
  Avatar,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import useStyles from './styles'

import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileMenu from './ProfileMenu'
import CreatePostMenu from './CreatePostMenu'
import AvartarText from '../UI/AvartarText'

function RightMenu() {
  const classes = useStyles()
  const { uiState } = useContext(UIContext)
  const { userState } = useContext(UserContext)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const defaultPropsNotif = {
    color: 'error',
    children: <FontAwesomeIcon icon={faBell} size={xsScreen ? 'xs' : 'sm'} />,
  }

  return (
    <Fragment>
      {uiState.mdScreen && (
        <Button component={NavLink} activeStyle={{ border: '3px dotted rgb(240,242,245)' }} to={`/profile/${userState.currentUser.id}`}>
          <Chip
            label={
              <h3>
                {userState.currentUser.name.split(' ')[0].slice(0, 5) + '..'}
              </h3>
            }
            className={classes.profile_chip}
            avatar={
              userState.currentUser.profile_pic ? (
                <Avatar alt="Natacha" src={userState.currentUser.profile_pic} />
              ) : (
                  <AvartarText
                    text={userState.currentUser.name}
                    bg={userState.currentUser.active ? 'seagreen' : 'tomato'}
                  />
                )
            }
          />
        </Button>
      )}

      <CreatePostMenu />
      <IconButton
        component={NavLink}
        activeStyle={{color: 'rgb(1,133,243)' }} to="/messenger"
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: 'black',
          backgroundColor: '#F0F2F5',
        }}
      >
        <FontAwesomeIcon
          icon={faFacebookMessenger}
          size={xsScreen ? 'xs' : 'sm'}
        />
      </IconButton>
      <IconButton
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: 'black',
          backgroundColor: '#F0F2F5',
        }}
      >
        <Badge max={10} badgeContent={99} {...defaultPropsNotif} />
      </IconButton>

      <ProfileMenu />
    </Fragment>
  )
}

export default RightMenu
