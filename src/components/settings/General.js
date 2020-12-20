import React, { useContext, useState } from 'react'
import {Divider, Grid, Typography } from '@material-ui/core'
import { UserContext } from '../../App'
import EditInput from './General/EditInput'
import useUpdateProfile from '../../hooks/useUpdateProfile'
function General() {
  const { userState } = useContext(UserContext)
  const {
    loading,
    editName,
    editEmail,
    editBio,
    editEducation,
  } = useUpdateProfile()

  const [name, setName] = useState(userState.currentUser.name)
  const [email, setEmail] = useState(userState.currentUser.email)
  const [bio, setBio] = useState(userState.currentUser.bio)
  const [education, setEducation] = useState(userState.currentUser.education)

  const handleEditName = () => {
    editName(name)
  }
  const handleEditEmail = () => {
    editEmail(email)
  }
  const handleEditBio = () => {
    editBio(bio)
  }

  const handleEditEducation = () => {
    editEducation(education)
  }
  return (
    <div>
      <Typography
        style={{
          fontSize: '24px',
          fontWeight: '800',
          marginBottom: '16px',
          marginTop: '16px',
        }}
      >
        General Account Setting
      </Typography>
      <Divider />
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Grid container spacing={2} style={{marginTop:"16px",marginBottom:"8px"}} alignItems="center">
          <Grid item xs={3} sm={3} md={3}>
            <Typography style={{ fontWeight: '800' }}>Name</Typography>
          </Grid>

          <Grid item xs={9} md={7} sm={7}>
            <Typography>{userState.currentUser.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <EditInput
              label="Name"
              input={name}
              setInput={setName}
              editAction={handleEditName}
              loading={loading}
            />
          </Grid>
        </Grid>

        <Divider variant="middle" />

        <Grid container spacing={2} style={{marginTop:"16px",marginBottom:"8px"}} alignItems="center">
          <Grid item xs={3} sm={3} md={3}>
            <Typography style={{ fontWeight: '800' }}>Email</Typography>
          </Grid>

          <Grid item xs={9} md={7} sm={7}>
            <Typography>{userState.currentUser.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <EditInput
              label="Email"
              input={email}
              setInput={setEmail}
              editAction={handleEditEmail}
              loading={loading}
            />
          </Grid>
        </Grid>
        <Divider variant="middle" />

        <Grid container spacing={2} style={{marginTop:"16px",marginBottom:"8px"}} alignItems="center">
          <Grid item xs={3} sm={3} md={3}>
            <Typography style={{ fontWeight: '800' }}>Bio</Typography>
          </Grid>

          <Grid item xs={9} md={7} sm={7}>
            <Typography style={{wordWrap:'break-word'}}>{userState.currentUser.bio}</Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <EditInput
              label="Bio"
              input={bio}
              editAction={handleEditBio}
              setInput={setBio}
              loading={loading}
            />
          </Grid>
        </Grid>
        <Divider variant="middle" />

        <Grid container spacing={2} style={{marginTop:"16px",marginBottom:"8px"}} alignItems="center">
          <Grid item xs={3} sm={3} md={3}>
            <Typography style={{ fontWeight: '800' }}>Education</Typography>
          </Grid>

          <Grid item xs={9} md={7} sm={7}>
            <Typography>
            {userState.currentUser.education}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <EditInput
              label="Education"
              input={education}
              editAction={handleEditEducation}
              setInput={setEducation}
              loading={loading}
            />
          </Grid>
        </Grid>
      </div>
      <Divider />
    </div>
  )
}

export default General
