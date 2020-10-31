import React, { useContext, useEffect } from 'react'
import {
  Typography,
  makeStyles,
  Avatar,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core'
import Sidebar from '../components/Sidebar'
import UserLists from '../components/Friends/UserLists'
import { Link, useHistory } from 'react-router-dom'
import { UIContext, UserContext } from '../App'
import DrawerBar from '../components/Navbar/DrawerBar'
import UserProfile from '../components/Profile/UserProfile'
import Friend from '../components/Friends/Friend'
import useFriendAction from '../hooks/useFriendActions'
import {
  fetchIncommingFriendRequests,
  fetchRecommandedUsers,
  fetchSendedFriendRequests,
} from '../services/UserServices'
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
  const { uiState, uiDispatch } = useContext(UIContext)
  const { userState, userDispatch } = useContext(UserContext)

  useEffect(() => {
    uiDispatch({ type: 'SET_NAV_MENU', payload: true })
    async function sendedFriendRequest() {
      const res = await fetchSendedFriendRequests()
      if (res.data) {
        userDispatch({
          type: 'SET_FRIENDS_REQUEST_SENDED',
          payload: res.data.friends,
        })
      }
    }

    async function incommingFriendRequest() {
      const res = await fetchIncommingFriendRequests()
      if (res && res.data) {
        userDispatch({
          type: 'SET_FRIENDS_REQUEST_RECEIVED',
          payload: res.data.friends,
        })
      }
    }

    async function recommandedUser() {
      const res = await fetchRecommandedUsers()
      if (res && res.data) {
        userDispatch({
          type: 'SET_USERS',
          payload: res.data.users,
        })
      }
    }

    recommandedUser()
    incommingFriendRequest()
    sendedFriendRequest()

    return () => {
      userDispatch({ type: 'REMOVE_SELECTED_USER_PROFILE', payload: null })
      uiDispatch({ type: 'SET_NAV_MENU', payload: false })
    }
  }, [])

  const {
    acceptFriendRequest,
    declineFriendRequest,
    cancelFriendRequest,
  } = useFriendAction()

  const handleAcceptFriendRequest = (request_id) => {
    acceptFriendRequest(request_id)
  }

  const handleDeclineFriendRequest = (request_id) => {
    declineFriendRequest(request_id)
  }

  const handleCancelFriendRequest = (request_id) => {
    cancelFriendRequest(request_id)
  }

  const metaData = (
    <div className={classes.sidebarContainer}>
      <Typography variant="h4">Friends</Typography>

      {userState.sendedFriendRequests.length ? (
        <>
          <Typography variant="h6">Sended Friend Request</Typography>
          {userState.sendedFriendRequests.map((request) => (
            <Friend user={request.user} key={request.id}>
              <CardActions>
                <Button
                  onClick={() => handleCancelFriendRequest(request.id)}
                  variant="contained"
                  style={{
                    background: 'tomato',
                    color: 'white',
                  }}
                >
                  Cancel
                </Button>
              </CardActions>
            </Friend>
          ))}
        </>
      ) : null}

      {userState.receivedFriendRequests.length ? (
        <>
          <Typography variant="h6">Incomming Friend Requests</Typography>

          {userState.receivedFriendRequests.map((request) => (
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
          ))}
        </>
      ) : null}
    </div>
  )
  return (
    <div>
      {uiState.mdScreen ? (
        <Grid container spacing={0}>
          <Grid item md={3}>
            <Sidebar background={uiState.darkMode && 'rgb(36,37,38)'}>
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
        <div
          className={classes.main}
          style={{ backgroundColor: uiState.darkMode ? 'rgb(24,25,26)' : null }}
        >
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
