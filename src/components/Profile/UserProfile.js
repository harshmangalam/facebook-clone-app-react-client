import React from 'react'
import { MoreHoriz, Edit, SearchOutlined } from '@material-ui/icons'
import {
  Paper,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Avatar,
  Divider,
} from '@material-ui/core'

import ProfileHeader from './ProfileHeader'
import ProfileTimeline from './ProfileTimeline'

function UserProfile({ user,conScreen }) {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <Paper style={{ width: '100%' }}>
        <ProfileHeader user={user} />
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={12} md={8}>
            <Divider />
            <AppBar
              position="static"
              style={{ background: '#fff', color: 'black' }}
              elevation={0}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
              >
                <Tab label="Timeline" />
                <Tab label="About" />
                <Tab label="Friends" />
                <Tab label="Photos" />

                <IconButton>
                  <Avatar
                    style={{
                      background: 'rgb(228,230,235)',
                      color: 'rgb(29,32,35)',
                    }}
                  >
                    <Edit />
                  </Avatar>
                </IconButton>
                <IconButton>
                  <Avatar
                    style={{
                      background: 'rgb(228,230,235)',
                      color: 'rgb(29,32,35)',
                    }}
                  >
                    <SearchOutlined />
                  </Avatar>
                </IconButton>
                <IconButton>
                  <Avatar
                    style={{
                      background: 'rgb(228,230,235)',
                      color: 'rgb(29,32,35)',
                    }}
                  >
                    <MoreHoriz />
                  </Avatar>
                </IconButton>
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Paper>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={conScreen ? 12 : 6}>
          <TabPanel value={value} index={0}>
            <ProfileTimeline user={user} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            about
          </TabPanel>
          <TabPanel value={value} index={2}>
            Friends
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

export default UserProfile
