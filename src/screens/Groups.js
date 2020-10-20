import React, { useState, useEffect,Suspense, lazy, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'
import {
  Typography,
  makeStyles,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  ListSubheader,
} from '@material-ui/core'

import { UIContext, UserContext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-regular-svg-icons'
import {
  faNewspaper,
  faCompass,
  faPlusCircle,
  faPlus,
  faPeopleCarry,
} from '@fortawesome/free-solid-svg-icons'

import { Settings, Pages } from '@material-ui/icons'
import Loader from '../components/Loader'
import DrawerBar from '../components/Navbar/DrawerBar'
const Feeds = lazy(() => import('../components/Groups/Feeds'))
const Discovers = lazy(() => import('../components/Groups/Discovers'))

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '16px',
  },
  headingContainer: {
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
function Groups() {
  const classes = useStyles()
  const [tabs, setTabs] = useState('discover')
  const theme = useTheme()
  const screen = useMediaQuery(theme.breakpoints.between(960, 1400))
  const { uiState } = useContext(UIContext)

  const { userState } = useContext(UserContext)

  const history = useHistory()
  // useEffect(() => {
  //   if (!userState.isLoggedIn) {
  //     history.push('/')
  //   }
  // }, [])
  const handleTabChange = (value) => {
    setTabs(value)
  }

  const sidebarItems = (
    <div className={classes.container}>
      <div className={classes.headingContainer}>
        <Typography style={{ fontSize: '24px', fontWeight: '800' }}>
          Groups
        </Typography>
        <Avatar
          style={{
            color: 'rgb(96,104,111)',
            background: 'rgb(228,230,235)',
          }}
        >
          <Settings />
        </Avatar>
      </div>
      <div style={{ marginTop: '8px', width: '90%' }}>
        <Search placeholder="Search Groups" />
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        style={{ width: '94%', marginTop: '16px' }}
      >
        <ListItem
          button
          onClick={() => handleTabChange('feed')}
          style={{
            background: tabs === 'feed' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background: tabs === 'feed' ? 'rgb(24,119,242)' : '#E4E6EB',
                color: tabs === 'feed' ? '#fff' : 'rgb(96,104,111)',
              }}
            >
              <FontAwesomeIcon icon={faNewspaper} />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Your Feed" />
        </ListItem>
        <ListItem
          button
          onClick={() => handleTabChange('discover')}
          style={{
            background: tabs === 'discover' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background: tabs === 'discover' ? 'rgb(24,119,242)' : '#E4E6EB',
                color: tabs === 'discover' ? '#fff' : 'rgb(96,104,111)',
              }}
            >
              <FontAwesomeIcon icon={faCompass} />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Discover" />
        </ListItem>
      </List>
      <Button
        style={{
          background: 'rgb(231,243,253)',
          width: '90%',
          color: 'rgb(44,122,242)',
        }}
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Create Groups
      </Button>

      <List
        subheader={
          <ListSubheader>
            <Typography style={{ fontWeight: '800' }}>Your Groups</Typography>
          </ListSubheader>
        }
        style={{ marginTop: '22px' }}
      ></List>
    </div>
  )

  return (
    <div>
      {!uiState.mdScreen && <DrawerBar>{sidebarItems}</DrawerBar>}
      {uiState.mdScreen && <Sidebar>{sidebarItems}</Sidebar>}

      <div
        style={{
          marginLeft: uiState.mdScreen ? (screen ? '280px' : '380px') : 0,
        }}
      >
        <Suspense fallback={Loader}>
          {tabs === 'feed' && <Feeds />}
          {tabs === 'discover' && <Discovers />}
        </Suspense>
      </div>
    </div>
  )
}

export default Groups
