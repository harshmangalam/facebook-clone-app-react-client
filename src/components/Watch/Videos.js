import React from 'react'
import Video from './Video'
import { Grid, Typography } from '@material-ui/core'
function Videos() {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={8} style={{ marginTop: '80px' }}>
      <Typography style={{ fontSize: '20px', fontWeight: '600',padding:"8px 16px" }}>
            Top Videos For You
      </Typography>
      {videos.map((video) => (
        <Video video={video} />
      ))}
    </Grid>
    </Grid>
  )
}

const videos = [
  {
    channelName: 'my video channel',
    channelImage: require('../../assets/animesh.jpg'),
    createdAt: 'Aug 22, 2020',
    tags: ['#mustwatch', '#actions', '#popular'],
    description: 'Can’t Wait For tonight’s Episode.... ',
    videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=0&mute=1',
  },
  {
    channelName: 'my video channel',
    channelImage: require('../../assets/animesh.jpg'),
    createdAt: 'Aug 22, 2020',
    tags: ['#mustwatch', '#actions', '#popular'],
    description: 'Can’t Wait For tonight’s Episode.... ',
    videoUrl: 'https://youtube.com/embed/luai0p0y2zE?autoplay=0&mute=1',
  },
  {
    channelName: 'my video channel',
    channelImage: require('../../assets/animesh.jpg'),
    createdAt: 'Aug 22, 2020',
    tags: ['#mustwatch', '#actions', '#popular'],
    description: 'Can’t Wait For tonight’s Episode.... ',
    videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=0&mute=1',
  },
]
export default Videos
