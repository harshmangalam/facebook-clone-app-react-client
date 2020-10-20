import React, { useContext, useEffect } from 'react'
import {
  Typography,
  makeStyles,
  Avatar,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  CardActions,
  Button,
} from '@material-ui/core'
import Sidebar from '../components/Sidebar'
import UserLists from '../components/Friends/UserLists'
import { Link, useHistory } from 'react-router-dom'
import { UIContext, UserContext } from '../App'
import DrawerBar from '../components/Navbar/DrawerBar'
import UserProfile from '../components/Profile/UserProfile'
import {
  acceptFriendRequest,
  fetchIncommingFriendRequests,
  fetchRecommandedUsers,
  declineFriendRequest,
} from '../services/UserServices'
import Friend from '../components/Friends/Friend'

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '16px',
  },

  noRequest: { marginLeft: '32px', marginTop: '16px', color: 'grey' },
  divider: {
    width: '90%',
    height: '1px',
    background: 'rgb(206,208,212)',
    marginTop: '16px',
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    marginLeft: '320px',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: 0,
    },
  },

  avatar: { width: '112px', height: '112px', background: 'transparent' },
  image: { width: '100%', height: '100%' },
  selectText: {
    color: '#65676B',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    fontWeight: '700',
  },
}))
function Friends() {
  const classes = useStyles()
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.between(960, 1400))
  const { uiState, uiDispatch } = useContext(UIContext)
  const { userState, userDispatch } = useContext(UserContext)

  const history = useHistory()

  useEffect(() => {
    uiDispatch({ type: 'SET_NAV_MENU', payload: true })

    async function receivedFriendRequest() {
      const res = await fetchIncommingFriendRequests()
      if (res && res.data) {
        userDispatch({
          type: 'SET_FRIENDS_REQUEST_RECEIVED',
          payload: res.data.friends,
        })
      }
    }

    async function fetchRecommandedUser() {
      const res = await fetchRecommandedUsers()
      if (res && res.data) {
        userDispatch({
          type: 'SET_USERS',
          payload: res.data.users,
        })
      }
    }

    receivedFriendRequest()
    fetchRecommandedUser()

    return () => {
      userDispatch({ type: 'REMOVE_SELECTED_USER_PROFILE', payload: null })
      uiDispatch({ type: 'SET_NAV_MENU', payload: false })
    }
  }, [])

  const handleAcceptFriendRequest = (request_id) => {
    acceptFriendRequest(request_id).then((res) => {
      if (res.data) {

         userDispatch({
          type: 'ADD_FRIEND',
          payload: res.data.user,
        })
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_RECEIVED',
          payload: request_id,
        })
       
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', display: true, text: res.data.message },
        })
      }
      if (res.error) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'error', display: true, text: res.error },
        })
      }
    })
  }

  const handleDeclineFriendRequest = (request_id) => {
    declineFriendRequest(request_id).then((res) => {
      if (res.data) {
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_RECEIVED',
          payload: request_id,
        })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', display: true, text: res.data.message },
        })
      }
      if (res.error) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'error', display: true, text: res.error },
        })
      }
    })
  }

  const metaData = (
    <div className={classes.sidebarContainer}>
      <Typography variant="h4">Friends</Typography>
      <Typography variant="h6">Friend Requests</Typography>
      <Typography>
        <Link
          style={{ textDecoration: 'none' }}
          to="/friends/sended_friend_request"
        >
          view sent request
        </Link>
      </Typography>

      {userState.receivedFriendRequests.length
        ? userState.receivedFriendRequests.map((request) => (
            <div>
              <Friend user={request.user} key={request.id}>
                <CardActions>
                  <Button
                    onClick={() => handleAcceptFriendRequest(request.id)}
                    variant="contained"
                    style={{
                      background: 'seagreen',
                      color: 'white',
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      background: 'tomato',
                      color: 'white',
                    }}
                    onClick={() => handleDeclineFriendRequest(request.id)}
                  >
                    Decline
                  </Button>
                </CardActions>
              </Friend>
            </div>
          ))
        : null}

      <div className={classes.divider}></div>
    </div>
  )
  return (
    <div>
      {uiState.mdScreen ? (
        <Grid container spacing={0}>
          <Grid item md={3}>
            <Sidebar>
              {metaData}

              <UserLists users={userState.users} />
            </Sidebar>
          </Grid>
          <Grid item md={8} style={{ margin: 'auto' }}>
            {userState.selectedUserProfile && (
              <UserProfile
                user={userState.selectedUserProfile}
                conScreen={true}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <>
          <DrawerBar>
            {metaData}

            <UserLists users={userState.users} />
          </DrawerBar>
          {userState.selectedUserProfile && (
            <UserProfile user={userState.selectedUserProfile} />
          )}
        </>
      )}

      {!userState.selectedUserProfile && (
        <div className={classes.main}>
          <Avatar variant="square" className={classes.avatar}>
            <img
              src={require('../assets/selectFriends.svg')}
              className={classes.image}
            />
          </Avatar>
          <Typography className={classes.selectText}>
            Select people's names to preview their profile.
          </Typography>
        </div>
      )}
    </div>
  )
}

export default Friends
