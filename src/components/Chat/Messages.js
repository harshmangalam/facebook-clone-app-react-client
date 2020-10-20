import { Avatar, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useRef } from 'react'
import { ChatContext, UserContext } from '../../App'
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  me: {
    background: 'rgb(220,245,198)',
    padding: '8px',
    maxWidth: '60%',
    float: 'right',
    marginTop: '16px',
  },

  partner: {
    background: '#fff',
    padding: '8px',
    maxWidth: '60%',

    margin: 'auto',
    float: 'left',
    padding: '8px',
    marginTop: '16px',
  },
  date: {
    fontSize: '12px',
    color: '#00000099',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px',
    margin: 'auto',
  },
}))
function Messages() {
  const classes = useStyles()

  const scrollDiv = useRef(null)

  const { chatState } = useContext(ChatContext)
  const { userState } = useContext(UserContext)

  useEffect(() => {
    scrollToBottom()
  }, [chatState.messages.length])

  function scrollToBottom() {
    scrollDiv.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <Grid container>
      {chatState.messages.length
        ? chatState.messages.map((message) => (
            <Fragment key={message.id}>
              {userState.currentUser.id !== message.sender.id ? (
                <Grid item xs={12} md={12} sm={12}>
                  <Paper className={classes.partner}>
                    {message.body.text && (
                      <Typography style={{wordWrap:"break-word"}}>{message.body.text}</Typography>
                    )}
                    {message.body.image && (
                      <Avatar variant="square">
                        <img
                          src={message.body.image}
                          width="100%"
                          height="100%"
                        />
                      </Avatar>
                    )}
                    <Typography  className={classes.date}>
                      {moment(message.createdAt).fromNow()}
                    </Typography>
                  </Paper>
                </Grid>
              ) : (
                <Grid
                  item
                  md={12}
                  xs={12}
                  sm={12}
                  style={{ marginTop: '16px' }}
                >
                  <Paper className={classes.me}>
                    {message.body.text && (
                      <Typography style={{wordWrap:"break-word"}}>{message.body.text}</Typography>
                    )}
                    {message.body.image && (
                      <Avatar variant="square">
                        <img
                          src={message.body.image}
                          width="100%"
                          height="100%"
                        />
                      </Avatar>
                    )}
                    <Typography className={classes.date}>
                      {moment(message.createdAt).fromNow()}
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Fragment>
          ))
        : null}
      <div ref={scrollDiv} />
    </Grid>
  )
}

export default Messages
