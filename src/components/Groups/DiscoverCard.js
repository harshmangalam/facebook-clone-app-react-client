import React from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
} from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
function DiscoverCard({ discover }) {
  return (
    <div>
      <Card elevation={6}>
        <CardActionArea>
          <CardMedia
            image={discover.image}
            title={discover.groupName}
            style={{ width: '100%', height: '350px' }}
          />
          <CardContent>
            <Typography style={{fontWeight:'800'}}>{discover.groupName}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {discover.members} members{' '}
              <span>{discover.postPerDay} posts a day</span>
            </Typography>
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <AvatarGroup max={3}>
                <Avatar
                  alt="Remy Sharp"
                  src={require('../../assets/shivam.jpg')}
                  style={{ width: '24px', height: '24px' }}
                />
                <Avatar
                  alt="Travis Howard"
                  src={require('../../assets/sajan.jpg')}
                  style={{ width: '24px', height: '24px' }}
                />
                <Avatar
                  alt="Travis Howard"
                  src={require('../../assets/sajan.jpg')}
                  style={{ width: '24px', height: '24px' }}
                />
              </AvatarGroup>
              <Typography variant="body2" color="textSecondary" component="p">
                prems and 13 friends are member
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="large"
            color="primary"
            style={{
              background: 'rgb(228,230,235)',
              color: 'rgb(5,5,5)',
              fontWeight: '700',
              width: '100%',
            }}
          >
            Join Group
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default DiscoverCard
