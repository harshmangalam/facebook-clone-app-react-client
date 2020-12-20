import React, { lazy, useContext, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { UIContext, UserContext } from '../../../../App'

import FileField from './FileField'
// import CameraField from './CameraField'
import TagUserCard from './TagUserCard'
import LocationField from './LocationField'
import FeelingsCard from './FeelingsCard'
import DialogLoading from '../../../UI/DialogLoading'
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  DialogActions,
  Grid,
  DialogContent,
  Dialog,
  IconButton,
  Avatar,
} from '@material-ui/core'

import DialogHeader from './DialogHeader'
import PreviewImage from './PreviewImage'
import useCreatePost from '../../hooks/useCreatePost'
import { Alert } from '@material-ui/lab'
import { Close } from '@material-ui/icons'

const CameraField = lazy(() => import('./CameraField'))
export default function PostFormDialog() {
  const { uiState, uiDispatch } = useContext(UIContext)
  const [blob, setBlob] = useState(null)
  const [postImage, setPostImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [isImageCaptured, setIsImageCaptured] = useState(false)

  const [showEmoji, setShowEmoji] = useState(false)
  const [body, setBody] = useState({
    feelings: '',
    with: [],
    at: '',
    date: '',
  })

  const [postData, setPostData] = useState({
    privacy: 'Public',
    content: '',
  })

  const { userState } = useContext(UserContext)

  const fileRef = useRef()

  const handleContentChange = (e) => {
    setPostData({
      ...postData,
      content: e.target.value,
    })
  }
  const handleImageChange = (e) => {
    setPostImage(e.target.files[0])

    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setBlob(null)
      setIsImageCaptured(false)
      setPreviewImage(reader.result)
    }
  }

  const onEmojiClick = (e, emojiObject) => {
    setPostData({
      ...postData,
      content: postData.content + emojiObject.emoji,
    })
  }

  function handleCloseDialog() {
    uiDispatch({ type: 'SET_POST_MODEL', payload: false })
  }

  function removeFileImage() {
    setPreviewImage('')
    setPostImage(null)
  }

  function removeCameraImage() {
    setBlob(null)
    setIsImageCaptured(false)
  }

  function showCapturedImage() {
    if (blob) {
      let blobURL = URL.createObjectURL(blob)

      return (
        <>
          <Alert>
            <b>Image Size ({Math.round(blob.size / 1024)} Kb)</b>
          </Alert>
          <img src={blobURL} style={{ width: '100%', height: '100%' }} alt="" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
              marginBottom: '16px',
            }}
          >
            <IconButton onClick={removeCameraImage} size="medium">
              <Avatar style={{ background: 'tomato', color: 'white' }}>
                <Close />
              </Avatar>
            </IconButton>
          </div>
        </>
      )
    }
  }

  const { handleSubmitPost, loading } = useCreatePost({
    postData,
    body,
    postImage,
    isImageCaptured,
    blob,
  })

  return (
    <div>
      <Typography
        style={{
          color: !uiState.darkMode ? 'grey' : null,
          padding: '8px',
          background: !uiState.darkMode ? 'rgb(240,242,245)' : null,
          borderRadius: '20px',

          cursor: 'pointer',
        }}
        onClick={() => uiDispatch({ type: 'SET_POST_MODEL', payload: true })}
      >
        What`s in your mind, {userState.currentUser.name} ?
      </Typography>

      {loading ? (
        <DialogLoading loading={loading} text="Uploading Post..." />
      ) : (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          scroll="body"
          maxWidth="sm"
          open={uiState.postModel}
          onClose={() => uiDispatch({ type: 'SET_POST_MODEL', payload: false })}
          style={{ width: '100%' }}
        >
          <DialogHeader
            userState={userState}
            handleCloseDialog={handleCloseDialog}
            body={body}
          />
          <DialogContent>
            <FormControl style={{ marginBottom: '16px' }}>
              <InputLabel>Privacy</InputLabel>
              <Select
                native
                value={postData.privacy}
                onChange={(e) =>
                  setPostData({ ...postData, privacy: e.target.value })
                }
              >
                <option value={'Only me'}>Only me</option>
                <option value={'Public'}>Public</option>
              </Select>
            </FormControl>

            <TextField
              placeholder={`Whats in your mind ${userState.currentUser.name}`}
              multiline
              rows={8}
              value={postData.content}
              onChange={handleContentChange}
              style={{
                background: !uiState.darkMode ? '#fff' : null,
                border: 'none',
                width: '100%',
              }}
            />

            <Grid
              container
              justify="center"
              style={{ marginTop: '16px', marginBottom: '16px' }}
            >
              <Button
                onClick={() => setShowEmoji(!showEmoji)}
                variant="contained"
                color="secondary"
                size="small"
              >
                {showEmoji ? 'Hide Emoji Panel' : 'Show Emoji Panel'}
              </Button>
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ marginTop: '16px', marginBottom: '16px' }}
            >
              <Grid item xs={12} sm={6} md={6}>
                {showEmoji && (
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    className="emoji-container"
                  />
                )}
              </Grid>
            </Grid>

            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={6} md={6}>
                <FileField fileRef={fileRef} />

                <CameraField
                  setBlob={setBlob}
                  isImageCaptured={isImageCaptured}
                  setIsImageCaptured={setIsImageCaptured}
                  setPreviewImage={setPreviewImage}
                  setPostImage={setPostImage}
                />

                <LocationField body={body} setBody={setBody} />
                <FeelingsCard body={body} setBody={setBody} />
                <TagUserCard body={body} setBody={setBody} />
              </Grid>
            </Grid>

            {previewImage && (
              <>
                <Alert>
                  <b>Image Size ({Math.round(postImage.size / 1024)} Kb)</b>
                </Alert>
                <PreviewImage
                  previewImage={previewImage}
                  removeFileImage={removeFileImage}
                />
              </>
            )}

            {showCapturedImage()}
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={handleSubmitPost}
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
            >
              {loading ? (
                <CircularProgress
                  variant="indeterminate"
                  size={25}
                  style={{ color: '#fff' }}
                />
              ) : (
                ' Create Post'
              )}
            </Button>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileRef}
              onChange={handleImageChange}
              accept="image/*"
              capture="user"
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
