import React, { useContext, useState } from 'react'
import { UIContext } from '../../App'
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
import {
  Add as AddIcon,
  PostAdd as PostIcon,
  Book as BookIcon,
  Event as EventIcon,
} from '@material-ui/icons'

function CreatePostMenu() {
  const { uiDispatch } = useContext(UIContext)

  const [postMenu, setPostMenu] = useState(null)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const handlePostOpen = () => {
    uiDispatch({ type: 'SET_POST_MODEL', payload: true })
    setPostMenu(null)
  }
  return (
    <div>
      <IconButton
        style={{
          marginLeft: '8px',
          color: 'black',
          backgroundColor: '#F0F2F5',
        }}
        onClick={(e) => setPostMenu(e.currentTarget)}
      >
        <AddIcon
          style={{ width: xsScreen && '20px', height: xsScreen && '20px' }}
        />
      </IconButton>

      <Menu
        id="post-menu"
        anchorEl={postMenu}
        keepMounted
        open={Boolean(postMenu)}
        onClose={() => setPostMenu(null)}
        style={{ marginTop: '50px' }}
        elevation={0}
      >
        <Paper style={{ width: '360px', overflowX: 'hidden' }} elevation={8}>
          <List
            subheader={
              <ListSubheader>
                <Typography style={{ fontSize: '22px', fontWeight: '800' }}>
                  Create
                </Typography>
              </ListSubheader>
            }
          >
            <ListItem button onClick={handlePostOpen}>
              <ListItemIcon>
                <Avatar
                  style={{
                    background: 'rgb(228,230,235)',
                    color: 'rgb(96,104,111)',
                  }}
                >
                  <PostIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText>
                <Typography style={{ fontSize: '15px' }}> Post</Typography>
                <Typography style={{ fontSize: '13px', color: '#65676B' }}>
                  Share a Post on News Feed
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Menu>
    </div>
  )
}

export default CreatePostMenu
