import React, { Fragment, useContext } from 'react'
import Friend from './Friend'
import { Button, CardActions, Typography } from '@material-ui/core'
import { sendFriendRequest } from '../../services/UserServices'
import { UIContext, UserContext } from '../../App'

function UserLists({ users }) {
  const { uiDispatch } = useContext(UIContext)
  const { userState, userDispatch } = useContext(UserContext)


  const handleSendFriendRequest = (user_id) => {
    sendFriendRequest(user_id)
      .then((res) => {
        if (res.data) {
          userDispatch({
            type: 'ADD_FRIENDS_REQUEST_SENDED',
            payload: res.data.friend,
          })
          userDispatch({ type: 'REMOVE_USER', payload: user_id })
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              color: 'success',
              display: true,
              text: res.data.message,
            },
          })
        }
        if (res.error) {
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: { color: 'error', display: true, text: res.error },
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const filterUser = (users) => {
    return  users.filter(user => userState.currentUser.friends.findIndex(u => u.id == user.id) === -1)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginLeft: '8px',
        marginRight: '6px',
      }}
    >
      <Typography
        style={{
          fontWeight: '700',
          fontSize: '16px',
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        People You May Know
      </Typography>
      {users && users.length
        ? filterUser(users).map((user) => (
          <div key={user.id}>
            <Friend user={user}>
              <CardActions>
                <Button
                  onClick={() => handleSendFriendRequest(user.id)}
                  variant="contained"
                  style={{
                    background: 'rgb(24,119,242)',
                    color: 'white',
                  }}
                >
                  Add Friend
                  </Button>
                <Button
                  variant="contained"
                  style={{
                    background: 'rgb(228,230,235)',
                    color: 'black',
                  }}
                >
                  Remove
                  </Button>
              </CardActions>
            </Friend>
          </div>
        ))
        : null}
    </div>
  )
}

export default UserLists
