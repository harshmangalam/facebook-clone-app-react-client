import {
  Button,
  CardActions,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UIContext, UserContext } from '../App'
import Friend from "../components/Friends/Friend";
import { cancelFriendRequest, fetchSendedFriendRequests } from '../services/UserServices'

function SendedFriendRequests() {
  const { userDispatch, userState } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)
  useState(() => {
    async function sendedFriendRequest() {
      const res = await fetchSendedFriendRequests()
      if (res && res.data) {
        userDispatch({
          type: 'SET_FRIENDS_REQUEST_SENDED',
          payload: res.data.friends,
        })
      }
    }
    sendedFriendRequest()
  }, [])

  const handleCancelSendedFriendRequest = (request_id) => {
    cancelFriendRequest(request_id).then((res) => {
      if (res.data) {
        userDispatch({ type: "REMOVE_FRIENDS_REQUEST_SENDED", payload: request_id })

      }
      if (res.error) {
        uiDispatch({ type: "SET_MESSAGE", payload: { color: 'error', display: true, text: res.error.error } })
      }
    }).catch(err => console.log(err))
  }
  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={8} sm={12}>
            <Paper style={{ padding: '16px' }}>
              <CardHeader
                avatar={
                  <IconButton component={Link} to="/friends">
                    <ArrowBack />
                  </IconButton>
                }
                title={<Typography>Sended Friends Request</Typography>}
              />

              <div>
                {userState.sendedFriendRequests.length ? userState.sendedFriendRequests.map(request => (
                  <Friend user={request.user} key={request.id}>
                    <CardActions>
                      <Button
                        variant="contained"
                        style={{
                          background: 'rgb(228,230,235)',
                          color: 'black',
                        }}

                        onClick={() => handleCancelSendedFriendRequest(request.id)}
                      >
                        Cancel Request
                    </Button>
                    </CardActions>
                  </Friend>
                )) : null}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default SendedFriendRequests
