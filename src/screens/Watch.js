import React, { useState, useEffect, lazy, Suspense, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Grid,
  makeStyles,
} from '@material-ui/core'
import Search from '../components/Search'
import { MovieCreation, LiveTv, PlayArrow, Bookmark } from '@material-ui/icons'
import Loader from '../components/Loader'
import { UIContext, UserContext } from '../App'
import DrawerBar from '../components/Navbar/DrawerBar'
const Videos = lazy(() => import('../components/Watch/Videos'))
const Shows = lazy(() => import('../components/Watch/Shows'))
const LiveVideos = lazy(() => import('../components/Watch/LiveVideos'))
const SavedVideos = lazy(() => import('../components/Watch/SavedVideos'))
const PopularVideos = lazy(() => import('../components/Watch/PopularVideos.js'))
const LatestVideos = lazy(() => import('../components/Watch/LatestVideos.js'))

const useStyles = makeStyles((theme) => ({}))
function Watch() {
  const [tabs, setTabs] = useState('shows')
  const handleTabChange = (value) => {
    uiDispatch({ type: 'SET_DRAWER', payload: false })
    setTabs(value)
  }

  const { uiState, uiDispatch } = useContext(UIContext)
  const { userState } = useContext(UserContext)

  const history = useHistory()
  useEffect(() => {
    uiDispatch({ type: 'SET_NAV_MENU', payload: true })
    uiDispatch({ type: 'SET_DRAWER', payload: false })

    return () => {
      uiDispatch({ type: 'SET_NAV_MENU', payload: false })
      uiDispatch({ type: 'SET_DRAWER', payload: false })
    }
  }, [])

  const sidebarItems = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: '8px',
      }}
    >
      <Typography
        style={{ fontWeight: '700', fontSize: '26px', marginTop: '8px' }}
      >
        Watch
      </Typography>
      <div
        style={{
          width: '90%',
          marginTop: '8px',
        }}
      >
        <Search placeholder="Search Videos" />
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        style={{ width: '94%', marginTop: '16px' }}
      >
        <ListItem
          button
          onClick={() => handleTabChange('home')}
          style={{
            background: tabs === 'home' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background: tabs === 'home' ? 'rgb(24,119,242)' : '#E4E6EB',
                color: tabs === 'home' ? '#fff' : 'rgb(96,104,111)',
              }}
            >
              <PlayArrow />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          onClick={() => handleTabChange('shows')}
          style={{
            background: tabs === 'shows' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background: tabs === 'shows' ? 'rgb(24,119,242)' : '#E4E6EB',
                color: tabs === 'shows' ? '#fff' : 'rgb(96,104,111)',
              }}
            >
              <MovieCreation />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Shows" />
        </ListItem>

        <ListItem
          button
          onClick={() => handleTabChange('live')}
          style={{
            background: tabs === 'live' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background: tabs === 'live' ? 'rgb(241,65,74)' : '#E4E6EB',
                color: tabs === 'live' ? '#fff' : 'rgb(96,104,111)',
              }}
            >
              <LiveTv />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Live" />
        </ListItem>

        <ListItem
          button
          onClick={() => handleTabChange('savedvideos')}
          style={{
            background: tabs === 'savedvideos' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background:
                  tabs === 'savedvideos' ? 'rgb(252,216,114)' : '#E4E6EB',
                color: tabs === 'savedvideos' ? '#fff' : 'rgb(96,104,111)',
              }}
            >
              <Bookmark />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Saved Videos" />
        </ListItem>
      </List>

      <Divider style={{ background: '#E4E6EB', width: '90%' }} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        style={{ width: '94%', marginTop: '16px' }}
        subheader={
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '8px',
            }}
          >
            Your Watchlist
          </Typography>
        }
      >
        <ListItem
          button
          onClick={() => handleTabChange('popularvideos')}
          style={{
            background: tabs === 'popularvideos' && 'rgb(235,241,254)',
            borderRadius: '10px',
          }}
        >
          <ListItemIcon style={{ width: 'auto', height: 'auto' }}>
            <Avatar
              style={{
                width: '30px',
                height: '30px',
                padding: '20px',
                background: 'rgb(84,199,236)',
                color: '#fff',
              }}
            >
              <PlayArrow />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Popular Videos" />
        </ListItem>
      </List>
    </div>
  )
  return (
    <div>
      {uiState.mdScreen ? (
        <Sidebar>{sidebarItems}</Sidebar>
      ) : (
        <DrawerBar>{sidebarItems}</DrawerBar>
      )}

      <div
        style={{
          marginLeft: uiState.mdScreen ? '380px' : 0,
          padding: '8px 16px',
        }}
      >
        <Suspense fallback={Loader}>
          {tabs === 'home' && <Videos />}
          {tabs === 'shows' && <Shows />}
          {tabs === 'live' && <LiveVideos />}
          {tabs === 'savedvideos' && <SavedVideos />}
          {tabs === 'latestvideos' && <LatestVideos />}
          {tabs === 'popularvideos' && <PopularVideos />}
        </Suspense>
      </div>
    </div>
  )
}

export default Watch
