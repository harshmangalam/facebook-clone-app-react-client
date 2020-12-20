import {
  Avatar,
  Badge,
  Button,
  DialogActions,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import React, { useContext, useRef, useState } from 'react'
import AvartarText from '../UI/AvartarText'
import useUpdateProfilePic from '../../hooks/useUpdateProfilePic'
import { CameraAlt as CameraIcon } from '@material-ui/icons'
import DialogLoading from '../UI/DialogLoading'
import { UserContext } from '../../App'
function UpdateProfileImage({ user }) {
  const {userState} = useContext(UserContext)
  const history = useHistory()
  const [profilePic, setProfilePic] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [menu, setMenu] = useState(false)

  const inputFileRef = useRef(null)

  const { updateProfilePic, loading } = useUpdateProfilePic({
    profile_pic: profilePic,
    history,
  })

  const handleImageChange = (e) => {
    setProfilePic(e.target.files[0])
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setPreviewImage(reader.result)
      setMenu(true)
    }
  }

  const handleImageClick = () => {
    inputFileRef.current.click()
  }

  const handleUpload = () => {
    updateProfilePic()
    handleCancel()
  }

  const handleCancel = () => {
    setProfilePic(null)
    setPreviewImage(null)
    setMenu(false)
  }

  return (
    <div>
      <Badge
        badgeContent={
          userState.currentUser.id == user.id && (
            <IconButton
              style={{ bottom: -140, left: -20 }}
              onClick={handleImageClick}
            >
              <Avatar>
                <CameraIcon style={{ color: 'black' }} />
              </Avatar>
            </IconButton>
          )
        }
        style={{
          position: 'absolute',
          bottom: -30,
          width: '170px',
          height: '170px',
          zIndex: 2,
          left: '40%',
        }}
      >
        {user.profile_pic ? (
          <Avatar
            style={{
              width: '170px',
              height: '170px',
            }}
          >
            <img src={user.profile_pic} width="100%" height="100%" alt={user.name} />
          </Avatar>
        ) : (
          <AvartarText
            text={user.name}
            bg={user.active ? 'seagreen' : 'tomato'}
            fontSize="40px"
            size="170px"
          />
        )}
      </Badge>
      <input
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={handleImageChange}
      />
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={menu}
        onClose={() => setMenu(false)}
        style={{ width: '100%' }}
      >
        <DialogTitle>Profile Picture</DialogTitle>
        <DialogContent>
          {previewImage && (
            <img src={previewImage} width="100%" height="400px" alt="" />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleUpload} color="primary">
            Upload
          </Button>
          <Button
            variant="contained"
            onClick={handleCancel}
            style={{ backgroundColor: 'tomato', color: '#fff' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {loading && (
        <DialogLoading loading={loading} text="Uploading Profile Pic..." />
      )}
    </div>
  )
}

export default UpdateProfileImage
