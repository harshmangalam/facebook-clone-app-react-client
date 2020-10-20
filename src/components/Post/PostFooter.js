import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Divider, Grid } from '@material-ui/core'

import LikePost from './LikePost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { UserContext } from '../../App'

function PostFooter({ post }) {
  const { userState } = useContext(UserContext)

  useEffect(() => {
    filterLike()
  }, [post.likes.length])

  const filterLike = () => {
    let users = userState.currentUser.friends.filter((friend) =>
      post.likes.includes(friend.id),
    )
    if (post.likes.includes(userState.currentUser.id)) {
      users.push(userState.currentUser)
    }

    return users.slice(0, 4)
  }

  return (
    <div style={{ margin: '8px 16px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '16px',
        }}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          style={{
            padding: '4px',
            borderRadius: '100%',
            color: '#fff',
            background: 'rgb(16,162,246)',
          }}
          size="lg"
        />
        <Typography
          style={{
            marginLeft: '8px',
            color: 'rgb(133,112,118)',
            fontSize: '12px',
          }}
        >
          {filterLike().length ? (
            <>
              {filterLike().map((user) => (
                <span key={user.id}>{user.name} ,</span>
              ))} ...
            </>
          ) : null}
        </Typography>
      </div>

      <Divider />

      <Grid container style={{ padding: '8px 0px' }}>
        <Grid item xs={6}>
          <LikePost post={post} />
        </Grid>

        <Grid item xs={6}>
          <Button
            style={{ width: '100%' }}
            startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            component={Link}
            to={`/post/${post.id}`}
          >
            view
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default PostFooter
