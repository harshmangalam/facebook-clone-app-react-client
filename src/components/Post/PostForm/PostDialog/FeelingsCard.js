import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  CardHeader,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React, { useState } from 'react'

function FeelingsCard({ body, setBody }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Tooltip title="Share feelings With Post" arrow placement="bottom">
        <IconButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faSmile} color="rgb(250,199,94)" />
        </IconButton>
      </Tooltip>

      <Dialog
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
                <TextField
                  label="Add Feelings"
                  variant="outlined"
                  value={body.feelings}
                  onChange={(e) =>
                    setBody({ ...body, feelings: e.target.value })
                  }
                  style={{ width: '100%' }}
                />
                <Button
                  onClick={() => setOpen(false)}
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

export default FeelingsCard
