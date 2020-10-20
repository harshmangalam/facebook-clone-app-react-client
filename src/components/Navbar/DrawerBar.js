import React, { useContext } from 'react'
import { UIContext } from '../../App'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'

const drawerWidth = "100vw"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

export default function DrawerBar({ children }) {
  const classes = useStyles()
  const { uiState ,uiDispatch} = useContext(UIContext)
  return (
    <div className={classes.root}>
      <Drawer
        open={uiState.drawer}
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={()=>uiDispatch({type:"SET_DRAWER",payload:false})}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{children}</div>
      </Drawer>
    </div>
  )
}
