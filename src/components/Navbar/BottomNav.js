import React, { useContext } from 'react'
import { BottomNavigation, Paper } from '@material-ui/core'
import { UIContext } from "../../App";
import MiddleMenu from './MiddleMenu'

function BottomNav() {
  const {uiState} = useContext(UIContext)
  return (
    <Paper
      elevation={0}
      style={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 3 }}
    >
      <BottomNavigation
        style={{
          width: '100%',
          background: uiState.darkMode? 'rgb(24,25,26)': 'rgb(240,242,245)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: '8px 0px',
        }}
      >
        <MiddleMenu />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
