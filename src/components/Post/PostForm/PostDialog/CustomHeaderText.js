import { Avatar, Typography } from '@material-ui/core'
import React from 'react'
import AvartarText from '../../../UI/AvartarText'

function CustomHeaderText({ userState, body }) {
  function filterUserById(user_id) {
    return userState.users.find((usr) => usr.id == user_id)
  }
  return (
    <Typography>
     
      <b>{userState.currentUser.name}</b>
      {body.feelings ? (
        <>
          &nbsp; is feeling <b>{body.feelings}</b>
        </>
      ) : null}
      {body.with.length ? (
        <>
          {` with `}
          <b>
            {body.with.map((u) => (
              <> &nbsp;{filterUserById(u).name},</>
            ))}
          </b>
        </>
      ) : null}
      {body.at ? (
        <>
          {` at `} <b>{body.at} </b>
        </>
      ) : null}
      {body.date ? (
        <>
          <b>{new Date(body.date).toLocaleDateString()}</b>
        </>
      ) : null}
    </Typography>
  )
}

export default CustomHeaderText
