import React, { useContext, useState } from 'react'
import { UIContext } from '../App'
import moment from 'moment'
import {
  Menu,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { Notifications as NotificationIcon } from '@material-ui/icons'

function NotificationMenu({ children }) {
  const { uiState } = useContext(UIContext)
  const [menu, setMenu] = useState(null)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <div>
      <IconButton
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: !uiState.darkMode ? 'black' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
        onClick={(e) => setMenu(e.currentTarget)}
      >
        {children}
      </IconButton>

      <Menu
        id="post-menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={() => setMenu(null)}
        style={{ marginTop: '50px' }}
        elevation={7}
      >
        <List
          subheader={
            <ListSubheader>
              <Typography style={{ fontSize: '22px', fontWeight: '800' }}>
                Notifications
              </Typography>
            </ListSubheader>
          }
        >
          {uiState.notifications ? (
            uiState.notifications.map((notification) => (
              <ListItem button key={notification.id}>
                <ListItemIcon>
                  <Avatar
                    style={{
                      background: 'seagreen',
                      color: '#fff',
                    }}
                  >
                    <NotificationIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1" style={{ fontSize: '15px' }}>
                    {notification.body}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: '13px',
                      color: !uiState.darkMode ? '#65676B' : null,
                    }}
                  >
                    {moment(notification.createdAt).fromNow()}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText>
                <Typography style={{ fontSize: '16px' }}>
                  No Notifications
                </Typography>
              </ListItemText>
            </ListItem>
          )}
        </List>
      </Menu>
    </div>
  )
}

export default NotificationMenu
