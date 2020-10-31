import { IconButton, InputBase, Paper, makeStyles } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { UIContext } from '../../App'
import useSendMessage from '../../hooks/useSendMessage'

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    padding: '16px 8px 16px 8px',
  },
  inputInput: {
    flexGrow: 1,
    paddingLeft: '4px',
  },
}))

function MessageTextArea() {
  const { uiState } = useContext(UIContext)
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
        backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
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
          backgroundColor: uiState.darkMode ? 'rgb(24,25,26)' : 'whitesmoke',
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
