import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { LocationOn } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import useLocationService from '../../../hooks/useLocationService'

function EditLocation({ location, setLocation, updateLocation, loading }) {
  const [dialog, setDialog] = useState(false)
  const {
    loading: locationLoading,
    error,
    data,
    setError,
    getLocation,
  } = useLocationService()

  useEffect(() => {
    setLocation(data)
  }, [data])

  const handleUpdate = () => {
    setDialog(false)
    updateLocation()
  }

  const handleFetchLocation = () => {
    setError(null)
    getLocation()
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialog(true)}
      >
        Edit
      </Button>

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Location</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          {location && (
            <Typography>
              {location.city},{location.state},{location.country}
            </Typography>
          )}
          <Button
            style={{ width: '100%' }}
            color="primary"
            variant="contained"
            startIcon={<LocationOn />}
            onClick={handleFetchLocation}
          >
            {locationLoading ? (
              <CircularProgress
                variant="indeterminate"
                color="primary"
                size="26px"
              />
            ) : (
              'My Location'
            )}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditLocation
