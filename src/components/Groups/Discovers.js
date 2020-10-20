import React, { Fragment } from 'react'
import DiscoverCard from './DiscoverCard'
import CategoryCard from './CategoryCard'
import { Grid, Typography } from '@material-ui/core'
import { DriveEtaRounded } from '@material-ui/icons'
function Discovers() {
  return (
    <div style={{ padding: '8px 16px' }}>
      <div>
        <Grid container spacing={1} style={{ marginTop: '80px' }}>
          <Grid item xs={12} md={10} sm={12}>
            <Typography style={{ fontSize: '22px', fontWeight: '700' }}>
              Friends Group
            </Typography>

            <Typography style={{ fontSize: '16px' }}>
              Groups your friends are in.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: '16px' }}>
          {discovers.map((discover) => (
            <Grid item xs={12} sm={6} md={4}>
              <DiscoverCard discover={discover} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div>
        <Grid container spacing={1} style={{ marginTop: '80px' }}>
          <Grid item xs={12} md={10} sm={12}>
            <Typography style={{ fontSize: '22px', fontWeight: '700' }}>
              Group for you
            </Typography>

            <Typography style={{ fontSize: '16px' }}>
              Groups you might be interested in.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: '16px' }}>
          {discovers.map((discover) => (
            <Grid item xs={12} sm={6} md={4}>
              <DiscoverCard discover={discover} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div>
        <Grid container spacing={1} style={{ marginTop: '80px' }}>
          <Grid item xs={12} md={10} sm={12}>
            <Typography style={{ fontSize: '22px', fontWeight: '700' }}>
              Categories
            </Typography>

            <Typography style={{ fontSize: '16px' }}>
              Find a group by browsing top categories.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: '16px' }}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={2}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div>
        <Grid container spacing={1} style={{ marginTop: '80px' }}>
          <Grid item xs={12} md={10} sm={12}>
            <Typography style={{ fontSize: '22px', fontWeight: '700' }}>
              Suggested for You
            </Typography>

            <Typography style={{ fontSize: '16px' }}>
              Groups you might be interested in.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: '16px' }}>
          {discovers.map((discover) => (
            <Grid item xs={12} sm={6} md={4}>
              <DiscoverCard discover={discover} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

const discovers = [
  {
    image: require('../../assets/dis1.jpg'),
    groupName: 'Yaaro ki mehfil',
    members: '2.3k',
    postPerDay: 10,
  },
  {
    image: require('../../assets/dis1.jpg'),
    groupName: 'Yaaro ki mehfil',
    members: '2.3k',
    postPerDay: 10,
  },
  {
    image: require('../../assets/dis3.jpg'),
    groupName: 'Hum Saath Saath Hai',
    members: '2.3k',
    postPerDay: 10,
  },
  {
    image: require('../../assets/dis4.jpg'),
    groupName: 'Indian Army',
    members: '2.3k',
    postPerDay: 10,
  },
]

const categories = [
  { name: 'Humor', image: require('../../assets/dis1.jpg') },
  { name: 'Science & Tech', image: require('../../assets/dis2.jpg') },
  { name: 'Social', image: require('../../assets/dis3.jpg') },
  { name: 'Animal', image: require('../../assets/dis1.jpg') },
  { name: 'Styles', image: require('../../assets/dis2.jpg') },
  { name: 'Travel', image: require('../../assets/dis3.jpg') },
]
export default Discovers
