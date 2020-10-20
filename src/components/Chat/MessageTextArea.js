import { IconButton, InputBase, Paper, makeStyles } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import React, { useState } from 'react'
import useSendMessage from '../../hooks/useSendMessage'

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'black',
    padding: '16px 8px 16px 8px',
  },
  inputInput: {
    flexGrow: 1,
    paddingLeft: '4px',
  },
}))

function MessageTextArea() {
  const classes = useStyles()
  const [textMessage, setTextMessage] = useState('')

  const { sendMessage } = useSendMessage({ textMessage, setTextMessage })

  const handleSendMessage = (e) => {
    e.preventDefault()
    sendMessage()
  }
  return (
    <Paper
    elevation={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        width: '100%',
      }}
    >
      <InputBase
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        placeholder="Enter Your Text..."
        multiline
        rowsMax={4}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        style={{
          borderRadius: '20px 20px 20px 20px',
          backgroundColor: 'whitesmoke',
          width: '100%',
        }}
      />
      <IconButton
        onClick={handleSendMessage}
        style={{
          backgroundColor: 'rgb(1,133,243)',
          color: '#fff',
          marginLeft: '16px',
        }}
      >
        <Send fontSize="small" />
      </IconButton>
    </Paper>
  )
}

export default MessageTextArea
