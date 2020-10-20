import React from 'react'
import { Drawer, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'


function Sidebar({
  children,
  anchor = 'left',
  background = 'white',
  boxShadow = true,
  drawerWidth=380
}) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.between(960,1400));
  return (
    <Drawer
      elevation={0}
      variant="permanent"
      PaperProps={{
        style: {
          width : matches ? drawerWidth-120 : drawerWidth,
          backgroundColor: background,
          boxShadow: boxShadow && '1px 1px 3px rgba(0,0,0,0.1)',
          border: 'none',
        },
      }}
      anchor={anchor}
    >
      <Toolbar />
      <div style={{ overflow: 'auto' }}>{children}</div>
    </Drawer>
  )
}

export default Sidebar
