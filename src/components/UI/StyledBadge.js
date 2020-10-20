import React from 'react'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'

const UIBadge = withStyles((theme) => ({
  badge: {
    right: 8,
    top: 32,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '5px 5px',
    borderRadius: '100%',
  },
}))(Badge)

export default function StyledBadge({ isActive, children,border }) {
  return (
    <UIBadge
      variant="dot"
      color={isActive ? 'secondary' : 'error'}
      style={{ border: border, borderRadius: '100%', padding: '4px' }}
    >
      {children}
    </UIBadge>
  )
}
