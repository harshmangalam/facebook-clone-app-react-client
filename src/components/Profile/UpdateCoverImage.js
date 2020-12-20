import {
  Avatar,
  Button,
  DialogActions,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import React, { useState, useRef } from 'react'
import { CameraAlt as CameraIcon } from '@material-ui/icons'
import useUpdateProfilePic from '../../hooks/useUpdateProfilePic'
import DialogLoading from '../UI/DialogLoading'
import { useHistory } from 'react-router-dom'
function UpdateCoverImage() {
  const history = useHistory()
  const [coverPic, setCoverPic] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [menu, setMenu] = useState(false)

  const inputFileRef = useRef(null)

  const { updateCoverPic, loading } = useUpdateProfilePic({
    cover_pic: coverPic,
    history
  })

  const handleImageChange = (e) => {
    setCoverPic(e.target.files[0])
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
    updateCoverPic()
    handleCancel()
  }

  const handleCancel = () => {
    setCoverPic(null)
    setPreviewImage(null)
    setMenu(false)
  }

  return (
    <div>
      <IconButton
        onClick={handleImageClick}
        style={{ position: 'absolute', bottom: 30, left: 20, zIndex: 2 }}
      >
        <Avatar>
          <CameraIcon style={{ color: 'blue' }} />
        </Avatar>
      </IconButton>

      {loading && (
        <DialogLoading loading={loading} text="Uploading Cover  Pic..." />
      )}

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
        <DialogTitle>Cover Picture</DialogTitle>
        <DialogContent>
          {previewImage && (
            <img src={previewImage} width="100%" height="400px" alt="preview" />
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
    </div>
  )
}

export default UpdateCoverImage
