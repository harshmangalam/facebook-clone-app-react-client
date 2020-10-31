import React, { useContext } from 'react'
import Friend from './Friend'
import { Button, CardActions, Grid, Typography } from '@material-ui/core'
import { UserContext } from '../../App'
import useFriendActions from '../../hooks/useFriendActions'
function UserLists({ users }) {
  const { userState } = useContext(UserContext)

  const { sendFriendRequest } = useFriendActions()

  const handleSendFriendRequest = (user_id) => {
    sendFriendRequest(user_id)
  }

  const filterUser = (user) => {
    let s_index = userState.sendedFriendRequests.findIndex(
      (request) => request.user.id == user.id,
    )
    let r_index = userState.receivedFriendRequests.findIndex(
      (request) => request.user.id == user.id,
    )
    let already_friend = userState.currentUser.friends.findIndex(
      (friend) => friend.id == user.id,
    )
    let currentUser = userState.currentUser.id == user.id

    if (
      s_index === -1 &&
      r_index === -1 &&
      already_friend === -1 &&
      !currentUser
    ) {
      return true
    }
    return false
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
        ? users.map((user) => (
            <div key={user.id} style={{ width: '100%' }}>
              {filterUser(user) && (
                <Friend user={user}>
                  <CardActions>
                    <Button
                      onClick={() => handleSendFriendRequest(user.id)}
                      variant="contained"
                      style={{
                        background: 'rgb(1,133,243)',
                        color: 'white',
                      }}
                    >
                      Add Friend
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        background: 'rgb(240,242,245)',
                        color: 'black',
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Friend>
              )}
            </div>
          ))
        : null}
    </div>
  )
}

export default UserLists
