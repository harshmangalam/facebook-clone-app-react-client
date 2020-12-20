import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import EditLocation from './Location/EditLocation'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import GoogleMap from '../UI/GoogleMap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCity,
  faHouseUser,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons'
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons'
function Location() {
  const { userState } = useContext(UserContext)
  const [location, setLocation] = useState(null)

  const { editLocation, loading } = useUpdateProfile()

  const updateLocation = () => {
    editLocation(location)
  }
  return (
    <div>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography
            style={{
              fontSize: '24px',
              fontWeight: '800',
              marginBottom: '16px',
              marginTop: '16px',
            }}
          >
            Location Setting
          </Typography>
        </Grid>
        <Grid item>
          <EditLocation
            location={location}
            setLocation={setLocation}
            updateLocation={updateLocation}
            loading={loading}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        {userState.currentUser.location && (
          <List>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faHouseUser} />
              </ListItemIcon>
              <ListItemText>{userState.currentUser.location.city}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faCity} />
              </ListItemIcon>
              <ListItemText>
                {userState.currentUser.location.state}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faMap} />
              </ListItemIcon>
              <ListItemText>
                {userState.currentUser.location.country}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faMapPin} />
              </ListItemIcon>
              <ListItemText>
                {userState.currentUser.location.lat} {' , '}
                {userState.currentUser.location.lng}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faCity} />
              </ListItemIcon>
              <ListItemText>
                {userState.currentUser.location.region}
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faClock} />
              </ListItemIcon>
              <ListItemText>
                {userState.currentUser.location.timezone}
              </ListItemText>
            </ListItem>
          </List>
        )}

        {userState.currentUser.location && (
          <Grid container style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={12} md={12}>
              <GoogleMap
                coords={{
                  lng: parseFloat(userState.currentUser.location.lng),
                  lat: parseFloat(userState.currentUser.location.lat),
                }}
              />
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  )
}

export default Location
