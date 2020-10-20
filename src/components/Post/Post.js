import React, { useContext, useState } from 'react'
import moment from 'moment'
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core'
import PostContent from './PostContent'
import PostFooter from './PostFooter'
import AvartarText from '../UI/AvartarText'
import { MoreHoriz } from '@material-ui/icons'
function Post({ post }) {
  return (
    <Card style={{ marginTop: '20px' }}>
      <CardHeader
        avatar={
          post.user && post.user.profile_pic ? (
            <Avatar>
              <img
                src={post.user.profile_pic}
                style={{ width: '100%', height: '100%' }}
              />
            </Avatar>
          ) : (
            <AvartarText
              text={post.user.name}
              bg={post.user.active ? 'seagreen' : 'tomato'}
            />
          )
        }
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
        title={
          post && (
            <Typography style={{ fontWeight: '800' }}>
              {post.user.name}
            </Typography>
          )
        }
        subheader={post && moment(post.createdAt).fromNow()}
      />
      <PostContent post={post} />
      <PostFooter post={post} />
    </Card>
  )
}

export default Post
