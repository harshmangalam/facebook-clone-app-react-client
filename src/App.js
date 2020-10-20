import React, {
  Fragment,
  lazy,
  Suspense,
  createContext,
  useReducer,
  useEffect,
} from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import { Theme } from './Theme.js'

import { Snackbar, useMediaQuery, useTheme } from '@material-ui/core'

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Loader from './components/Loader'
import BottomNav from './components/Navbar/BottomNav.js'

import { initialUIState, UIReducer } from './context/UIContext'
import { UserReducer, initialUserState } from './context/UserContext'
import { PostReducer, initialPostState } from './context/PostContext'
import { ChatReducer, initialChatState } from './context/ChatContext'

import { fetchCurrentUser } from './services/AuthService'

import jwtDecode from 'jwt-decode'

import ProtectedRoute from './utils/ProtectedRoute'
import { Alert } from '@material-ui/lab'

import io from 'socket.io-client'

export const UIContext = createContext()
export const UserContext = createContext()
export const PostContext = createContext()
export const ChatContext = createContext()

const Home = lazy(() => import('./screens/Home'))
const Friends = lazy(() => import('./screens/Friends'))
const Auth = lazy(() => import('./screens/Auth'))
const Profile = lazy(() => import('./screens/Profile'))
const Post = lazy(() => import('./screens/Post'))
const Messenger = lazy(() => import('./screens/Messenger'))
const SendedFriendRequests = lazy(() =>
  import('./screens/SendedFriendRequests'),
)

const token = localStorage.token && JSON.parse(localStorage.token)

function App() {
  const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState)
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState)
  const [postState, postDispatch] = useReducer(PostReducer, initialPostState)
  const [chatState, chatDispatch] = useReducer(ChatReducer, initialChatState)

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    uiDispatch({ type: 'SET_USER_SCREEN', payload: mdScreen })
  }, [mdScreen])

  useEffect(() => {
    async function loadCurrentUser() {
      if (token) {
        const decodeToken = jwtDecode(token)

        if (decodeToken.exp * 1000 < Date.now()) {
          userDispatch({ type: 'LOGOUT_USER' })
        } else {
          const currentUser = await fetchCurrentUser()
          if (currentUser && currentUser.data) {
            userDispatch({
              type: 'SET_CURRENT_USER',
              payload: currentUser.data.user,
            })
          }
        }
      }
    }

    function loadRecentAccounts() {
      const accounts = localStorage.accounts
        ? JSON.parse(localStorage.accounts)
        : []
      userDispatch({ type: 'RECENT_ACCOUNTS', payload: accounts })
    }

    loadCurrentUser()
    loadRecentAccounts()
  }, [])

  useEffect(() => {
    if (userState.isLoggedIn) {
      let socketio = io(`${process.env.REACT_APP_ENDPOINT}`)
      userDispatch({ type: 'SET_SOCKETIO', payload: socketio })
      socketio.on('connect', () => {
        console.log('connected')
      })

      socketio.on('friend-logout-status', ({ user_id }) => {
        userDispatch({ type: 'FRIEND_LOGOUT', payload: user_id })
      })

      socketio.on('friend-login-status', ({ user_id }) => {
        userDispatch({ type: 'FRIEND_LOGIN', payload: user_id })
      })

      socketio.on('friend-request-status', ({ sender }) => {
        userDispatch({
          type: 'ADD_FRIENDS_REQUEST_RECEIVED',
          payload: sender,
        })
      })

      socketio.on('sended-friend-request-cancel', ({ requestId }) => {
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_RECEIVED',
          payload: requestId,
        })
      })

      socketio.on('friend-request-accept-status', ({ user, request_id }) => {
        console.log(user, request_id)
        userDispatch({
          type: 'ADD_FRIEND',
          payload: user,
        })
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_RECEIVED',
          payload: request_id,
        })
      })

      socketio.on('received-friend-request-decline', ({ requestId }) => {
        userDispatch({
          type: 'REMOVE_FRIENDS_REQUEST_SENDED',
          payload: requestId,
        })
      })

      socketio.on('new-post', ({ data }) => {
        postDispatch({ type: 'ADD_POST', payload: data })
      })

      socketio.on('post-like-change', ({ data }) => {
        postDispatch({
          type: 'LIKE_UNLIKE_POST',
          payload: data,
        })
      })

      socketio.on('post-comment', ({ data }) => {
        postDispatch({ type: 'ADD_POST_COMMENT', payload: data })
      })

      socketio.on('comment-like-change', ({ data }) => {
        postDispatch({
          type: 'LIKE_UNLIKE_COMMENT',
          payload: data,
        })
      })

      socketio.on('new-message', ({ data }) => {
        chatDispatch({ type: 'ADD_MESSAGE', payload: data })
      })
      return () => {
        socketio.disconnect()
        userDispatch({ type: 'SET_SOCKETIO', payload: null })
        console.log('disconnect')
      }
    }
  }, [userState.isLoggedIn])

  return (
    <UIContext.Provider value={{ uiState, uiDispatch }}>
      <UserContext.Provider value={{ userState, userDispatch }}>
        <PostContext.Provider value={{ postState, postDispatch }}>
          <ChatContext.Provider value={{ chatState, chatDispatch }}>
            <ThemeProvider theme={Theme}>
              <Fragment>
                <Router>
                  {userState.isLoggedIn && <Navbar />}

                  <div>
                    <Suspense fallback={<Loader />}>
                      <Switch>
                        <Route
                          exact
                          path="/"
                          render={(props) =>
                            !userState.isLoggedIn ? (
                              <Auth />
                            ) : (
                              <Redirect to="/home" />
                            )
                          }
                        />
                        <ProtectedRoute
                          exact
                          path="/friends"
                          component={Friends}
                          isLoggedIn={userState.isLoggedIn}
                        />
                        <ProtectedRoute
                          exact
                          path="/messenger"
                          component={Messenger}
                          isLoggedIn={userState.isLoggedIn}
                        />
                        <ProtectedRoute
                          exact
                          path="/profile/:userId"
                          component={Profile}
                          isLoggedIn={userState.isLoggedIn}
                        />
                        <ProtectedRoute
                          exact
                          path="/home"
                          component={Home}
                          isLoggedIn={userState.isLoggedIn}
                        />
                        <ProtectedRoute
                          exact
                          path="/post/:postId"
                          component={Post}
                          isLoggedIn={userState.isLoggedIn}
                        />
                        <ProtectedRoute
                          exact
                          path="/friends/sended_friend_request"
                          component={SendedFriendRequests}
                          isLoggedIn={userState.isLoggedIn}
                        />
                      </Switch>
                    </Suspense>
                  </div>

                  {uiState.message && (
                    <Snackbar
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      open={uiState.message.display}
                      autoHideDuration={6000}
                      onClose={() =>
                        uiDispatch({ type: 'SET_MESSAGE', payload: null })
                      }
                      style={{ color: '#fff', marginTop: 60 }}
                    >
                      <Alert
                        onClose={() =>
                          uiDispatch({ type: 'SET_MESSAGE', payload: null })
                        }
                        severity={uiState.message.color}
                      >
                        {uiState.message.text}
                      </Alert>
                    </Snackbar>
                  )}

                  {!uiState.mdScreen && userState.isLoggedIn ? (
                    <BottomNav />
                  ) : null}
                </Router>
              </Fragment>
            </ThemeProvider>
          </ChatContext.Provider>
        </PostContext.Provider>
      </UserContext.Provider>
    </UIContext.Provider>
  )
}

export default App
