import {
  Avatar,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import AvartarText from '../UI/AvartarText'
import StyledBadge from '../UI/StyledBadge'
import { UIContext, UserContext } from '../../App'
import { SendOutlined } from '@material-ui/icons'
import useCreateComment from '../../hooks/useCreateComment'
function CommentTextArea({ post }) {
  const { userState } = useContext(UserContext)
  const { uiState } = useContext(UIContext)

  const [commentText, setCommentText] = useState('')
  const [commentImage, setCommentImage] = useState()
  const [error, setError] = useState('')

  const { createComment, loading } = useCreateComment({
    post_id: post.id,
    commentText,
    setCommentText,
    setCommentImage,
    commentImage,
    setError,
  })

  const handleCommentChange = (e) => {
    setError('')
    setCommentText(e.target.value)
  }

  return (
    <>
      <Grid
        container
        justify="flex-start"
        spacing={1}
        style={{
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        <Grid item>
          <StyledBadge isActive={userState.currentUser.active}>
            {userState.currentUser.profile_pic ? (
              <Avatar>
                <img
                  src={userState.currentUser.profile_pic}
                  style={{ width: '100%', height: '100%' }}
                  alt={userState.currentUser.name}
                />
              </Avatar>
            ) : (
              <AvartarText text={userState.currentUser.name} bg="tomato" />
            )}
          </StyledBadge>
        </Grid>
        <Grid item md={8} sm={8} xs={8}>
          <TextField
            placeholder="Write a Comments..."
            error={error ? true : false}
            helperText={error}
            value={commentText}
            onChange={handleCommentChange}
            multiline
            rowsMax={4}
            style={{
              width: '100%',
              borderRadius: '20px',
              border: 'none',
              background: uiState.darkMode ? 'rgb(24,25,26)': 'rgb(240,242,245)',
              padding: '8px 16px',
            }}
          />
         
        </Grid>
        <Grid item ms={2} sm={2} xs={2}>
        <IconButton onClick={createComment}>
            <SendOutlined />
          </IconButton>
        </Grid>
      </Grid>

      {loading ? (
        <Paper
          elevation={0}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <LinearProgress color="primary" style={{ width: '100%' }} />
        </Paper>
      ) : null}
    </>
  )
}

export default CommentTextArea
