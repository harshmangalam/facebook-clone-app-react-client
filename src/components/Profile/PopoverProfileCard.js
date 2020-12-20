import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledBadge from '../UI/StyledBadge'
import AvartarText from '../UI/AvartarText'

import {
  faMapMarkerAlt,
  faUserGraduate,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
function PopoverProfileCard({ user }) {
  return (
    <Card elevation={0} style={{ maxWidth: '400px' }}>
      <CardHeader
        avatar={
          user.profile_pic ? (
            <StyledBadge
              isActive={user.active}
              border={`3px solid ${user.active ? 'green' : 'red'}`}
            >
              <Avatar
                alt={user.name}
                src={user.profile_pic}
                style={{ width: '70px', height: '70px' }}
              />
            </StyledBadge>
          ) : (
            <StyledBadge
              isActive={user.active}
              border={`3px solid ${user.active ? 'green' : 'red'}`}
            >
              <AvartarText
                size="70px"
                text={user.name}
                bg={user.active ? 'seagreen' : 'tomato'}
              />
            </StyledBadge>
          )
        }
        title={
          <Typography
            style={{ fontWeight: '800', fontSize: '16px', marginBottom: '8px' }}
          >
            {user.name}
          </Typography>
        }
        subheader={
          <>
            {user.location && (
              <Grid container alignItems="center" justify="space-between">
                <Grid item md={4}>
                  <Avatar
                    style={{
                      background: 'rgb(240,242,245)',
                      color: 'black',
                      fontWeight: '800',
                    }}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </Avatar>
                </Grid>
                <Grid item md={8}>
                  <Typography>
                    {user.location.city || user.location.region}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {user.education && (
              <Grid
                container
                alignItems="center"
                justify="space-between"
                style={{ marginTop: '4px' }}
              >
                <Grid item md={4}>
                  <Avatar
                    style={{
                      background: 'rgb(240,242,245)',
                      color: 'black',
                      fontWeight: '800',
                    }}
                  >
                    <FontAwesomeIcon icon={faUserGraduate} />
                  </Avatar>
                </Grid>
                <Grid item md={8}>
                  <Typography style={{ fontSize: '14px' }} variant="body2">
                    {user.education}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </>
        }
      />

      <CardActions>
        <Grid container alignItems="center" justify="space-evenly">
          <Chip
            icon={<FontAwesomeIcon icon={faUsers} />}
            size="medium"
            color="primary"
            label={`Friends ${user.friends.length}`}
          />
        </Grid>
      </CardActions>
    </Card>
  )
}

export default PopoverProfileCard
