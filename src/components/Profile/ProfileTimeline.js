import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import Photos from './Photos'
import WritePostCard from '../Post/PostForm/WritePostCard'
import { UserContext, PostContext, UIContext } from '../../App'
import Posts from '../Post/Posts'
import { Link } from 'react-router-dom'

function ProfileTimeline({ user }) {
  const { userState } = useContext(UserContext)
  const { postState } = useContext(PostContext)
  const { uiState } = useContext(UIContext)

  const getUserPost = () => {
    return postState.posts.filter((post) => post.user.id == user.id)
  }
  return (
    <Grid container justify="center" style={{ marginTop: '25px' }} spacing={2}>
      <Grid item xs={12} sm={12} md={8}>
        {userState.currentUser.id == user.id && <WritePostCard />}
        <Posts posts={getUserPost()} />
      </Grid>
    </Grid>
  )
}

export default ProfileTimeline
