import React, { Fragment, useContext } from 'react'
import {
  Avatar,
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core'
import { UIContext, UserContext } from '../../App'
import AvartarText from '../UI/AvartarText'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: '6px',
    paddingTop: '6px',
    paddingBottom: '8px',
    '&:hover': { background: 'whitesmoke', cursor: 'pointer' },
  },
}))
function Friend({ user, children }) {
  const { userDispatch } = useContext(UserContext)
  const { uiState, uiDispatch } = useContext(UIContext)
  const classes = useStyles()

  return (
    <Fragment>
      <Card
        elevation={0}
        style={{
          width: '100%',
          backgroundColor: uiState.darkMode ? 'rgb(36,37,38)' :null,
        }}
      >
        <CardActionArea
          onClick={() => {
            userDispatch({ type: 'ADD_SELECTED_USER_PROFILE', payload: user })
            uiDispatch({ type: 'SET_DRAWER', payload: false })
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {user.profile_pic ? (
              <Avatar style={{ width: '60px', height: '60px' }}>
                <img
                  src={user.profile_pic}
                  style={{ width: '100%', height: '100%' }}
                />
              </Avatar>
            ) : (
              <AvartarText
                text={user.name}
                bg={user.active ? 'seagreen' : ' tomato'}
              />
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '8px',
              }}
            >
              <Typography
                variant="subtitle1"
                style={{ marginBottom: '4px', fontWeight: '600' }}
              >
                {user.name}
              </Typography>
              <Typography variant="body2">{7} mutual friends</Typography>
            </div>
          </CardContent>
        </CardActionArea>

        {children}
      </Card>
    </Fragment>
  )
}

export default Friend
