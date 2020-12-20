import { faUserTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import {
  Button,
  CardHeader,
  Checkbox,
  Container,
  DialogContent,

  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  
  Tooltip,
  Dialog,
  Typography,
} from '@material-ui/core'
import { UserContext } from '../../../../App'
import { ArrowBack } from '@material-ui/icons'


function TagUserCard({ body, setBody }) {
  const [open, setOpen] = useState(false)
  const { userState } = useContext(UserContext)
  const [checked, setChecked] = React.useState([])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  return (
    <>
      <Tooltip title="Tag User To Post" arrow placement="bottom">
        <IconButton
          onClick={() => {
            setOpen(true)
          }}
        >
          <FontAwesomeIcon icon={faUserTag} color="rgb(24,119,242)" />
        </IconButton>
      </Tooltip>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        style={{ width: '100%' }}
      >
        <CardHeader
          avatar={
            <IconButton onClick={() => setOpen(false)}>
              <ArrowBack />
            </IconButton>
          }
          subheader={
            <Typography style={{ fontWeight: '800', fontSize: '20px' }}>
              Express Your Feelings
            </Typography>
          }
        />
        <DialogContent>
          <Container>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={10} md={8}>
                <List>
                  {userState.users.length
                    ? userState.users.map((user) => (
                        <ListItem
                          key={user.id}
                          button
                          onClick={handleToggle(user.id)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(user.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': user.id }}
                            />
                          </ListItemIcon>
                          <ListItemText id={user.id} primary={user.name} />
                          <ListItemSecondaryAction>
                            <Button
                              edge="end"
                              color="primary"
                              variant="contained"
                              size="small"
                            >
                              View
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))
                    : null}
                </List>
                <Button
                  onClick={() => {
                    setBody({ ...body, with: checked })
                    setOpen(false)
                  }}
                  variant="contained"
                  color="primary"
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    marginBottom: '16px',
                  }}
                >
                  Add Feelings
                </Button>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TagUserCard
