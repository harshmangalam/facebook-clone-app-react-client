import { useContext, useState } from 'react'
import axios from 'axios'
import { ChatContext, UIContext } from '../App'

const url = process.env.REACT_APP_ENDPOINT

const useSendMessage = ({ textMessage, setTextMessage }) => {
  const [loading, setLoading] = useState(false)

  const { chatState, chatDispatch } = useContext(ChatContext)
  const { uiDispatch } = useContext(UIContext)

  const sendMessage = async () => {
    setLoading(true)
    let friendId = chatState.selectedFriend.id
    try {
      let token = JSON.parse(localStorage.getItem('token'))
      const response = await axios.post(
        `${url}/api/user/chat/${friendId}/send`,
        { text: textMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data) {
        setTextMessage('')
        chatDispatch({ type: 'ADD_MESSAGE', payload: response.data.data })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
      if (err && err.response) {
        if (err.response.status === 422) {
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              display: true,
              text: err.response.data.error,
              color: 'error',
            },
          })
        }
      }
    }
  }

  return {
    sendMessage,
    loading,
  }
}

export default useSendMessage
