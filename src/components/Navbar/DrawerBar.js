import React, { useContext } from 'react'
import { UIContext } from '../../App'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import { Button } from '@material-ui/core'

const drawerWidth = '100vw'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: (darkMode) => ({
    width: drawerWidth,
    backgroundColor: darkMode && 'rgb(36,37,38)',
  }),
}))

export default function DrawerBar({ children }) {
  const { uiState, uiDispatch } = useContext(UIContext)
  const classes = useStyles(uiState.darkMode)

  return (
    <div className={classes.root}>
      <Drawer
        open={uiState.drawer}
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => uiDispatch({ type: 'SET_DRAWER', payload: false })}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{children}</div>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            uiDispatch({ type: 'SET_DRAWER', payload: !uiState.drawer })
          }
        >
          Close
        </Button>
      </Drawer>
    </div>
  )
}
