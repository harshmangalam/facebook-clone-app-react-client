import {
  Badge,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core'
import { UserContext, UIContext } from '../../../App'

import { Close, Notifications } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import AvartarText from '../../UI/AvartarText'
import LoginCard from './LoginCard'

function AccountCard({ account }) {
  const { userState, userDispatch } = useContext(UserContext)
  const { uiDispatch } = useContext(UIContext)

  const [loginOpen, setLoginOpen] = React.useState(false)
  const [userData, setUserData] = useState(null)
  const handleRemoveAccount = (account_id) => {
    userDispatch({ type: 'REMOVE_ACCOUNT', payload: account_id })
    uiDispatch({
      type: 'SET_MESSAGE',
      payload: {
        color: 'success',
        text: 'Account removed',
        display: true,
      },
    })
  }

  const handleClickOpen = (account_id) => {
    const user = userState.recentAccounts.find(
      (account) => account.id == account_id,
    )

    if (user) {
      setUserData(user)
      setLoginOpen(true)
    }
  }
  return (
    <>
      <Card style={{ position: 'relative' }}>
        <CardActionArea onClick={() => handleClickOpen(account.id)}>
          {account.profile_pic ? (
            <CardMedia
              image={account.profile_pic}
              style={{ height: '150px' }}
            />
          ) : (
            <CardMedia
              style={{
                height: '150px',
                background: 'rgb(245,246,247)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AvartarText
                bg="teal"
                text={account.name}
                size="60px"
                fontSize="25px"
              />
            </CardMedia>
          )}
          <CardHeader
            avatar={
              <Badge color={'primary'} badgeContent={5}>
                <Notifications style={{ color: 'GrayText' }} />
              </Badge>
            }
            subheader={
              <Typography style={{ fontWeight: '800' }}>
                {account.name.slice(0, 6)}..
              </Typography>
            }
          />
        </CardActionArea>
        <IconButton
          onClick={() => handleRemoveAccount(account.id)}
          size="small"
          style={{
            position: 'absolute',
            background: 'tomato',
            color: '#fff',
            top: 0,
            right: 0,
          }}
        >
          <Close />
        </IconButton>
      </Card>

      {loginOpen && (
        <LoginCard
          account={account}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          userData={userData}
        />
      )}
    </>
  )
}

export default AccountCard
