import React, { useState, createRef, useEffect } from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'

import { Skeleton } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { ThumbUpSharp as LikeIcon, MoreHoriz } from '@material-ui/icons'
function Video({ video }) {
  const [loadingVideo, setLoadingVideo] = useState(true)
  const iframeRef = createRef()

  useEffect(() => {
    const iframe = iframeRef.current
    iframe.addEventListener('load', handleIframeLoad)

    return () => {
      iframe.removeEventListener('load', handleIframeLoad)
    }
  }, [])

  const handleIframeLoad = (event) => {
    setLoadingVideo(false)
  }

  return (
    <div style={{ marginTop: '16px' }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label="avatar"
              style={{ width: '50px', height: '50px' }}
            >
              {video.channelImage ? (
                <img src={video.channelImage} width="100%" height="100%" />
              ) : (
                <Skeleton variant="circle" width="100%" height="100%" />
              )}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHoriz />
            </IconButton>
          }
          title={
            video.channelName ? (
              video.channelName
            ) : (
              <Skeleton variant="text" width="100%" height="100%" />
            )
          }
          subheader={
            video.createdAt ? (
              video.createdAt
            ) : (
              <Skeleton variant="text" width="100%" height="100%" />
            )
          }
        />
        <CardContent style={{ marginTop: 0, paddingTop: 0 }}>
          <Typography
            style={{
              marginTop: 0,
              paddingTop: 0,
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {video.description ? (
              video.description
            ) : (
              <Skeleton variant="text" width="100%" height="100%" />
            )}
            {video.tags.map((tag) => (
              <span style={{ marginLeft: '8px' }}>{tag}</span>
            ))}
          </Typography>
        </CardContent>

        {loadingVideo && (
          <Skeleton variant="rect" width="100%" height="450px" />
        ) }
        <iframe
          src={video.videoUrl}
          style={{ width: '100%', height: '450px',display:loadingVideo && 'none' }}
          ref={iframeRef}
        />

        <CardActions disableSpacing>
          <Button startIcon={<LikeIcon />}>Like</Button>

          <Button startIcon={<FontAwesomeIcon icon={faComment} />}>
            Comment
          </Button>

          <Button startIcon={<FontAwesomeIcon icon={faShare} />}>Share</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Video
