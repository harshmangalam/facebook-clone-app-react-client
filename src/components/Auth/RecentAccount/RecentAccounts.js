import { Grid } from '@material-ui/core'

import { UserContext } from '../../../App'

import React, { useContext } from 'react'

import AccountCard from './AccountCard'
import AddAccount from './AddAccount'

function RecentAccounts() {
  const { userState } = useContext(UserContext)

  return (
    <>
      <Grid container spacing={2}>
        {userState.recentAccounts.map((account) => (
          <Grid item xs={6} sm={6} md={3} key={account.id}>
            <AccountCard account={account} />
          </Grid>
        ))}
        <Grid item xs={6} sm={6} md={3}>
          <AddAccount />
        </Grid>
      </Grid>
    </>
  )
}

export default RecentAccounts
