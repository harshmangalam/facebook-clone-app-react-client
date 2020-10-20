import React, { Fragment, useContext, useState } from 'react'
import { Button, Paper, Menu, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import {faThumbsUp as filledLike} from "@fortawesome/free-solid-svg-icons";

import { PostContext, UIContext, UserContext } from '../../App'
import { likeDislikePost } from '../../services/PostServices'

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '50px',
    height: '50px',
    transition: '0.7s',
    '&:hover': {
      transform: 'scale(1.4)',
      cursor: 'pointer',
    },
  },
}))

function LikePost({ post }) {
  const classes = useStyles()
  const { postDispatch } = useContext(PostContext)
  const { uiDispatch } = useContext(UIContext)
  const { userState } = useContext(UserContext)

  const isLiked = () => {
    return post.likes.includes(userState.currentUser.id)
  }
  const handleLike = () => {
    likeDislikePost(post.id)
      .then((res) => {
        if (res.data) {
          postDispatch({
            type: 'LIKE_UNLIKE_POST',
            payload: res.data.post,
          })
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              color: 'success',
              text: res.data.message,
              display: true,
            },
          })
        }
        if (res.error) {
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              color: 'error',
              text: res.data.error,
              display: true,
            },
          })
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <Button
        onClick={handleLike}
        color={isLiked() ? 'primary' : 'inherit'}
        style={{ width: '100%' }}
        startIcon={
          isLiked() ? (
            <FontAwesomeIcon icon={filledLike} />
          ) : (
            <FontAwesomeIcon icon={faThumbsUp} />
          )
        }
      >
        ({post.likes.length})
      </Button>
    </Fragment>
  )
}


export default LikePost
