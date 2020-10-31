import React, { useContext } from 'react'
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@material-ui/core'
import { UIContext, UserContext } from '../App'
import {
  MoreHoriz as MoreHorizIcon,
  PeopleAlt as PeopleAltIcon,
} from '@material-ui/icons'
import AvartarText from './UI/AvartarText'
function PeopleYouMayKnow({ users }) {
  const { userState } = useContext(UserContext)

  return (
    <Paper style={{ marginTop: '20px', padding: '8px' }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography
            variant="h6"
            style={{
              color: 'rgb(101,110,119)',
              fontWeight: '800',
            }}
          >
            People You may Know
          </Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        spacing={1}
        style={{ marginTop: '16px' }}
      >
        {users.map((user) => (
          <Grid item md={4} xs={4} sm={4} key={user.id}>
            <Card elevation={0}>
              {user.profile_pic && (
                <CardMedia
                  style={{ width: '100%', height: '200px' }}
                  image={user.profile_pic}
                  title="Contemplative Reptile"
                />
              )}
              <CardContent>
                <Typography style={{ fontWeight: '700' }}>
                  {user.name}
                </Typography>
                {user.friends && user.friends.length
                  ? user.friends.map((friend) => (
                      <div style={{ display: 'flex' }} key={friend.id}>
                        {friend.profile_pic ? (
                          <Avatar
                            style={{ width: '20px', height: '20px' }}
                            alt="Remy Sharp"
                            src={friend.profile_pic}
                          />
                        ) : (
                          <AvartarText
                            bg={user.active ? 'seagreen' : 'tomato'}
                            text={friend.name}
                            size="20px"
                          />
                        )}

                        <Typography
                          style={{
                            marginLeft: '10px',
                            color: 'rgb(101,110,119)',
                          }}
                        >
                          {user.friends.length} friends
                        </Typography>
                      </div>
                    ))
                  : null}
              </CardContent>
              <div style={{ padding: '10px' }}></div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default PeopleYouMayKnow
