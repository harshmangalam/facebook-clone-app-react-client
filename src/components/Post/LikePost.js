import React, { Fragment, useContext } from 'react'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import {faThumbsUp as filledLike} from "@fortawesome/free-solid-svg-icons";

import { PostContext, UIContext, UserContext } from '../../App'
import { likeDislikePost } from '../../services/PostServices'


function LikePost({ post }) {

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
