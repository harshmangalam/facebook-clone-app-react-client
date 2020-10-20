import React, { useContext, useState } from 'react'
import { UserContext, UIContext } from '../../App'
import { LogoutUser } from '../../services/AuthService'
import { Link, useHistory } from 'react-router-dom'
import {
  Menu,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@material-ui/icons'
import AvartarText from '../UI/AvartarText'
function ProfileMenu() {
  const history = useHistory()
  const { userState, userDispatch } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)
  const [profileMenu, setProfileMenu] = useState(null)

  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const handleUserLogout = () => {
    LogoutUser()
      .then((res) => {
        if (res.data) {
          userDispatch({
            type: 'ADD_RECENT_ACCOUNT',
            payload: res.data.account,
          })
          userDispatch({ type: 'LOGOUT_USER' })
          history.push('/')
        }
        if (res.error) {
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              color: 'error',
              display: true,
              text: res.data.error,
            },
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <IconButton
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: 'black',
          backgroundColor: '#F0F2F5',
        }}
        onClick={(e) => setProfileMenu(e.currentTarget)}
      >
        <FontAwesomeIcon icon={faChevronDown} size={xsScreen ? 'xs' : 'sm'} />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={profileMenu}
        open={Boolean(profileMenu)}
        onClose={() => setProfileMenu(null)}
        style={{ marginTop: '50px' }}
        elevation={0}
      >
        <Paper style={{ width: '360px', overflowX: 'hidden' }} elevation={8}>
          <List>
            <ListItem
              button
              component={Link}
              to={`/profile/${userState.currentUser.id}`}
            >
              <ListItemIcon>
                {userState.currentUser.profile_pic ? (
                  <Avatar
                    style={{
                      width: '60px',
                      height: '60px',
                    }}
                  >
                    <img
                      src={userState.currentUser.profile_pic}
                      width="100%"
                      height="100%"
                    />
                  </Avatar>
                ) : (
                  <AvartarText
                    text={userState.currentUser.name}
                    bg={userState.currentUser.active ? 'seagreen' : 'tomato'}
                  />
                )}
              </ListItemIcon>
              <ListItemText style={{ marginLeft: '8px' }}>
                <Typography style={{ fontSize: '17px', fontWeight: '700' }}>
                  {userState.currentUser.name}
                </Typography>
                <Typography>See Your Profile</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Avatar
                  style={{
                    background: 'rgb(228,230,235)',
                    color: 'rgb(96,104,111)',
                  }}
                >
                  <SettingsIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText>
                <Typography style={{ fontSize: '15px' }}> Settings</Typography>
              </ListItemText>
            </ListItem>

            <ListItem button onClick={handleUserLogout}>
              <ListItemIcon>
                <Avatar
                  style={{
                    background: 'rgb(228,230,235)',
                    color: 'rgb(96,104,111)',
                  }}
                >
                  <LogoutIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText>
                <Typography style={{ fontSize: '15px' }}> Logout</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Menu>
    </div>
  )
}

export default ProfileMenu
