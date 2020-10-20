import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledBadge from '../UI/StyledBadge'
import AvartarText from '../UI/AvartarText'
import { Chat, ChatOutlined } from '@material-ui/icons'
import {
  faAddressCard,
  faChartArea,
  faChartBar,
  faHeart,
  faMapMarker,
  faMapMarkerAlt,
  faSchool,
  faUserFriends,
  faUserGraduate,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
function PopoverProfileCrd({ user }) {
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
                style={{ width: '100%', height: '100%' }}
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
            <Grid
              container
              alignItems="flex-start"
              justify="space-between"
              style={{ marginBottom: '4px', marginTop: '4px' }}
            >
              <Grid item md={2}>
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
              <Grid item md={10}>
                <Typography>Bhagalpur-812004,Bihar,India</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start" justify="space-between">
              <Grid item md={2}>
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
              <Grid item md={10}>
                <Typography style={{ fontSize: '14px' }} variant="body2">
                  lorem epsum dolor sitlorem epsum dolor sitlorem epsum dolor
                </Typography>
              </Grid>
            </Grid>
          </>
        }
      />
      <CardActions>
        <Grid container alignItems="center" justify="space-evenly">
        <Chip
          icon={<FontAwesomeIcon icon={faUsers} />}
          size="small"
          label="Friends 6"
        />
        <Chip
          icon={<FontAwesomeIcon icon={faUserFriends} />}
          label="Mutual Friends 8"
          size="small"
        />
        <Chip
          icon={<FontAwesomeIcon icon={faHeart} />}
          label=" Followers 6"
          size="small"
        />
        </Grid>
      </CardActions>
    </Card>
  )
}

export default PopoverProfileCrd
